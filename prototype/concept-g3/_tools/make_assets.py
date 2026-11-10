"""Concept F · photo exports from research/corp (GW's own photography only; resize/crop/compress, nothing generated)."""
from PIL import Image
Image.MAX_IMAGE_PIXELS=None
R='C:/____WORK/PRESTIGE/PRESTIGE_GUNTHER/research/corp/assets/'
O='C:/____WORK/PRESTIGE/PRESTIGE_GUNTHER/prototype/concept-f/assets/'
def out(src,dst,w,q=82,crop=None):
  im=Image.open(R+src).convert('RGB')
  if crop: W,H=im.size; im=im.crop((int(crop[0]*W),int(crop[1]*H),int(crop[2]*W),int(crop[3]*H)))
  if im.width>w: im=im.resize((w,round(im.height*w/im.width)),Image.LANCZOS)
  im.save(O+dst,quality=q,optimize=True,progressive=True); print(dst,im.size)
out('hero/02-f26-profile-warm-cove_4800x2700.jpg','hero-2880.jpg',2880,80)
out('hero/02-f26-profile-warm-cove_4800x2700.jpg','hero-1920.jpg',1920,82)
out('hero/02-f26-profile-warm-cove-mobile_1080x1920.jpg','hero-m.jpg',1080,80)
out('gallery/craft/craft-01-engine-4l-shroud_3000x2001.jpg','at-engine.jpg',2000,82)
out('gallery/craft/craft-14-carbon-layup-close_1366x2048.jpg','at-carbon.jpg',900,82)
out('gallery/craft/craft-35-x-pattern-key_2560x1707.jpg','at-key.jpg',1200,82)
out('gallery/studio-dark/studio-dark-53-rubystone-front34_2560x1707.jpg','psp-rubystone.jpg',2560,84)
out('news-events/brundle-edition/lead-gw-brundle-edition-feature_2560x1707.jpg','nw-brundle.jpg',1600,82)
out('news-events/gxr-evo/lead-Guntherwerks_GXR_Evo_11_2560x1707.webp','nw-gxr.jpg',900,82)
out('news-events/goodwood-fos-2026-bts/body-05-DS400919_2560x1707.jpg','nw-goodwood.jpg',900,82)
