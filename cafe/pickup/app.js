/* ---------- logo mark ---------- */
function logoMark(){
  return `<svg class="logo-neon" viewBox="0 0 120 120" fill="none" aria-label="Product Designer Gym Cafe logo" style="width:100%;height:auto">
    <rect x="22" y="18" width="76" height="76" rx="6" stroke="var(--neon-pink)" stroke-width="3"/>
    ${[[22,18],[98,18],[22,94],[98,94]].map(([x,y])=>`<rect x="${x-5}" y="${y-5}" width="10" height="10" rx="2" fill="#0c0d12" stroke="var(--neon-pink)" stroke-width="2.5"/>`).join('')}
    <path d="M52 34c-2 2.5-2 4.5 0 7M60 32c-2 2.5-2 4.5 0 7" stroke="var(--primary-hover)" stroke-width="2.4" stroke-linecap="round"/>
    <path d="M86 32l2.2 5.4L94 40l-5.8 2.6L86 48l-2.2-5.4L78 40l5.8-2.6z" fill="var(--neon-gold)"/>
    <path d="M40 48h30v9a10 10 0 0 1-10 10h-10a10 10 0 0 1-10-10z" stroke="var(--primary-hover)" stroke-width="3" stroke-linejoin="round"/>
    <path d="M70 50h5a5 5 0 0 1 0 10h-5" stroke="var(--primary-hover)" stroke-width="3"/>
    <line x1="42" y1="78" x2="78" y2="78" stroke="var(--primary-hover)" stroke-width="3" stroke-linecap="round"/>
    <rect x="34" y="71" width="9" height="14" rx="2.5" stroke="var(--primary-hover)" stroke-width="3"/>
    <rect x="77" y="71" width="9" height="14" rx="2.5" stroke="var(--primary-hover)" stroke-width="3"/>
  </svg>`;
}
/* Hero uses the real neon-sign photo from the design system (it already carries
   the wordmark). The tiny nav/footer marks keep the compact SVG, since the
   README says the photo must not be shrunk below ~160px. */
document.getElementById('brandwall').innerHTML =
  `<img class="brand-photo" src="../../design-system/assets/Logos/product-designer-gym-neon.png"
        alt="Product Designer Gym Cafe neon sign" width="1278" height="1231">`;
document.getElementById('navmark').innerHTML = logoMark();
document.getElementById('footmark').innerHTML = logoMark();

/* ---------- icons ---------- */
const GLYPH={
  coffee:'<svg viewBox="0 0 24 24" fill="none" stroke="#33CCFF" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><path d="M4 9h13v5a5 5 0 0 1-5 5H9a5 5 0 0 1-5-5V9Z"/><path d="M17 10h2.2a2.3 2.3 0 0 1 0 4.6H17"/><path d="M8 3.2c-.6.8-.6 1.6 0 2.4M12 3c-.6.8-.6 1.6 0 2.4"/></svg>',
  cold:'<svg viewBox="0 0 24 24" fill="none" stroke="#7FD8FF" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><path d="M6 8h12l-1.3 11.1a2 2 0 0 1-2 1.9H9.3a2 2 0 0 1-2-1.9L6 8Z"/><path d="M5 8h14"/><path d="M9 4v3M15 4v3"/><path d="M8 13h8"/></svg>',
  pastry:'<svg viewBox="0 0 24 24" fill="none" stroke="#FFD166" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><path d="M3 15c3-1 6-1 9-1s6 0 9 1c0 2-1 3-3 3H6c-2 0-3-1-3-3Z"/><path d="M5 15c1-3 3-5 7-5s6 2 7 5"/><path d="M9 11.5 10.5 9M15 11.5 13.5 9"/></svg>',
  food:'<svg viewBox="0 0 24 24" fill="none" stroke="#66E39A" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><path d="M4 13a8 8 0 0 1 16 0z"/><path d="M3 13h18"/><path d="M12 9c0-2 1.5-3 1.5-3M9 9c0-1.5 1-2.3 1-2.3"/><path d="M6 17h12"/></svg>'
};

/* ---------- menu (real PDG menu, USD) ---------- */
const MENU=[
  {id:'flatwhite', g:'coffee', cat:'Coffee', name:'Flat White', desc:'Double ristretto, silky microfoam.', price:4.50, label:'$4.50', badge:'pop'},
  {id:'coldbrew', g:'cold', cat:'Cold', name:'Cold Brew Set', desc:'18-hour steep, served over a big cube.', price:5.00, label:'$5.00'},
  {id:'protein', g:'food', cat:'Kitchen', name:'Protein Bowl', desc:'Grains, egg, greens, tahini.', price:12.00, label:'$12', badge:'veg'},
  {id:'pastry', g:'pastry', cat:'Bakery', name:'Pastry Pass', desc:'Daily bake from the counter.', price:3.80, label:'$3.80'},
];
const OPTS={
  flatwhite:[
    {key:'size',label:'Size',req:true,choices:[{v:'Regular',add:0},{v:'Large',add:1.00}]},
    {key:'milk',label:'Milk',req:true,choices:[{v:'Whole',add:0},{v:'Skim',add:0},{v:'Oat',add:0.70},{v:'Almond',add:0.70}]},
    {key:'extra',label:'Extras',multi:true,choices:[{v:'Extra shot',add:1.00},{v:'Vanilla',add:0.60},{v:'Decaf',add:0}]},
  ],
  coldbrew:[
    {key:'size',label:'Size',req:true,choices:[{v:'Regular',add:0},{v:'Large',add:1.00}]},
    {key:'flavour',label:'Flavour',req:true,choices:[{v:'Original',add:0},{v:'Vanilla',add:0.60},{v:'Orange peel',add:0.60}]},
    {key:'milk',label:'Splash',multi:true,choices:[{v:'Oat milk',add:0.70},{v:'Whole milk',add:0}]},
  ],
  protein:[
    {key:'base',label:'Base',req:true,choices:[{v:'Ancient grains',add:0},{v:'Greens only',add:0}]},
    {key:'protein',label:'Protein',req:true,choices:[{v:'Poached egg',add:0},{v:'Grilled chicken',add:3.00},{v:'Marinated tofu',add:2.00}]},
    {key:'add',label:'Add-ons',multi:true,choices:[{v:'Avocado',add:2.00},{v:'Extra tahini',add:0.50},{v:'Chilli crisp',add:0.50}]},
  ],
  pastry:[
    {key:'choice',label:'Choose your pastry',req:true,choices:[{v:'Butter croissant',add:0},{v:'Pain au chocolat',add:0.30},{v:'Cinnamon bun',add:0.80},{v:'Almond croissant',add:0.80}]},
    {key:'warm',label:'Warm it up',multi:true,choices:[{v:'Yes please',add:0}]},
  ],
};
const byId=id=>MENU.find(i=>i.id===id);
const money=n=>'$'+n.toFixed(2);

/* ---------- state ---------- */
let cart=[], draft=null, pickup='asap';
const PICKUP={
  asap:{big:'As soon as ready',sub:'~ 6 min',mins:6},
  t15:{big:'In 15 min',sub:'8:57',mins:15},
  t30:{big:'In 30 min',sub:'9:12',mins:30},
  t45:{big:'In 45 min',sub:'9:27',mins:45},
};

/* ---------- menu render ---------- */
document.getElementById('menuGrid').innerHTML=MENU.map(i=>{
  const badge=i.badge==='veg'?'<span class="pdg-badge pdg-badge--veg">Veg</span>'
    :i.badge==='pop'?'<span class="pdg-badge pdg-badge--pop">Popular</span>':'';
  return `<article class="mcard">
    <div class="media ${i.g}">${badge}${GLYPH[i.g]}</div>
    <div class="body">
      <div class="top"><h3>${i.name}</h3><span class="price">${i.label}</span></div>
      <p>${i.desc}</p>
      <button class="pdg-btn pdg-btn--primary pdg-btn--block" data-item="${i.id}">Add to bag</button>
    </div></article>`;
}).join('');

/* ---------- customise modal ---------- */
function openModal(id){
  const it=byId(id), groups=OPTS[it.id]||[];
  draft={id,qty:1,sel:{}};
  groups.forEach(g=>{if(g.multi)draft.sel[g.key]=[];else if(g.req)draft.sel[g.key]=g.choices[0].v;});

  document.getElementById('modalMedia').className='modal-media '+it.g;
  document.getElementById('modalMedia').querySelector('svg.glyph')?.remove();
  document.getElementById('modalMedia').insertAdjacentHTML('beforeend',
    GLYPH[it.g].replace('<svg','<svg class="glyph"'));

  const groupHTML=groups.map(g=>{
    const choices=g.choices.map(c=>{
      const add=c.add?`<span class="up">+${money(c.add).slice(1)}</span>`:'';
      const pressed=g.multi?false:(g.req&&g.choices[0].v===c.v);
      return `<button class="opt" data-group="${g.key}" data-val="${c.v}" data-multi="${!!g.multi}" aria-pressed="${pressed}">${c.v}${add}</button>`;
    }).join('');
    const hint=g.multi?'Optional':(g.req?'Required':'');
    return `<div class="opt-group"><div class="opt-label"><b>${g.label}</b><span>${hint}</span></div><div class="opts">${choices}</div></div>`;
  }).join('');

  document.getElementById('modalBody').innerHTML=`<h2>${it.name}</h2><p class="desc">${it.desc}</p>${groupHTML}`;
  document.getElementById('modalFoot').innerHTML=`
    <div class="stepper"><button id="qminus" aria-label="Decrease">–</button><b id="qval">1</b><button id="qplus" aria-label="Increase">+</button></div>
    <button class="pdg-btn pdg-btn--primary" id="addbtn" style="flex:1">Add to bag<span class="amt">${money(it.price)}</span></button>`;
  openOverlay('modal');
  document.getElementById('modalBody').scrollTop=0;
}
function draftUnit(){
  const it=byId(draft.id); let p=it.price; const groups=OPTS[it.id]||[];
  groups.forEach(g=>{const v=draft.sel[g.key];
    if(Array.isArray(v))v.forEach(val=>{const c=g.choices.find(x=>x.v===val);if(c)p+=c.add;});
    else if(v){const c=g.choices.find(x=>x.v===v);if(c)p+=c.add;}});
  return p;
}
function updateAddBtn(){
  const b=document.querySelector('#addbtn .amt'); if(b)b.textContent=money(draftUnit()*draft.qty);
}
function optTextFrom(id,sel){
  const it=byId(id), groups=OPTS[it.id]||[]; const parts=[];
  groups.forEach(g=>{const v=sel[g.key];
    if(Array.isArray(v))v.forEach(x=>parts.push(g.key==='warm'?'Warmed':x));
    else if(v&&!(g.key==='milk'&&v==='Whole')&&!(g.key==='size'&&v==='Regular'))parts.push(v);});
  return parts.join(' · ');
}

/* ---------- cart drawer ---------- */
function renderCart(){
  const n=cart.reduce((s,l)=>s+l.qty,0);
  document.getElementById('cartCount').textContent=n||'';
  const body=document.getElementById('drawerBody');
  const foot=document.getElementById('drawerFoot');
  if(!cart.length){
    body.innerHTML=`<div class="empty-bag"><div class="thumb">${GLYPH.coffee}</div>
      <b>Your bag is empty</b>Add a coffee or some fuel and pick a time to grab it.</div>`;
    foot.hidden=true; return;
  }
  const rows=cart.map(l=>`<div class="bag-row">
    <span class="thumb ${l.g}" style="background:var(--surface-2)">${GLYPH[l.g]}</span>
    <span class="info"><b>${l.name}</b><p>${l.optText||'As it comes'}</p>
      <div class="ministep"><button data-dec="${l.uid}" aria-label="One fewer">–</button><b>${l.qty}</b><button data-inc="${l.uid}" aria-label="One more">+</button></div></span>
    <span class="right"><span class="price">${money(l.unit*l.qty)}</span><button class="link-remove" data-rm="${l.uid}">Remove</button></span></div>`).join('');

  const slots=Object.entries(PICKUP).map(([k,v])=>
    `<button class="slot" data-slot="${k}" aria-pressed="${k===pickup}"><span class="big">${v.big}</span><span class="sub">${v.sub}</span></button>`).join('');

  body.innerHTML=`${rows}
    <div class="block-label">Pickup time</div><div class="slots">${slots}</div>
    <div class="block-label">Collection point</div>
    <div style="font-size:13.5px;color:var(--text-muted)"><b style="color:var(--text)">PDG Cafe — Studio Floor</b><br>Grab it from the Bar by the window, under your name.</div>`;

  const sub=cart.reduce((s,l)=>s+l.unit*l.qty,0);
  const tax=+(sub*0.08).toFixed(2); const total=sub+tax;
  foot.hidden=false;
  foot.innerHTML=`<div class="summary">
      <div class="line"><span>Items (${cart.reduce((s,l)=>s+l.qty,0)})</span><span class="num">${money(sub)}</span></div>
      <div class="line"><span>Est. tax</span><span class="num">${money(tax)}</span></div>
      <div class="line"><span>Pickup — no service fee</span><span class="num">$0.00</span></div>
      <div class="total"><span>Total</span><span class="num">${money(total)}</span></div></div>
    <button class="pdg-btn pdg-btn--primary pdg-btn--block" id="placebtn" style="margin-top:var(--space-5)">Pay &amp; place order<span class="amt">${money(total)}</span></button>`;
}

/* ---------- confirmation ---------- */
function showConfirm(){
  const code='PDG-'+Math.floor(100+Math.random()*900);
  const eta=PICKUP[pickup];
  const steps=[
    {t:'Order received',d:'Paid · sent to the Bar',s:'done'},
    {t:'On the Bar',d:'Your barista is working the set',s:'active'},
    {t:'Ready for pickup',d:`Grab it from the Bar · ~${eta.mins} min`,s:'pending'},
  ];
  const stepHTML=steps.map(st=>`<div class="step ${st.s}"><div class="marker">
    <div class="node"><svg viewBox="0 0 24 24" fill="none" stroke="#111318" stroke-width="3.2" stroke-linecap="round" stroke-linejoin="round"><path d="m5 12 5 5L20 7"/></svg></div><div class="rail"></div></div>
    <div class="sbody"><b>${st.t}</b><p>${st.d}</p></div></div>`).join('');
  document.getElementById('confirmCard').innerHTML=`
    <div class="check-ring"><svg viewBox="0 0 24 24" fill="none" stroke="var(--success)" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round"><path d="m4 12 5 5L20 6"/></svg></div>
    <h2>Order placed</h2><p class="lede">We'll have it waiting for you on the Bar.</p>
    <div class="code-card"><div class="k">Pickup code</div><div class="code">${code}</div></div>
    <div class="eta-band"><svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/></svg>
      Ready ${pickup==='asap'?'in about '+eta.mins+' min':'by '+eta.sub}</div>
    <div class="track">${stepHTML}</div>
    <button class="pdg-btn pdg-btn--secondary pdg-btn--block" id="confirmDone">Back to the menu</button>`;
  cart=[]; renderCart();
  document.body.classList.add('locked');
  document.getElementById('confirm').classList.add('on');
  if(!matchMedia('(prefers-reduced-motion:reduce)').matches){
    setTimeout(()=>{
      const st=document.querySelectorAll('#confirmCard .step'); if(st.length<3)return;
      st[1].classList.replace('active','done'); st[2].classList.replace('pending','active');
      const eb=document.querySelector('#confirmCard .eta-band');
      if(eb)eb.innerHTML=eb.innerHTML.replace(/Ready.*/,'Almost ready — 2 min away');
    },3200);
  }
}

/* ---------- overlays ---------- */
function openOverlay(which){
  document.body.classList.add('locked');
  document.getElementById('backdrop').classList.add('on');
  if(which==='drawer'){document.getElementById('drawer').classList.add('on');renderCart();}
  if(which==='modal'){document.getElementById('modal').classList.add('on');}
}
function closeAll(){
  document.body.classList.remove('locked');
  document.getElementById('backdrop').classList.remove('on');
  document.getElementById('drawer').classList.remove('on');
  document.getElementById('modal').classList.remove('on');
}

/* ---------- events ---------- */
document.addEventListener('click',e=>{
  const t=e.target;

  const sc=t.closest('[data-scroll]');
  if(sc){document.querySelector(sc.dataset.scroll).scrollIntoView({behavior:'smooth'});return;}

  if(t.closest('#cartBtn')||t.closest('#viewBag2')){openOverlay('drawer');return;}
  if(t.closest('#drawerClose')||t.closest('#modalClose')||t.closest('#backdrop')){closeAll();return;}

  const item=t.closest('[data-item]'); if(item){openModal(item.dataset.item);return;}

  // modal options
  const opt=t.closest('.opt[data-group]');
  if(opt){const g=opt.dataset.group,val=opt.dataset.val,multi=opt.dataset.multi==='true';
    if(multi){draft.sel[g]=draft.sel[g]||[];const i=draft.sel[g].indexOf(val);
      if(i>-1){draft.sel[g].splice(i,1);opt.setAttribute('aria-pressed','false');}
      else{draft.sel[g].push(val);opt.setAttribute('aria-pressed','true');}}
    else{draft.sel[g]=val;opt.parentElement.querySelectorAll('.opt').forEach(o=>o.setAttribute('aria-pressed','false'));opt.setAttribute('aria-pressed','true');}
    updateAddBtn();return;}
  if(t.closest('#qplus')){draft.qty=Math.min(9,draft.qty+1);document.getElementById('qval').textContent=draft.qty;updateAddBtn();return;}
  if(t.closest('#qminus')){draft.qty=Math.max(1,draft.qty-1);document.getElementById('qval').textContent=draft.qty;updateAddBtn();return;}
  if(t.closest('#addbtn')){const it=byId(draft.id);
    cart.push({uid:Date.now()+''+Math.random(),id:it.id,name:it.name,g:it.g,qty:draft.qty,unit:draftUnit(),optText:optTextFrom(it.id,draft.sel)});
    document.getElementById('modal').classList.remove('on');openOverlay('drawer');return;}

  // cart qty/remove
  const inc=t.closest('[data-inc]'),dec=t.closest('[data-dec]'),rm=t.closest('[data-rm]');
  if(inc){const l=cart.find(x=>x.uid===inc.dataset.inc);l.qty=Math.min(9,l.qty+1);renderCart();return;}
  if(dec){const l=cart.find(x=>x.uid===dec.dataset.dec);l.qty--;if(l.qty<1)cart=cart.filter(x=>x.uid!==l.uid);renderCart();return;}
  if(rm){cart=cart.filter(x=>x.uid!==rm.dataset.rm);renderCart();return;}

  // pickup slot
  const slot=t.closest('[data-slot]');
  if(slot){pickup=slot.dataset.slot;document.querySelectorAll('[data-slot]').forEach(s=>s.setAttribute('aria-pressed','false'));slot.setAttribute('aria-pressed','true');return;}

  if(t.closest('#placebtn')){closeAll();showConfirm();return;}
  if(t.closest('#confirmDone')){document.getElementById('confirm').classList.remove('on');document.body.classList.remove('locked');
    document.getElementById('menu').scrollIntoView({behavior:'smooth'});return;}
});
document.addEventListener('keydown',e=>{if(e.key==='Escape')closeAll();});

renderCart();
