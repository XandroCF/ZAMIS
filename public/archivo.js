 // Utilidades
    const $ = (q, root=document) => root.querySelector(q);
    const $$ = (q, root=document) => Array.from(root.querySelectorAll(q));
    const money = n => n.toLocaleString('es-CO', { style:'currency', currency:'COP', maximumFractionDigits:0 });
    const toast = (msg) => { const el = $('#toast'); el.textContent = msg; el.classList.add('show'); setTimeout(()=>el.classList.remove('show'), 1800); };

    // Data de ejemplo (reemplazable por fetch a futuro)
    const PRODUCTS = [
      {id:'p1', name:'Cargador inalambrico', price:8500, cat:'Tecnologia'},
      {id:'p2', name:'Perfume', price:3500, cat:'Belleza'},
      {id:'p3', name:'Cargador USB-C 20W', price:52000, cat:'Tecnologia'},
      {id:'p4', name:'Audífonos in-ear', price:38000, cat:'Tecnologia'},
      {id:'p5', name:'Cinta adhesiva', price:4200, cat:'Hogar'},
      {id:'p6', name:'Camiseta', price:2600, cat:'Ropa'},
      {id:'p7', name:'Medias', price:5900, cat:'Ropa'},
      {id:'p8', name:' ', price:41000, cat:'Hogar'},
      {id:'p9', name:'Batería externa 10k', price:89900, cat:'Tecnologia'},
      {id:'p10', name:'Maquillaje', price:2100, cat:'Belleza'},
      {id:'p11', name:'fundas de telefono', price:7300, cat:'Tecnologia'},
      {id:'p12', name:'Linterna LED', price:23000, cat:'Hogar'}
    ];

    // Estado
    let cart = [];

    function renderProducts(){
      const q = $('#q').value.trim().toLowerCase();
      const cat = $('#cat').value;
      const sort = $('#sort').value;

      let list = PRODUCTS.filter(p => (!cat || p.cat===cat) && (!q || p.name.toLowerCase().includes(q)));

      switch(sort){
        case 'precio-asc': list.sort((a,b)=>a.price-b.price); break;
        case 'precio-desc': list.sort((a,b)=>b.price-a.price); break;
        case 'nombre': list.sort((a,b)=>a.name.localeCompare(b.name)); break;
        default: /* relevancia: sin cambios */
      }

      $('#countHelp').textContent = list.length + (list.length===1? ' resultado':' resultados');

      const grid = $('#grid');
      grid.innerHTML = '';
      list.forEach(p=>{
        const card = document.createElement('article');
        card.className = 'card';
        card.innerHTML = `
          <div class="thumb" role="img" aria-label="${p.name}"></div>
          <div class="body">
            <h4 class="title">${p.name}</h4>
            <div class="meta">${p.cat}</div>
            <div class="price">${money(p.price)}</div>
            <div class="actions">
              <button class="btn btn-primary" data-add="${p.id}">Añadir</button>
              <button class="btn" data-quick="${p.id}">Vista rápida</button>
            </div>
          </div>`;
        grid.appendChild(card);
      });
    }

    function addToCart(id){
      const item = cart.find(i=>i.id===id);
      if(item) item.qty++; else cart.push({id, qty:1});
      updateCart();
      toast('Agregado al carrito');
    }

    function removeFromCart(id){
      cart = cart.filter(i=>i.id!==id);
      updateCart();
    }

    function updateCart(){
      const list = $('#cartList');
      list.innerHTML = '';
      let total = 0;
      cart.forEach(i=>{
        const p = PRODUCTS.find(x=>x.id===i.id);
        const sub = p.price * i.qty;
        total += sub;
        const row = document.createElement('div');
        row.className = 'cart-item';
        row.innerHTML = `
          <div class="cart-thumb"></div>
          <div>
            <div style="font-weight:800">${p.name}</div>
            <div class="help">${i.qty} × ${money(p.price)}</div>
          </div>
          <div style="display:grid; gap:6px; justify-items:end">
            <strong>${money(sub)}</strong>
            <button class="btn" data-remove="${i.id}">Eliminar</button>
          </div>`;
        list.appendChild(row);
      });
      $('#cartTotal').textContent = money(total);
      $('#cartCount').textContent = cart.reduce((a,b)=>a+b.qty,0);
    }

    // Navegación / eventos
    document.addEventListener('click', (e)=>{
      const add = e.target.closest('[data-add]');
      if(add){ addToCart(add.getAttribute('data-add')); }

      const rem = e.target.closest('[data-remove]');
      if(rem){ removeFromCart(rem.getAttribute('data-remove')); }
    });

    // Filtros
    ['q','cat','sort'].forEach(id=>$('#'+id).addEventListener('input', renderProducts));

    // Smooth scroll
    $$('#menu a[href^="#"]').forEach(a=>a.addEventListener('click', evt=>{
      evt.preventDefault();
      const href = a.getAttribute('href');
      document.querySelector(href).scrollIntoView({behavior:'smooth'});
      $$('#menu a').forEach(x=>x.classList.remove('active')); a.classList.add('active');
    }));

    $('#verProductos').addEventListener('click', ()=>{
      document.querySelector('#productos').scrollIntoView({behavior:'smooth'});
      $$('#menu a').forEach(x=>x.classList.remove('active')); $('a[href="#productos"]').classList.add('active');
    });

    // Drawer carrito
    const drawer = $('#drawer');
    $('#openCart').addEventListener('click', ()=>{ drawer.classList.add('open'); drawer.setAttribute('aria-hidden','false'); });
    $('#closeCart').addEventListener('click', ()=>{ drawer.classList.remove('open'); drawer.setAttribute('aria-hidden','true'); });

    // Menú móvil simple
    $('#openMenu').addEventListener('click', ()=>{
      const ul = $('#menu');
      const disp = getComputedStyle(ul).display;
      ul.style.display = disp==='flex' || disp==='block' ? 'none' : 'flex';
      ul.style.flexDirection = 'column';
      ul.style.gap = '8px';
    });


    // Formulario de contacto (ahora conectado a la base de datos)
    $('#form').addEventListener('submit', async (e) => {
      e.preventDefault();

      const form = e.currentTarget;
      const data = Object.fromEntries(new FormData(form));

      if (!data.nombre || !data.email || !data.mensaje) {
        toast('⚠️ Completa todos los campos');
        return;
      }

      try {
        const res = await fetch('/contactos', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(data)
        });

        const result = await res.json();

        if (res.ok) {
          toast('✅ Mensaje enviado y guardado');
          console.log('Guardado en base de datos:', result);
          form.reset();
        } else {
          toast('❌ No se pudo guardar el mensaje');
          console.error(result);
        }
      } catch (error) {
        toast('⚠️ Error al conectar con el servidor');
        console.error(error);
      }
    });


    $('#checkout').addEventListener('click', ()=>{
      if(cart.length===0){ toast('Tu carrito está vacío'); return; }
      toast('Gracias por tu compra');
      cart = []; updateCart();
    });

    // Inicio
    $('#year').textContent = new Date().getFullYear();
    renderProducts();