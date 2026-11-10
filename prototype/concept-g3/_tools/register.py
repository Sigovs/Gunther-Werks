"""Concept F · House Lights registration.
Measured inputs (wheels2.json, from rim-edge circle fits + alpha contact below each axle) -> trimmed webp exports,
outline masks, and the JS registration table (assets/hl/registration.json). Run: python -I register.py <wheels2.json>"""
import sys, json, math, numpy as np, cv2
from PIL import Image
SRC='C:/____WORK/PRESTIGE/PRESTIGE_GUNTHER/research/corp/assets/cutouts/'
OUT='C:/____WORK/PRESTIGE/PRESTIGE_GUNTHER/prototype/concept-f/assets/hl/'
M=json.load(open(sys.argv[1]))
Image.MAX_IMAGE_PIXELS=None
table={}
for n,d in M.items():
  im=Image.open(SRC+d['file']).convert('RGBA'); A=np.array(im); a=A[:,:,3]; H,W=a.shape
  fx,fy=d['front']['cx'],float(d['front']['contact']); rx,ry=d['rear']['cx'],float(d['rear']['contact'])
  ys,xs=np.where(a>8); bx0,bx1,by0,by1=xs.min(),xs.max()+1,ys.min(),ys.max()+1
  mg=int(0.008*W); bx0=max(0,bx0-mg); by0=max(0,by0-mg); bx1=min(W,bx1+mg); by1=min(H,by1+mg)
  crop=im.crop((bx0,by0,bx1,by1)); cw,ch=crop.size
  # anchors in crop px
  F=(fx-bx0,fy-by0); R=(rx-bx0,ry-by0)
  sizes=[2400,1200] if cw>2400 else [cw,1200]
  for w in sizes:
    h=round(ch*w/cw); c=crop.resize((w,h),Image.LANCZOS) if w!=cw else crop
    c.save(OUT+f'{n}-{w}.webp',quality=88,method=6)
  # outline mask at 2400 (supersampled x2), floor-clipped
  ow=2400; oh=round(ch*ow/cw); S=2
  al=cv2.resize(np.array(crop)[:,:,3].astype(np.float32),(ow*S,oh*S),interpolation=cv2.INTER_AREA if cw>ow*S else cv2.INTER_LANCZOS4)
  mk=(al>245).astype(np.uint8)
  k=ow*S/cw; f2=(F[0]*k,F[1]*k); r2=(R[0]*k,R[1]*k)
  yy,xx=np.mgrid[0:oh*S,0:ow*S]
  floor=f2[1]+(xx-f2[0])*(r2[1]-f2[1])/(r2[0]-f2[0])
  mk[yy>floor+1*S]=0
  # the studio contact shadow is opaque and dark: drop dark pixels in a thin band above the floor, outside both tyres
  rgb=cv2.resize(np.array(crop)[:,:,:3].astype(np.float32),(ow*S,oh*S),interpolation=cv2.INTER_AREA if cw>ow*S else cv2.INTER_LINEAR)
  lum=rgb.mean(2); wbp=math.hypot(r2[0]-f2[0],r2[1]-f2[1])
  inside=np.zeros_like(mk,bool)
  for side,P2 in (('front',f2),('rear',r2)):
    w=d[side]; R2=(w['contact']-w['cy'])*k*1.03; cy2=(w['cy']-by0)*k
    inside|=(xx-P2[0])**2+(yy-cy2)**2<R2*R2
  band=(yy>floor-0.035*wbp)
  mk[band & (lum<75) & ~inside]=0
  mk=cv2.morphologyEx(mk,cv2.MORPH_OPEN,np.ones((5,5),np.uint8))
  # fill see-through cabin glass so the outline is the silhouette (wing gaps, further back, stay open)
  inv=(1-mk).astype(np.uint8); nlab,lab,stats,cent=cv2.connectedComponentsWithStats(inv,connectivity=4)
  outside=lab[0,0]
  for i in range(1,nlab):
    if i==outside: continue
    cxn=cent[i][0]/(ow*S)
    if .22<cxn<.74 or stats[i][4]<(ow*S)*0.004*(oh*S)*0.004: mk[lab==i]=1
  # keep only the largest body (drops specks left by the shadow removal)
  nb,lb,st,_=cv2.connectedComponentsWithStats(mk,connectivity=8)
  if nb>1:
    big=1+np.argmax(st[1:,4]); keep=st[:,4]>st[big,4]*0.004; keep[0]=False; mk=keep[lb].astype(np.uint8)
  din=cv2.distanceTransform(mk,cv2.DIST_L2,5); dout=cv2.distanceTransform(1-mk,cv2.DIST_L2,5)
  th=1.75*S
  line=np.clip(th+.5-np.minimum(np.where(mk>0,din,99),np.where(mk==0,dout,99)),0,1)
  line=cv2.resize(line,(ow,oh),interpolation=cv2.INTER_AREA)
  o=np.zeros((oh,ow,4),np.uint8); o[...,:3]=255; o[...,3]=(line*255).astype(np.uint8)
  Image.fromarray(o).save(OUT+f'{n}-line.png',optimize=True)
  table[n]=dict(w=cw,h=ch,src_w=W,src_h=H,crop=[int(bx0),int(by0),int(bx1),int(by1)],
    f=[round(F[0]/cw,5),round(F[1]/ch,5)], r=[round(R[0]/cw,5),round(R[1]/ch,5)],
    wb_src=round(math.hypot(R[0]-F[0],R[1]-F[1]),1), tilt_deg=round(math.degrees(math.atan2(R[1]-F[1],R[0]-F[0])),3),
    sizes=sizes)
  print(n,cw,ch,table[n]['f'],table[n]['r'],table[n]['wb_src'],table[n]['tilt_deg'],sizes)
json.dump(table,open(OUT+'registration.json','w'),indent=1)
