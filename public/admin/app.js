class ApiClient {
  constructor(base = '/api') { this.base = base; this.token = null; }
  setToken(t){ this.token = t; }
  headers(){ return { 'Content-Type': 'application/json', ...(this.token?{ Authorization: 'Bearer '+this.token }:{} ) }; }
  async get(path){ const r = await fetch(this.base+path, { headers: this.headers() }); return r.json(); }
  async post(path, body){ const r = await fetch(this.base+path, { method:'POST', headers: this.headers(), body: JSON.stringify(body)}); return r.json(); }
  async put(path, body){ const r = await fetch(this.base+path, { method:'PUT', headers: this.headers(), body: JSON.stringify(body)}); return r.json(); }
  async del(path){ const r = await fetch(this.base+path, { method:'DELETE', headers: this.headers() }); return r.json(); }
}

const api = new ApiClient();
const content = document.getElementById('content');

document.getElementById('loginForm').addEventListener('submit', async (e) => {
  e.preventDefault();
  const form = e.target;
  const data = { correo: form.correo.value, contraseña: form.contraseña.value };
  const res = await api.post('/usuarios/login', data);
  if (res.token) {
    api.setToken(res.token);
    document.getElementById('loginMsg').innerText = `Bienvenido ${res.nombre}`;
  } else document.getElementById('loginMsg').innerText = res.message || 'Error';
});

document.getElementById('btnLoadProducts').addEventListener('click', async () => {
  const productos = await api.get('/productos');
  content.innerHTML = `<div class="card"><h2>Productos</h2>
    <table><tr><th>ID</th><th>Nombre</th><th>Precio</th></tr>
    ${productos.map(p=>`<tr><td>${p.id}</td><td>${p.nombre}</td><td>${p.precio}</td></tr>`).join('')}
    </table></div>`;
});

document.getElementById('btnLoadPagos').addEventListener('click', async () => {
  const pagos = await api.get('/pagos');
  content.innerHTML = `<div class="card"><h2>Pagos</h2>
    <table><tr><th>ID</th><th>Usuario</th><th>Total</th><th>Método</th><th>Fecha</th></tr>
    ${pagos.map(p=>`<tr><td>${p.id}</td><td>${p.usuario_id||'-'}</td><td>${p.total}</td><td>${p.metodo_pago}</td><td>${new Date(p.fecha).toLocaleString()}</td></tr>`).join('')}
    </table></div>`;
});
