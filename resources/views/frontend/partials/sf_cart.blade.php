{{-- Themed CART — faithful to the Stitch "Shopping Cart Summary".
     Rendered by CartController@index only when a storefront skin is active.
     Reuses the live engine: cart.updateQuantity / cart.removeFromCart + cart_product_price/tax. --}}
@extends('frontend.layouts.app')
@section('meta_title', 'Cart | ' . get_setting('website_name'))
@php
    $slug = session('sf_skin');
    $cfg = config('storefronts.' . $slug);
    $dark = $cfg['dark'] ?? true;
    $ac = $cfg['accent']; $on = $cfg['on'];
    $bg = $dark ? '#0a0c12' : '#f6f7f9'; $surf = $dark ? '#12151d' : '#ffffff';
    $ink = $dark ? '#eef2f7' : '#141414'; $muted = $dark ? '#98a1b2' : '#6b7280';
    $line = $dark ? 'rgba(255,255,255,.1)' : 'rgba(0,0,0,.1)';

    $subtotal = 0; $taxTotal = 0; $ids = [];
    foreach ($carts as $c) {
        if (!$c->product) continue;
        $subtotal += cart_product_price($c, $c->product, false, false) * $c->quantity;
        $taxTotal += cart_product_tax($c, $c->product, false) * $c->quantity;
        $ids[] = $c->id;
    }
    $grand = $subtotal + $taxTotal;
@endphp
@section('content')
<style>
    .sfcart{--ac:{{ $ac }};--on:{{ $on }};--bg:{{ $bg }};--surf:{{ $surf }};--ink:{{ $ink }};--muted:{{ $muted }};--line:{{ $line }};
        background:var(--bg);color:var(--ink);font-family:'Inter',system-ui,sans-serif;min-height:80vh}
    .sfcart .wrap{max-width:1160px;margin:0 auto;padding:2.4rem 1.2rem 5rem}
    .sfcart h1{font-family:'{{ $cfg['font'] }}',serif;font-weight:600;font-size:clamp(2rem,4.4vw,2.9rem);margin:0 0 1.8rem}
    .sfcart .cols{display:grid;grid-template-columns:1fr 340px;gap:1.8rem;align-items:start}
    .sfcart .panel{background:var(--surf);border:1px solid var(--line);border-radius:16px;overflow:hidden}
    .sfcart .thead{display:grid;grid-template-columns:2.4fr 1fr 1.2fr 1fr;gap:1rem;padding:1rem 1.3rem;color:var(--muted);font-size:.82rem;border-bottom:1px solid var(--line)}
    .sfcart .thead .r{text-align:right}
    .sfcart .row{display:grid;grid-template-columns:2.4fr 1fr 1.2fr 1fr;gap:1rem;align-items:center;padding:1.15rem 1.3rem;border-bottom:1px solid var(--line)}
    .sfcart .row:last-child{border-bottom:none}
    .sfcart .pi{display:flex;gap:.9rem;align-items:center;min-width:0}
    .sfcart .pi .im{width:64px;height:64px;border-radius:10px;overflow:hidden;background:#fff;flex:0 0 auto}
    .sfcart .pi .im img{width:100%;height:100%;object-fit:cover}
    .sfcart .pi .nm{font-weight:600;font-size:.95rem;line-height:1.3}
    .sfcart .pi .nm a{color:var(--ink);text-decoration:none}
    .sfcart .pi .va{color:var(--muted);font-size:.8rem;margin-top:.15rem}
    .sfcart .pr{font-weight:600}
    .sfcart .qty{display:inline-flex;align-items:center;border:1px solid var(--line);border-radius:999px;overflow:hidden}
    .sfcart .qty button{width:34px;height:38px;border:none;background:transparent;color:var(--ink);font-size:1rem;cursor:pointer}
    .sfcart .qty span{width:34px;text-align:center;font-weight:700}
    .sfcart .r{text-align:right}
    .sfcart .tot{font-weight:700}
    .sfcart .rm{background:none;border:none;color:var(--muted);cursor:pointer;font-size:1.1rem;margin-left:.5rem}
    .sfcart .rm:hover{color:#e35}
    /* summary */
    .sfcart .sum{background:var(--surf);border:1px solid var(--line);border-radius:16px;padding:1.4rem 1.5rem}
    .sfcart .sum h3{font-family:'{{ $cfg['font'] }}',serif;font-weight:600;font-size:1.25rem;margin:0 0 1.1rem}
    .sfcart .sl{display:flex;justify-content:space-between;color:var(--muted);font-size:.9rem;padding:.35rem 0}
    .sfcart .sl.big{color:var(--ink);font-weight:700;font-size:1.05rem;border-top:1px solid var(--line);margin-top:.7rem;padding-top:.9rem}
    .sfcart .co{display:block;width:100%;text-align:center;margin-top:1.2rem;padding:.95rem;border-radius:12px;border:none;cursor:pointer;
        background:linear-gradient(180deg,color-mix(in srgb,var(--ac) 118%,#fff),var(--ac));color:var(--on);font-weight:700;font-size:.95rem;text-decoration:none}
    .sfcart .co:hover{filter:brightness(1.06)}
    .sfcart .eta{color:var(--muted);font-size:.8rem;text-align:center;margin-top:.8rem}
    .sfcart .actions{display:flex;justify-content:space-between;margin-top:1.4rem;gap:1rem;flex-wrap:wrap}
    .sfcart .btn{padding:.7rem 1.3rem;border-radius:999px;border:1px solid var(--line);background:transparent;color:var(--ink);font:inherit;font-weight:600;font-size:.85rem;cursor:pointer;text-decoration:none}
    .sfcart .btn:hover{border-color:var(--ac)}
    .sfcart .empty{text-align:center;padding:4rem 1rem;color:var(--muted)}
    .sfcart .empty a{display:inline-block;margin-top:1rem;padding:.85rem 1.6rem;border-radius:999px;background:var(--ac);color:var(--on);text-decoration:none;font-weight:700}
    @media(max-width:820px){.sfcart .cols{grid-template-columns:1fr}.sfcart .thead{display:none}
        .sfcart .row{grid-template-columns:1fr auto;grid-auto-rows:auto;gap:.5rem 1rem}
        .sfcart .row .pi{grid-column:1 / -1}}
</style>
<div class="sfcart">
    <div class="wrap">
        <h1>Shopping Cart Summary</h1>
        @if (count($ids) == 0)
            <div class="empty"><p>Your cart is currently empty.</p><a href="{{ url('/' . $slug . '/shop') }}">Continue shopping →</a></div>
        @else
        <div class="cols">
            <div>
                <div class="panel">
                    <div class="thead"><span>Product</span><span>Price</span><span>Quantity</span><span class="r">Total</span></div>
                    @foreach ($carts as $cart)
                        @php $p = $cart->product; @endphp
                        @if ($p)
                        @php
                            $unit = cart_product_price($cart, $p, false, false);
                            $localImg = '/assets/store/img/' . $p->slug . '.jpg';
                            $thumb = $p->thumbnail ? get_image($p->thumbnail) : $localImg;
                        @endphp
                        <div class="row" id="crow-{{ $cart->id }}">
                            <div class="pi">
                                <a class="im" href="{{ route('product', $p->slug) }}"><img src="{{ $thumb }}" alt="{{ $p->getTranslation('name') }}" onerror="this.onerror=null;this.src='{{ $localImg }}'"></a>
                                <div>
                                    <div class="nm"><a href="{{ route('product', $p->slug) }}">{{ $p->getTranslation('name') }}</a></div>
                                    @if ($cart->variation)<div class="va">{{ str_replace('-', ' · ', $cart->variation) }}</div>@endif
                                </div>
                            </div>
                            <div class="pr">{{ single_price($unit) }}</div>
                            <div>
                                <div class="qty">
                                    <button type="button" onclick="sfCartQty({{ $cart->id }},-1)">−</button>
                                    <span id="cq-{{ $cart->id }}">{{ $cart->quantity }}</span>
                                    <button type="button" onclick="sfCartQty({{ $cart->id }},1)">+</button>
                                </div>
                            </div>
                            <div class="r"><span class="tot">{{ single_price($unit * $cart->quantity) }}</span>
                                <button class="rm" title="Remove" onclick="sfCartDel({{ $cart->id }})">&times;</button></div>
                        </div>
                        @endif
                    @endforeach
                </div>
                <div class="actions">
                    <a class="btn" href="{{ url('/' . $slug . '/shop') }}">← Continue Shopping</a>
                    <button class="btn" onclick="sfCartEmpty()">Empty Cart</button>
                </div>
            </div>
            <aside class="sum">
                <h3>Order Summary</h3>
                <div class="sl"><span>Subtotal</span><span>{{ single_price($subtotal) }}</span></div>
                @if ($taxTotal > 0)<div class="sl"><span>Tax (GST)</span><span>{{ single_price($taxTotal) }}</span></div>@endif
                <div class="sl"><span>Shipping</span><span>Calculated at checkout</span></div>
                <div class="sl big"><span>Grand Total</span><span>{{ single_price($grand) }}</span></div>
                <a class="co" href="{{ route('checkout') }}">Proceed to Checkout</a>
                <div class="eta">Estimated delivery: 3–5 business days</div>
            </aside>
        </div>
        @endif
    </div>
</div>
<script>
(function(){
    var CSRF='{{ csrf_token() }}', UP='{{ route('cart.updateQuantity') }}', RM='{{ route('cart.removeFromCart') }}', IDS={!! json_encode($ids) !!};
    function post(url,data){var b=new URLSearchParams();Object.keys(data).forEach(function(k){b.append(k,data[k]);});
        return fetch(url,{method:'POST',headers:{'X-CSRF-TOKEN':CSRF,'X-Requested-With':'XMLHttpRequest','Content-Type':'application/x-www-form-urlencoded'},body:b,credentials:'same-origin'});}
    window.sfCartQty=function(id,delta){var el=document.getElementById('cq-'+id);var q=parseInt(el.textContent,10)+delta;if(q<1)return;
        el.textContent=q;post(UP,{id:id,quantity:q}).then(function(){location.reload();});};
    window.sfCartDel=function(id){post(RM,{id:id}).then(function(){location.reload();});};
    window.sfCartEmpty=function(){if(!IDS.length)return;Promise.all(IDS.map(function(id){return post(RM,{id:id});})).then(function(){location.reload();});};
})();
</script>
@endsection
