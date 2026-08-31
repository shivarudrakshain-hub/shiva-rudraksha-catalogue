/* Generic marketplace-storefront runtime.
 * Reads window.STORE_ENGINE (injected by the /<niche> route) and builds the whole
 * commerce UI — product grid + variation pickers + cart drawer + checkout + account —
 * for ANY niche. Templates only provide theme + hero + a #products mount + nav buttons.
 * Backend contract = ForgeController (/store/*). Nothing product-specific is hardcoded here.
 */
(function () {
  var E = window.STORE_ENGINE;
  var mount = document.getElementById('products');
  if (!E || !mount) { if (mount) mount.innerHTML = '<p class="st-empty">Store engine not connected.</p>'; return; }

  var CUR = E.currency || '₹';
  var U = E.urls;
  var meta = document.querySelector('meta[name="csrf-token"]');
  var CSRF = meta ? meta.getAttribute('content') : '';
  function setCsrf(t) { if (t) { CSRF = t; if (meta) meta.setAttribute('content', t); } }

  function money(v) { return CUR + Number(v || 0).toLocaleString('en-IN'); }
  function el(tag, cls, html) { var e = document.createElement(tag); if (cls) e.className = cls; if (html != null) e.innerHTML = html; return e; }
  function esc(s) { return String(s == null ? '' : s).replace(/[&<>"]/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]; }); }

  function post(url, data) {
    var body = new URLSearchParams();
    Object.keys(data || {}).forEach(function (k) { body.append(k, data[k]); });
    return fetch(url, { method: 'POST', headers: { 'X-CSRF-TOKEN': CSRF, 'X-Requested-With': 'XMLHttpRequest', 'Content-Type': 'application/x-www-form-urlencoded' }, body: body, credentials: 'same-origin' })
      .then(function (r) { return r.json().catch(function () { return {}; }); });
  }
  function getJSON(url) { return fetch(url, { headers: { 'X-Requested-With': 'XMLHttpRequest' }, credentials: 'same-origin' }).then(function (r) { return r.json(); }); }

  /* ---- variant helpers ---- */
  function variantOf(p, sel) { return p.attributes.map(function (a) { return String(sel[a.id]).replace(/\s+/g, ''); }).join('-'); }
  function priceOf(p, sel) { var v = variantOf(p, sel); return (p.stock && p.stock[v] != null) ? p.stock[v] : p.min; }

  /* ---- product grid ---- */
  function renderProducts() {
    mount.innerHTML = '';
    E.products.forEach(function (p) {
      var sel = {};
      p.attributes.forEach(function (a) { sel[a.id] = a.values[0]; });

      var card = el('article', 'st-card');
      var media = el('div', 'st-media', '<div class="st-badge">' + (p.attributes[0] ? esc(sel[p.attributes[0].id]) : '') + '</div><div class="st-thumb" aria-hidden="true">' + esc(p.name.charAt(0)) + '</div>');
      var body = el('div', 'st-cbody');
      body.appendChild(el('h3', 'st-name', esc(p.name)));
      if (p.desc) body.appendChild(el('p', 'st-desc', esc(p.desc)));

      // variation chip rows
      p.attributes.forEach(function (a) {
        var row = el('div', 'st-opt');
        row.appendChild(el('span', 'st-optlabel', esc(a.name)));
        var chips = el('div', 'st-chips');
        a.values.forEach(function (val) {
          var b = el('button', 'st-chip' + (val === sel[a.id] ? ' on' : ''), esc(val));
          b.type = 'button';
          b.addEventListener('click', function () {
            sel[a.id] = val;
            [].forEach.call(chips.children, function (c) { c.classList.toggle('on', c.textContent === val); });
            price.textContent = money(priceOf(p, sel));
            media.querySelector('.st-badge').textContent = p.attributes[0] ? sel[p.attributes[0].id] : '';
          });
          chips.appendChild(b);
        });
        row.appendChild(chips);
        body.appendChild(row);
      });

      var footer = el('div', 'st-cfoot');
      var price = el('div', 'st-price', money(priceOf(p, sel)));
      var add = el('button', 'st-add', 'Add');
      add.type = 'button';
      add.addEventListener('click', function () {
        var data = { id: p.id, quantity: 1 };
        p.attributes.forEach(function (a) { data['attribute_id_' + a.id] = sel[a.id]; });
        add.disabled = true; add.textContent = '…';
        post(U.add, data).then(function () {
          add.textContent = '✓ Added'; add.classList.add('ok');
          refreshCart(true);
          setTimeout(function () { add.textContent = 'Add'; add.classList.remove('ok'); add.disabled = false; }, 1200);
        }).catch(function () { add.textContent = 'Add'; add.disabled = false; });
      });
      footer.appendChild(price); footer.appendChild(add);
      body.appendChild(footer);
      card.appendChild(media); card.appendChild(body);
      mount.appendChild(card);
    });
  }

  /* ---- commerce UI (drawer + checkout + confirm + account) injected once ---- */
  var ui = el('div', 'st-ui');
  ui.innerHTML =
    '<div class="st-scrim" data-close></div>' +
    '<aside class="st-drawer" aria-label="Cart"><header><b>Your cart</b><button class="st-x" data-close>&times;</button></header>' +
      '<div class="st-items"></div><div class="st-sum"><span>Subtotal</span><span class="st-subtotal">' + money(0) + '</span></div>' +
      '<button class="st-checkout" disabled>Checkout</button></aside>' +
    '<section class="st-sheet st-co"><div class="st-cowrap"><button class="st-x st-coback" data-coback>&larr;</button><h2>Checkout</h2>' +
      '<div class="st-cogrid"><form class="st-form">' +
        '<label>Full name<input name="name" required></label>' +
        '<label>Email<input name="email" type="email" required></label>' +
        '<label>Phone<input name="phone" required></label>' +
        '<label>Address<input name="address" required></label>' +
        '<div class="st-2"><label>City<input name="city" required></label><label>PIN<input name="postal_code" required></label></div>' +
        '<div class="st-pay"><label><input type="radio" name="payment" value="cod" checked> Cash on delivery</label>' +
        '<label><input type="radio" name="payment" value="online"> Pay online</label></div>' +
        '<button type="submit" class="st-place">Place order</button><p class="st-err"></p>' +
      '</form><div class="st-osum"><b>Order summary</b><div class="st-orows"></div><div class="st-sum"><span>Total</span><span class="st-ototal">' + money(0) + '</span></div></div></div></div></section>' +
    '<section class="st-sheet st-confirm"><div class="st-confirmbox"><div class="st-check">✓</div><h2>Order placed</h2><p>Your order <b class="st-code"></b> is confirmed.</p><button class="st-done" data-close>Continue shopping</button></div></section>' +
    '<section class="st-sheet st-acct"><div class="st-acctbox"><button class="st-x" data-close>&times;</button><div class="st-acctbody"></div></div></section>';
  document.body.appendChild(ui);

  var $ = function (s) { return ui.querySelector(s); };
  var itemsBox = $('.st-items'), subtotalEl = $('.st-subtotal'), checkoutBtn = $('.st-checkout');

  function openDrawer() { ui.classList.add('st-open-cart'); }
  function closeAll() { ui.className = 'st-ui'; }
  [].forEach.call(ui.querySelectorAll('[data-close]'), function (b) { b.addEventListener('click', closeAll); });
  $('.st-coback').addEventListener('click', function () { ui.classList.remove('st-open-co'); ui.classList.add('st-open-cart'); });

  var cartState = { total: 0, count: 0 };
  function renderCart(d) {
    cartState.total = d.total; cartState.count = d.count;
    itemsBox.innerHTML = '';
    if (!d.items.length) { itemsBox.innerHTML = '<p class="st-empty">Cart is empty.</p>'; checkoutBtn.disabled = true; }
    else {
      d.items.forEach(function (x) {
        var r = el('div', 'st-item');
        r.innerHTML = '<div class="st-iinfo"><b>' + esc(x.name) + '</b><span>' + esc(x.variation) + '</span></div>' +
          '<div class="st-iqty"><button data-a="dec">−</button><span>' + x.qty + '</span><button data-a="inc">+</button></div>' +
          '<div class="st-iline">' + money(x.line) + '<button class="st-rm" data-a="rm">Remove</button></div>';
        r.querySelector('[data-a=dec]').addEventListener('click', function () { post(U.update, { id: x.id, action: 'dec' }).then(renderCart); });
        r.querySelector('[data-a=inc]').addEventListener('click', function () { post(U.update, { id: x.id, action: 'inc' }).then(renderCart); });
        r.querySelector('[data-a=rm]').addEventListener('click', function () { post(U.remove, { id: x.id }).then(renderCart); });
        itemsBox.appendChild(r);
      });
      checkoutBtn.disabled = false;
    }
    subtotalEl.textContent = money(d.subtotal);
    var cc = document.getElementById('cartCount');
    if (cc) { cc.textContent = d.count; cc.style.display = d.count ? '' : 'none'; }
  }
  function refreshCart(open) { return getJSON(U.cart).then(function (d) { renderCart(d); if (open) openDrawer(); }); }

  checkoutBtn.addEventListener('click', function () {
    getJSON(U.cart).then(function (d) {
      var rows = $('.st-orows'); rows.innerHTML = '';
      d.items.forEach(function (x) { rows.appendChild(el('div', 'st-orow', '<span>' + x.qty + '× ' + esc(x.name) + '</span><span>' + money(x.line) + '</span>')); });
      $('.st-ototal').textContent = money(d.total);
      ui.classList.remove('st-open-cart'); ui.classList.add('st-open-co');
      getJSON(U.me).then(function (m) { if (m.auth && m.user) { var f = $('.st-form'); f.name.value = m.user.name || ''; f.email.value = m.user.email || ''; f.phone.value = m.user.phone || ''; } });
    });
  });

  $('.st-form').addEventListener('submit', function (ev) {
    ev.preventDefault();
    var f = ev.target, err = $('.st-err');
    err.textContent = '';
    var data = { name: f.name.value, email: f.email.value, phone: f.phone.value, address: f.address.value, city: f.city.value, postal_code: f.postal_code.value, payment: f.payment.value };
    var btn = $('.st-place'); btn.disabled = true; btn.textContent = 'Placing…';
    post(U.placeOrder, data).then(function (res) {
      btn.disabled = false; btn.textContent = 'Place order';
      if (res.ok) { $('.st-code').textContent = res.code; ui.classList.remove('st-open-co'); ui.classList.add('st-open-confirm'); refreshCart(false); }
      else if (res.needs_gateway) { err.textContent = res.message || 'Online payment not configured yet — use Cash on delivery.'; }
      else { err.textContent = res.message || (res.errors ? Object.values(res.errors)[0][0] : 'Could not place order.'); }
    }).catch(function () { btn.disabled = false; btn.textContent = 'Place order'; err.textContent = 'Network error.'; });
  });

  /* ---- account ---- */
  function openAccount() { renderAccount(); ui.classList.add('st-open-acct'); }
  function renderAccount() {
    var box = $('.st-acctbody');
    getJSON(U.me).then(function (m) {
      if (m.auth && m.user) {
        box.innerHTML = '<h2>Hi, ' + esc(m.user.name) + '</h2><p class="st-muted">' + esc(m.user.email) + '</p><h3>Your orders</h3><div class="st-myorders">Loading…</div><button class="st-logout">Log out</button>';
        box.querySelector('.st-logout').addEventListener('click', function () { post(U.logout, {}).then(function (r) { setCsrf(r.csrf); renderAccount(); }); });
        getJSON(U.orders).then(function (o) {
          var t = box.querySelector('.st-myorders');
          if (!o.orders || !o.orders.length) { t.innerHTML = '<p class="st-muted">No orders yet.</p>'; return; }
          t.innerHTML = o.orders.map(function (x) { return '<div class="st-orow"><span>' + esc(x.code) + ' · ' + esc(x.date) + '</span><span>' + money(x.total) + ' · ' + esc(x.status) + '</span></div>'; }).join('');
        });
      } else {
        box.innerHTML =
          '<div class="st-tabs"><button class="on" data-tab="login">Login</button><button data-tab="register">Register</button></div>' +
          '<form class="st-login"><label>Email<input name="email" type="email" required></label><label>Password<input name="password" type="password" required></label><button>Login</button><p class="st-err2"></p></form>' +
          '<form class="st-register" hidden><label>Name<input name="name" required></label><label>Email<input name="email" type="email" required></label><label>Phone<input name="phone" required></label><label>Password<input name="password" type="password" minlength="6" required></label><button>Create account</button><p class="st-err2"></p></form>';
        var lg = box.querySelector('.st-login'), rg = box.querySelector('.st-register');
        [].forEach.call(box.querySelectorAll('.st-tabs button'), function (t) {
          t.addEventListener('click', function () {
            [].forEach.call(box.querySelectorAll('.st-tabs button'), function (b) { b.classList.toggle('on', b === t); });
            lg.hidden = t.dataset.tab !== 'login'; rg.hidden = t.dataset.tab !== 'register';
          });
        });
        lg.addEventListener('submit', function (e) { e.preventDefault(); post(U.login, { email: lg.email.value, password: lg.password.value }).then(function (r) { if (r.ok) { setCsrf(r.csrf); renderAccount(); refreshCart(false); } else lg.querySelector('.st-err2').textContent = r.message || 'Login failed.'; }); });
        rg.addEventListener('submit', function (e) { e.preventDefault(); post(U.register, { name: rg.name.value, email: rg.email.value, phone: rg.phone.value, password: rg.password.value }).then(function (r) { if (r.ok) { setCsrf(r.csrf); renderAccount(); refreshCart(false); } else rg.querySelector('.st-err2').textContent = r.message || 'Registration failed.'; }); });
      }
    });
  }

  /* ---- wire nav buttons the template provides ---- */
  var cb = document.getElementById('cartBtn'); if (cb) cb.addEventListener('click', function () { refreshCart(true); });
  var ab = document.getElementById('acctBtn'); if (ab) ab.addEventListener('click', openAccount);

  renderProducts();
  refreshCart(false);
  window.STORE = { refreshCart: refreshCart, openDrawer: openDrawer, openAccount: openAccount };
})();
