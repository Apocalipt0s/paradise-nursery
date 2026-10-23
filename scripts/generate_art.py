"""Generate 18 offline-friendly botanical SVG illustrations and the landing artwork."""
from pathlib import Path
from xml.sax.saxutils import escape
import random, math
from xml.etree import ElementTree as ET

ROOT=Path(__file__).resolve().parents[1]
TARGET=ROOT/'public'/'plants'
TARGET.mkdir(parents=True, exist_ok=True)

SPECS={
 'snake-plant': ('spike','#335f3a','#84a65a','stone'),
 'peace-lily': ('lily','#2f664d','#9abc7d','cream'),
 'spider-plant': ('grass','#45764a','#a6bb74','rose'),
 'boston-fern': ('fern','#367452','#8fae79','sand'),
 'rubber-plant': ('oval','#244e3f','#678d62','clay'),
 'areca-palm': ('palm','#3a8451','#b2c574','stone'),
 'monstera': ('monstera','#295d46','#649971','cream'),
 'bird-of-paradise': ('banana','#487e52','#a4b967','clay'),
 'philodendron': ('heart','#3f7351','#b6c76c','rose'),
 'calathea': ('calathea','#3c7155','#a8b680','sand'),
 'fiddle-leaf-fig': ('fiddle','#426846','#799c6a','stone'),
 'alocasia': ('arrow','#315b4a','#7eae78','clay'),
 'golden-pothos': ('trailer','#427b48','#b6c15f','cream'),
 'zz-plant': ('zz','#27573c','#78a269','sand'),
 'aloe-vera': ('aloe','#4d865b','#a0bf84','rose'),
 'jade-plant': ('jade','#42784f','#a6c18a','clay'),
 'echeveria': ('rosette','#61987a','#bacbb2','stone'),
 'string-of-pearls': ('pearls','#538960','#accb8a','sand'),
}
POTS={
 'stone': ('#c7c5b5','#a7a697','#e1dfce'),
 'cream': ('#d5d4bc','#aaa992','#ebe8cf'),
 'rose': ('#bf9b88','#a47f6e','#ddc2ae'),
 'clay': ('#bc816b','#985d4f','#d79b84'),
 'sand': ('#bba98a','#99896f','#d8c3a3'),
}

def leaf(x,y,length,width,angle,colors,veins=False, stripes=False, cut=False, alpha=1):
    dark,light=colors
    mid=f'#{random.choice(["628968","517b58","719e6b","477650","5a9164"])}'
    g=f'<g transform="translate({x:.1f} {y:.1f}) rotate({angle:.1f})" opacity="{alpha}">'
    g+=f'<path d="M0 0 C {-width*1.0:.1f} {-length*.12:.1f} {-width*1.0:.1f} {-length*.70:.1f} 0 {-length:.1f} C {width*.95:.1f} {-length*.67:.1f} {width*.9:.1f} {-length*.15:.1f} 0 0Z" fill="url(#leafGrad)" stroke="{dark}" stroke-opacity=".45" stroke-width="1.2"/>'
    g+=f'<path d="M0 -3 Q {-width*.06:.1f} {-length*.54:.1f} 0 {-length*.93:.1f}" fill="none" stroke="{light}" stroke-width="1.7" opacity=".65"/>'
    if veins:
        for at in [.28,.48,.65]:
            sy=-length*at
            g+=f'<path d="M0 {sy:.1f} q {-width*.30:.1f} {-length*.07:.1f} {-width*.59:.1f} {-length*.09:.1f} M0 {sy:.1f} q {width*.30:.1f} {-length*.08:.1f} {width*.56:.1f} {-length*.09:.1f}" fill="none" stroke="{light}" stroke-width="1.3" opacity=".32"/>'
    if stripes:
        for off in [-.35,.35]:
            g+=f'<path d="M0 -6 Q {width*off*2:.1f} {-length*.45:.1f} {width*off*.5:.1f} {-length*.83:.1f}" fill="none" stroke="{light}" stroke-width="5" opacity=".37"/>'
    if cut:
        for i in range(3):
            v=-length*(.28+i*.19)
            g+=f'<path d="M {-width*.62:.1f} {v:.1f} Q {-width*.29:.1f} {v-9:.1f} {-width*.14:.1f} {v-21:.1f} M {width*.58:.1f} {v+4:.1f} Q {width*.30:.1f} {v-8:.1f} {width*.15:.1f} {v-21:.1f}" fill="none" stroke="#ced9b5" stroke-width="8" stroke-linecap="round" opacity=".78"/>'
    g+='</g>'
    return g

def stem(start,end,stroke='#577952',thickness=4,curve=0):
    x1,y1=start;x2,y2=end
    return f'<path d="M{x1:.1f} {y1:.1f} Q{(x1+x2)/2+curve:.1f} {(y1+y2)/2:.1f} {x2:.1f} {y2:.1f}" fill="none" stroke="{stroke}" stroke-width="{thickness}" stroke-linecap="round"/>'

def pot(kind='cream',large=False):
    main,shadow,shine=POTS[kind]
    top=330 if not large else 326
    return f'''
    <ellipse cx="270" cy="467" rx="104" ry="12" fill="#234735" opacity=".095"/>
    <path d="M202 {top+9} H338 L325 449 Q270 468 215 449Z" fill="{main}"/>
    <path d="M270 {top+9} H338 L325 449 Q291 462 268 458Z" fill="{shadow}" opacity=".36"/>
    <path d="M217 {top+26} Q225 398 230 441" fill="none" stroke="{shine}" stroke-width="10" opacity=".46" stroke-linecap="round"/>
    <ellipse cx="270" cy="{top+9}" rx="69" ry="15" fill="{shadow}"/>
    <ellipse cx="270" cy="{top+4}" rx="69" ry="12" fill="{shine}"/>
    <ellipse cx="270" cy="{top+6}" rx="60" ry="8" fill="#6d5d45" opacity=".4"/>
    <path d="M197 {top+10} Q270 {top+32} 343 {top+10}" fill="none" stroke="{main}" stroke-width="14" stroke-linecap="round"/>
    <path d="M199 {top+11} Q270 {top+30} 341 {top+11}" fill="none" stroke="{shine}" stroke-width="3" opacity=".8"/>
    '''

def graphic(slug, seed):
    random.seed(seed)
    type,dark,light,pot_type=SPECS[slug];colors=(dark,light)
    base=[]; foliage=[]; details=[]
    if type in ('spike','aloe'):
        for i in range(13 if type=='spike' else 11):
            x=270 + (i-6)*7.3;y=344
            length=random.uniform(145,255) if type=='spike' else random.uniform(95,205)
            angle=(i-6)*(5 if type=='spike' else 9)+random.uniform(-6,6)
            width=random.uniform(17,25) if type=='spike' else random.uniform(15,27)
            foliage.append(leaf(x,y,length,width,angle,colors,stripes=type=='spike'))
    elif type=='grass':
        for i in range(32):
            angle=random.uniform(-75,75);length=random.uniform(130,245)
            x=270+random.uniform(-30,30)
            foliage.append(f'<path d="M{x:.1f} 337 Q{x+math.sin(math.radians(angle))*length*.7:.1f} {337-length*.72:.1f} {x+math.sin(math.radians(angle))*length:.1f} {337-length*.80:.1f}" fill="none" stroke="{light if i%3==0 else dark}" stroke-width="{random.uniform(2.5,5):.1f}" stroke-linecap="round"/>')
    elif type in ('fern','palm','zz'):
        for i in range(9 if type!='zz' else 7):
            theta=-67+i*(134/(8 if type!='zz' else 6))+random.uniform(-5,5)
            length=random.uniform(165,245) if type!='zz' else random.uniform(140,225)
            sx=270+random.uniform(-13,13); sy=338
            ex=sx+math.sin(math.radians(theta))*length*.85; ey=sy-math.cos(math.radians(theta))*length
            base.append(stem((sx,sy),(ex,ey),dark,2.5,theta*.35))
            for j in range(1,10 if type!='zz' else 7):
                progress=j/(10 if type!='zz' else 8)
                xx=sx+(ex-sx)*progress;yy=sy+(ey-sy)*progress
                branchlen=(16 if type=='fern' else 24 if type=='palm' else 22)*(1-.3*progress)
                for s in (-1,1):
                    angle=theta+s*(55 if type!='zz' else 60)
                    foliage.append(leaf(xx+s*2,yy,branchlen*(1.6 if type=='palm' else 1.25), 6 if type=='fern' else 8 if type=='palm' else 12,angle,colors,alpha=.9))
    elif type in ('oval','monstera','banana','calathea','fiddle','arrow','lily','heart','trailer'):
        n={'monstera':10,'banana':9,'fiddle':13,'lily':15,'oval':16,'calathea':13,'heart':17,'trailer':17,'arrow':12}[type]
        for i in range(n):
            angle=random.uniform(-70,70)
            if type in ('banana','fiddle'):angle=random.uniform(-46,46)
            length=random.uniform(120,220)
            if type=='banana':length=random.uniform(155,255)
            if type=='trailer':length=random.uniform(70,150)
            x0=270+random.uniform(-22,22)
            x1=x0+math.sin(math.radians(angle))*random.uniform(20,85)
            y1=335-random.uniform(20,75)
            base.append(stem((x0,340),(x1,y1),dark,random.uniform(2.5,4.0),angle/8))
            bladeWidth={'monstera':53,'banana':31,'fiddle':34,'lily':24,'oval':35,'calathea':36,'heart':30,'trailer':20,'arrow':34}[type]*random.uniform(.77,1.15)
            bladeLength={'monstera':135,'banana':173,'fiddle':119,'lily':110,'oval':111,'calathea':131,'heart':95,'trailer':70,'arrow':145}[type]*random.uniform(.79,1.15)
            foliage.append(leaf(x1,y1,bladeLength,bladeWidth,angle,colors,veins=(type in ('arrow','calathea','fiddle')),stripes=(type=='calathea'),cut=(type=='monstera')))
        if type=='lily':
            for x,y,angle in [(215,194,-10),(312,173,22),(281,245,15)]:
                base.append(stem((270,331),(x,y),dark,3))
                foliage.append(f'<g transform="translate({x} {y}) rotate({angle})"><path d="M0 33 Q-25 -13 -2 -54 Q22 -9 0 33Z" fill="#f6f4db" stroke="#e3e5c7" stroke-width="2"/><path d="M0 2L1 -35" stroke="#b9c16f" stroke-width="5" stroke-linecap="round"/></g>')
    elif type=='jade':
        for j in range(5):
            ex=270+random.uniform(-85,85); ey=random.uniform(140,255)
            base.append(stem((268,337),(ex,ey),'#6e6750',8,random.uniform(-35,35)))
            for k in range(7):
                x=ex+random.uniform(-38,38);y=ey+random.uniform(-40,45)
                foliage.append(f'<ellipse cx="{x:.1f}" cy="{y:.1f}" rx="{random.uniform(13,20):.1f}" ry="{random.uniform(18,24):.1f}" transform="rotate({random.uniform(-60,60):.1f} {x:.1f} {y:.1f})" fill="{light if k%3==0 else dark}" stroke="#426e4b" stroke-width="1.1"/>')
    elif type=='rosette':
        for size in (135,107,78,50):
            for i in range(9):
                angle=(360/9)*i+random.uniform(-8,8)
                foliage.append(leaf(270,333,size,size*.24,angle,colors,alpha=.95))
    elif type=='pearls':
        for i in range(17):
            x=230+i*5.0
            ex=x+random.uniform(-43,52); ey=random.uniform(358,463)
            base.append(f'<path d="M{x:.1f} 319 Q{x+random.uniform(-35,35):.1f} {ey-20:.1f} {ex:.1f} {ey:.1f}" fill="none" stroke="{dark}" stroke-width="2"/>')
            for j in range(6):
                t=j/6;px=x+(ex-x)*t;py=325+(ey-325)*t
                foliage.append(f'<circle cx="{px:.1f}" cy="{py:.1f}" r="{random.uniform(6,9):.1f}" fill="{light if j%2==0 else dark}"/>')
    if type == 'pearls':
        for k in range(12):
            x = 204 + k*11
            endx = x + random.uniform(-16,22)
            endy = random.uniform(407,475)
            details.append(f'<path d="M{x:.1f} 343 Q{endx+16:.1f} {(endy+343)/2:.1f} {endx:.1f} {endy:.1f}" fill="none" stroke="{dark}" stroke-width="2"/>')
            for j in range(7):
                xx=x+(endx-x)*j/7
                yy=350+(endy-350)*j/7
                details.append(f'<circle cx="{xx:.1f}" cy="{yy:.1f}" r="{random.uniform(5,7.2):.1f}" fill="{light if j%2==0 else dark}"/>')
    backdrop=f'''<circle cx="270" cy="226" r="171" fill="#f5f3dd" opacity=".31"/>
    <path d="M105 296c-9-54 20-92 38-116M396 94c46 24 65 56 70 98" fill="none" stroke="#f7f4e6" stroke-width="2" stroke-linecap="round" opacity=".32" stroke-dasharray="7 12"/>
    '''
    out=f'''<svg xmlns="http://www.w3.org/2000/svg" width="540" height="480" viewBox="0 0 540 480" role="img" aria-label="{escape(slug.replace('-',' '))} illustration">
    <defs><linearGradient id="leafGrad" x1="0" y1="1" x2=".85" y2="0"><stop offset="0%" stop-color="{dark}"/><stop offset="72%" stop-color="{light}"/><stop offset="100%" stop-color="{dark}"/></linearGradient></defs>
    {backdrop}
    <g>{''.join(base)}</g><g>{''.join(foliage)}</g>{pot(pot_type)}{''.join(details)}
    </svg>'''
    (TARGET/f'{slug}.svg').write_text(out)
    return out

art={slug:graphic(slug,i+11) for i,slug in enumerate(SPECS)}
# Layer full illustrations to create a coordinated botanical composition for the hero.
# Embed entire SVGs into one file so no external asset paths are needed.
hero=['<svg xmlns="http://www.w3.org/2000/svg" width="900" height="700" viewBox="0 0 900 700">',
      '<defs><radialGradient id="halo"><stop offset="0" stop-color="#9fbf79" stop-opacity=".26"/><stop offset="1" stop-color="#9fbf79" stop-opacity="0"/></radialGradient></defs>',
      '<ellipse cx="460" cy="340" rx="365" ry="325" fill="url(#halo)"/><ellipse cx="460" cy="666" rx="380" ry="27" fill="#0d2d23" opacity=".2"/>']
# SVG gradients conflict on merged inline nested SVG? Nested SVG IDs can collide; change ids for each plant.
for slug,x,y,w,h in [('snake-plant',-20,212,370,458),('monstera',210,26,500,625),('bird-of-paradise',545,165,380,472)]:
    svg=art[slug].replace('id="leafGrad"',f'id="leafGrad-{slug}"').replace('url(#leafGrad)',f'url(#leafGrad-{slug})')
    svg=svg.replace('<svg xmlns="http://www.w3.org/2000/svg" width="540" height="480" viewBox="0 0 540 480"',f'<svg x="{x}" y="{y}" width="{w}" height="{h}" viewBox="0 0 540 480"')
    hero.append(svg)
hero.append('</svg>')
(ROOT/'public'/'hero-plants.svg').write_text(''.join(hero))
print('Generated',len(art),'plant assets and hero illustration')
