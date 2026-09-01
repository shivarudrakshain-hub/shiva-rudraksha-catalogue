{{-- Themed per-niche PRODUCT PAGE. Extends the base layout (so it gets the niche
     header/footer/skin) with a fully custom, niche-styled product body + real add-to-cart.
     Rendered by HomeController@product for marketplace-niche products. --}}
@extends('frontend.layouts.app')
@section('meta_title', $detailedProduct->getTranslation('name') . ' | ' . get_setting('website_name'))
@php
    $slug = session('sf_skin');
    $cfg = config('storefronts.' . $slug);
    $dark = $cfg['dark'] ?? true;
    $ac = $cfg['accent']; $on = $cfg['on'];
    $bg = $dark ? '#0b0d13' : '#f6f7f9'; $surf = $dark ? '#141821' : '#ffffff';
    $ink = $dark ? '#eef2f7' : '#141414'; $muted = $dark ? '#98a1b2' : '#6b7280';
    $line = $dark ? 'rgba(255,255,255,.1)' : 'rgba(0,0,0,.1)';
    $co = json_decode($detailedProduct->choice_options, true) ?: [];
    $attrs = [];
    foreach ($co as $o) {
        $a = \App\Models\Attribute::find($o['attribute_id']);
        $attrs[] = ['id' => (int) $o['attribute_id'], 'name' => $a ? $a->name : ('Option'), 'values' => $o['values']];
    }
    $stock = [];
    foreach ($detailedProduct->stocks as $st) { $stock[$st->variant] = (float) $st->price; }
    $minp = $stock ? min($stock) : (float) $detailedProduct->unit_price;
    $sym = optional(\App\Models\Currency::find(get_setting('system_default_currency')))->symbol ?: '₹';
    $img = '/assets/store/img/' . $detailedProduct->slug . '.jpg';
    $features = [
        'volt' => '⚡ 2-year warranty + free fast shipping', 'crave' => '☕ Subscribe & save 15% on repeat orders',
        'thread' => '📏 Free size exchange within 7 days', 'stride' => '👟 True-to-size fit guarantee',
        'spex' => '🕶️ Try these on your face with live AR', 'luxe' => '💄 Cruelty-free · dermatologist tested',
        'nest' => '🪑 5-year build warranty · white-glove delivery', 'aurum' => '💍 Free engraving + lifetime polish',
        'apex' => '🏋️ Free 30-day training plan included', 'page' => '📓 Add personalisation at checkout',
    ];
@endphp
@section('content')
<style>
    .sfpdp{--ac:{{ $ac }};--on:{{ $on }};--bg:{{ $bg }};--surf:{{ $surf }};--ink:{{ $ink }};--muted:{{ $muted }};--line:{{ $line }};
        background:var(--bg);color:var(--ink);font-family:'{{ $cfg['font'] }}',serif;min-height:70vh}
    .sfpdp .b{font-family:'Inter',system-ui,sans-serif}
    .sfpdp a{color:inherit;text-decoration:none}
    .sfpdp .wrap{max-width:1140px;margin:0 auto;padding:1.6rem 1.2rem 4rem}
    .sfpdp .crumb{font-family:'Inter',sans-serif;font-size:.78rem;color:var(--muted);margin-bottom:1rem}
    .sfpdp .crumb a:hover{color:var(--ac)}
    .sfpdp .cols{display:grid;grid-template-columns:1fr 1fr;gap:2.4rem;align-items:start}
    .sfpdp .gal{border-radius:20px;overflow:hidden;border:1px solid var(--line);background:var(--surf);aspect-ratio:1/1}
    .sfpdp .gal img{width:100%;height:100%;object-fit:cover}
    .sfpdp h1{font-size:clamp(1.8rem,3.4vw,2.7rem);line-height:1.08;margin:.2rem 0 .5rem}
    .sfpdp .price{font-family:'Inter',sans-serif;font-weight:800;font-size:1.8rem;color:var(--ink);margin:.3rem 0 1rem}
    .sfpdp .desc{font-family:'Inter',sans-serif;color:var(--muted);line-height:1.6;margin-bottom:1.3rem}
    .sfpdp .opt{margin-bottom:1rem}
    .sfpdp .opt .lab{font-family:'Inter',sans-serif;font-size:.7rem;letter-spacing:.1em;text-transform:uppercase;color:var(--muted);margin-bottom:.4rem;display:block}
    .sfpdp .chips{display:flex;flex-wrap:wrap;gap:.5rem}
    .sfpdp .chip{font-family:'Inter',sans-serif;padding:.5rem .9rem;border-radius:999px;border:1px solid var(--line);background:transparent;color:var(--muted);cursor:pointer;font-size:.85rem;transition:.2s}
    .sfpdp .chip:hover{color:var(--ink)}
    .sfpdp .chip.on{border-color:var(--ac);color:var(--ink);background:color-mix(in srgb,var(--ac) 15%,transparent)}
    .sfpdp .buy{display:flex;gap:.8rem;align-items:center;margin:1.4rem 0 1rem}
    .sfpdp .qty{display:flex;align-items:center;border:1px solid var(--line);border-radius:999px;overflow:hidden}
    .sfpdp .qty button{width:40px;height:46px;border:none;background:transparent;color:var(--ink);font-size:1.1rem;cursor:pointer}
    .sfpdp .qty span{width:40px;text-align:center;font-family:'Inter',sans-serif;font-weight:700}
    .sfpdp .add{flex:1;padding:.95rem 1.4rem;border-radius:999px;border:none;cursor:pointer;background:var(--ac);color:var(--on);font-family:'Inter',sans-serif;font-weight:800;font-size:.95rem;box-shadow:0 16px 34px -16px var(--ac)}
    .sfpdp .add:disabled{opacity:.7}
    .sfpdp .msg{font-family:'Inter',sans-serif;font-size:.85rem;min-height:1.2rem;margin-bottom:1rem}
    .sfpdp .msg a{color:var(--ac);font-weight:700}
    .sfpdp .feat{font-family:'Inter',sans-serif;display:flex;align-items:center;gap:.6rem;padding:.9rem 1.1rem;border:1px dashed color-mix(in srgb,var(--ac) 55%,var(--line));border-radius:14px;background:color-mix(in srgb,var(--ac) 8%,transparent);font-size:.9rem;font-weight:600}
    .sfpdp .full{margin-top:3rem;border-top:1px solid var(--line);padding-top:1.6rem}
    .sfpdp .full h3{font-size:1.3rem;margin:0 0 .6rem}
    .sfpdp .full .body{font-family:'Inter',sans-serif;color:var(--muted);line-height:1.7}
    @media(max-width:820px){.sfpdp .cols{grid-template-columns:1fr}}
</style>
<div class="sfpdp">
    <div class="wrap">
        <div class="crumb"><a href="{{ url('/' . $slug) }}">{{ $cfg['brand'] }}</a> / <a href="{{ route('products.category', $cfg['cat']) }}">Shop</a> / <span>{{ $detailedProduct->getTranslation('name') }}</span></div>
        <div class="cols">
            <div class="gal"><img src="{{ $img }}" alt="{{ $detailedProduct->getTranslation('name') }}" onerror="this.onerror=null;this.src='https://loremflickr.com/800/800/{{ urlencode($cfg['cat']) }}';"></div>
            <div class="info">
                <h1>{{ $detailedProduct->getTranslation('name') }}</h1>
                <div class="price" id="sfPrice">{{ $sym }}{{ number_format($minp) }}</div>
                <div class="desc">{{ \Illuminate\Support\Str::limit(strip_tags($detailedProduct->getTranslation('description')), 180) }}</div>
                @foreach ($attrs as $a)
                    <div class="opt" data-attr="{{ $a['id'] }}">
                        <span class="lab">{{ $a['name'] }}</span>
                        <div class="chips">
                            @foreach ($a['values'] as $i => $v)
                                <button type="button" class="chip {{ $i === 0 ? 'on' : '' }}" data-attr="{{ $a['id'] }}" data-val="{{ $v }}">{{ $v }}</button>
                            @endforeach
                        </div>
                    </div>
                @endforeach
                <div class="buy">
                    <div class="qty"><button type="button" id="sfDec">−</button><span id="sfQty">1</span><button type="button" id="sfInc">+</button></div>
                    <button class="add" id="sfAdd">Add to cart · <span id="sfPrice2">{{ $sym }}{{ number_format($minp) }}</span></button>
                </div>
                <div class="msg" id="sfMsg"></div>
                <div class="feat">{{ $features[$slug] ?? '✓ Free shipping + easy returns' }}
                    @if($slug === 'spex') &nbsp;<a href="{{ url('/spex') }}" style="color:var(--ac);font-weight:800">Open AR try-on →</a>@endif
                </div>
            </div>
        </div>
        <div class="full">
            <h3>About this product</h3>
            <div class="body">{!! nl2br(e(strip_tags($detailedProduct->getTranslation('description')))) !!}</div>
        </div>
    </div>
</div>
<script>
(function(){
    var CSRF='{{ csrf_token() }}', SYM='{{ $sym }}', MIN={{ $minp }},
        ATTRS={!! json_encode(array_column($attrs,'id')) !!},
        STOCK={!! json_encode($stock) !!},
        PID={{ $detailedProduct->id }}, ADDURL='{{ route('cart.addToCart') }}', CARTURL='{{ route('cart') }}';
    var sel={}; document.querySelectorAll('.sfpdp .opt').forEach(function(o){var f=o.querySelector('.chip.on');if(f)sel[o.dataset.attr]=f.dataset.val;});
    function money(n){return SYM+Number(n||0).toLocaleString('en-IN');}
    function variant(){return ATTRS.map(function(id){return String(sel[id]).replace(/\s+/g,'');}).join('-');}
    function refresh(){var p=STOCK[variant()];p=(p==null?MIN:p);document.getElementById('sfPrice').textContent=money(p);document.getElementById('sfPrice2').textContent=money(p);}
    document.querySelectorAll('.sfpdp .chip').forEach(function(c){c.addEventListener('click',function(){
        sel[c.dataset.attr]=c.dataset.val;
        c.parentNode.querySelectorAll('.chip').forEach(function(x){x.classList.toggle('on',x===c);});refresh();});});
    var qty=1;document.getElementById('sfInc').onclick=function(){qty++;document.getElementById('sfQty').textContent=qty;};
    document.getElementById('sfDec').onclick=function(){if(qty>1){qty--;document.getElementById('sfQty').textContent=qty;}};
    document.getElementById('sfAdd').addEventListener('click',function(){
        var btn=this,msg=document.getElementById('sfMsg');btn.disabled=true;
        var body=new URLSearchParams();body.append('id',PID);body.append('quantity',qty);
        ATTRS.forEach(function(id){body.append('attribute_id_'+id,sel[id]);});
        fetch(ADDURL,{method:'POST',headers:{'X-CSRF-TOKEN':CSRF,'X-Requested-With':'XMLHttpRequest','Content-Type':'application/x-www-form-urlencoded'},body:body,credentials:'same-origin'})
        .then(function(r){return r.text();}).then(function(){btn.disabled=false;msg.innerHTML='Added to cart ✓ &nbsp;<a href="'+CARTURL+'">View cart →</a>';})
        .catch(function(){btn.disabled=false;msg.textContent='Could not add to cart. Try again.';});
    });
    refresh();
})();
</script>
@endsection
