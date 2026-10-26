from PIL import Image, ImageDraw
import numpy as np, cv2, json
J=json.load(open('f/wheels.json'))
B='C:/____WORK/PRESTIGE/PRESTIGE_GUNTHER/research/corp/assets/cutouts/'
def fit_circle(p):
  x,y=p[:,0],p[:,1]; A=np.c_[2*x,2*y,np.ones(len(x))]; b=x*x+y*y
  c,*_=np.linalg.lstsq(A,b,rcond=None); return c[0],c[1],np.sqrt(c[2]+c[0]**2+c[1]**2)
R={}; sheet=[]
for n,d in J.items():
  im=Image.open(B+d['file']).convert('RGBA'); A=np.array(im).astype(float); a=A[:,:,3]/255
  comp=A[:,:,:3]*a[...,None]+255*(1-a[...,None]); g=comp.mean(2); gs=cv2.GaussianBlur(g,(0,0),1.2)
  gx=cv2.Sobel(gs,cv2.CV_64F,1,0,ksize=3); gy=cv2.Sobel(gs,cv2.CV_64F,0,1,ksize=3)
  H,W=a.shape; res={}
  for side in ('front','rear'):
    cx,cy,r=d[side]['hough']
    for it in range(3):
      pts=[]
      for ang in np.radians(np.arange(0,360,1.5)):
        dx,dy=np.cos(ang),np.sin(ang); best=None
        for t in np.arange(r*0.88,r*1.12,0.5):
          px,py=cx+dx*t,cy+dy*t; ix,iy=int(px),int(py)
          if not(0<ix<W-1 and 0<iy<H-1): continue
          gm=abs(gx[iy,ix]*dx+gy[iy,ix]*dy)
          if best is None or gm>best[0]: best=(gm,px,py)
        if best and best[0]>20: pts.append(best[1:])
      p=np.array(pts)
      for k in range(4):
        c=fit_circle(p); dd=np.abs(np.hypot(p[:,0]-c[0],p[:,1]-c[1])-c[2]); p=p[dd<max(2.0,np.percentile(dd,70))]
      cx,cy,r=fit_circle(p)
    # tyre outer radius: luminance rays, lower-side angles, from 1.02r outward until bright
    tr=[]
    for deg in list(range(25,71,3))+list(range(110,156,3)):
      ang=np.radians(deg); dx,dy=np.cos(ang),np.sin(ang); dark=False
      for t in np.arange(r*1.02,r*1.9,0.5):
        ix,iy=int(cx+dx*t),int(cy+dy*t)
        if not(0<=ix<W and 0<=iy<H): break
        L=g[iy,ix]
        if L<70: dark=True
        elif dark and L>110: tr.append(t); break
    tr=np.array(tr); Rt=float(np.median(tr)) if len(tr) else None
    # contact: alpha<250 going down at cx
    col=a[:,int(round(cx))]; cy0=int(cy+r)
    con=next((y for y in range(cy0,H) if col[y]<250/255),H)
    res[side]=dict(cx=round(float(cx),1),cy=round(float(cy),1),rim=round(float(r),1),tyre=round(Rt,1) if Rt else None,tyre_n=int(len(tr)),tyre_iqr=round(float(np.subtract(*np.percentile(tr,[75,25]))),1) if len(tr) else None,floor=round(float(cy+Rt),1) if Rt else None,contact=int(con))
  R[n]=dict(file=d['file'],W=W,H=H,**res)
  f_,r_=res['front'],res['rear']
  print('%-8s F(%.1f,%.1f) rim %.1f tyre %s±%s floor %s contact %d | R(%.1f,%.1f) rim %.1f tyre %s±%s floor %s contact %d | wb %.1f'%(n,f_['cx'],f_['cy'],f_['rim'],f_['tyre'],f_['tyre_iqr'],f_['floor'],f_['contact'],r_['cx'],r_['cy'],r_['rim'],r_['tyre'],r_['tyre_iqr'],r_['floor'],r_['contact'],r_['cx']-f_['cx']))
  bg=Image.new('RGBA',im.size,(235,235,232,255)); bg.alpha_composite(im); dr=ImageDraw.Draw(bg); s=max(2,W//900)
  for w in (f_,r_):
    for rr,colr in ((w['rim'],(255,0,0,255)),(w['tyre'] or 0,(0,120,255,255))):
      dr.ellipse([w['cx']-rr,w['cy']-rr,w['cx']+rr,w['cy']+rr],outline=colr,width=s)
    dr.line([(w['cx'],w['cy']-8*s),(w['cx'],w['cy']+8*s)],fill=(255,0,0,255),width=s)
    dr.line([(w['cx']-8*s,w['cy']),(w['cx']+8*s,w['cy'])],fill=(255,0,0,255),width=s)
  for fl in (f_['floor'],r_['floor']):
    if fl: dr.line([(0,fl),(W,fl)],fill=(0,180,0,255),width=max(1,s//2))
  sheet.append(bg.convert('RGB'))
json.dump(R,open('f/wheels2.json','w'),indent=1)
# zoom crops of each wheel for verification
Z=Image.new('RGB',(8*250,2*250),'white')
for k,(n,d) in enumerate(R.items()):
  for j,side in enumerate(('front','rear')):
    w=d[side]; s=sheet[k]; rr=(w['tyre'] or w['rim'])*1.25
    c=s.crop((int(w['cx']-rr),int(w['cy']-rr),int(w['cx']+rr),int(w['cy']+rr))).resize((246,246))
    Z.paste(c,(k*250,j*250))
Z.save('f/wheelzoom.jpg',quality=88)
