{{-- Themed product LISTING for a niche (matches the Stitch "All Products Listing").
     Extends the base layout (niche header/footer/skin) + real niche products + quick add-to-cart. --}}
@extends('frontend.layouts.app')
@section('meta_title', ($cfg = config('storefronts.' . $slug))['brand'] . ' — Shop | ' . get_setting('website_name'))
@php
    $cfg = config('storefronts.' . $slug);
    $dark = $cfg['dark']; $ac = $cfg['accent']; $on = $cfg['on'];
    $bg = $dark ? '#080a11' : '#f4f6f9'; $surf = $dark ? '#12141d' : '#ffffff';
    $ink = $dark ? '#eef2f7' : '#141414'; $muted = $dark ? '#8b93a3' : '#6b7280';
    $line = $dark ? 'rgba(255,255,255,.1)' : 'rgba(0,0,0,.1)';
    $sym = optional(\App\Models\Currency::find(get_setting('system_default_currency')))->symbol ?: '₹';
    $prices = [];
    foreach ($products as $p) { $prices[] = (float) home_base_price($p, false); }
    $pmin = $prices ? floor(min($prices)) : 0; $pmax = $prices ? ceil(max($prices)) : 100000;
@endphp
@section('content')
<style>
    @import url('https://fonts.googleapis.com/css2?family={{ str_replace(' ', '+', $cfg['font']) }}:wght@600;700&family=Inter:wght@400;500;600;700&display=swap');
    .sflist{--ac:{{ $ac }};--on:{{ $on }};--bg:{{ $bg }};--surf:{{ $surf }};--ink:{{ $ink }};--muted:{{ $muted }};--line:{{ $line }};background:var(--bg);color:var(--ink);font-family:'Inter',system-ui,sans-serif;min-height:80vh}
    .sflist .head{text-align:center;padding:3.2rem 1rem 2rem;border-bottom:1px solid var(--line)}
    .sflist .head h1{font-family:'{{ $cfg['font'] }}',serif;font-size:clamp(2.2rem,5vw,3.4rem);margin:0}
    .sflist .wrap{max-width:1200px;margin:0 auto;padding:2rem 1.2rem 4rem;display:grid;grid-template-columns:240px 1fr;gap:2rem;align-items:start}
    .sflist .filters{position:sticky;top:80px}
    .sflist .filters h3{font-size:.95rem;margin:0 0 1rem}
    .sflist .fg{border-top:1px solid var(--line);padding:1rem 0}
    .sflist .fg h4{font-size:.82rem;font-weight:700;margin:0 0 .7rem;display:flex;justify-content:space-between}
    .sflist .fg label{display:flex;align-items:center;gap:.5rem;color:var(--muted);font-size:.85rem;margin:.35rem 0;cursor:pointer}
    .sflist .fg input[type=range]{width:100%;accent-color:var(--ac)}
    .sflist .prange{display:flex;justify-content:space-between;color:var(--muted);font-size:.78rem;margin-top:.3rem}
    .sflist .grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(220px,1fr));gap:1.3rem}
    .sflist .card{display:flex;flex-direction:column;background:var(--surf);border:1px solid var(--line);border-radius:16px;overflow:hidden;transition:transform .25s,box-shadow .25s}
    .sflist .card:hover{transform:translateY(-4px);box-shadow:0 24px 44px -26px rgba(0,0,0,.6)}
    .sflist .card .im{aspect-ratio:1/1;background:#fff;overflow:hidden}
    .sflist .card .im img{width:100%;height:100%;object-fit:cover}
    .sflist .card .cb{padding:.9rem 1rem 1.1rem;display:flex;flex-direction:column;gap:.3rem;flex:1}
    .sflist .card .nm{font-weight:700;font-size:.98rem}
    .sflist .card .ds{color:var(--muted);font-size:.78rem;flex:1}
    .sflist .card .pr{font-weight:800;font-size:1.1rem;margin-top:.2rem}
    .sflist .card .atc{margin-top:.6rem;width:100%;padding:.6rem;border-radius:10px;border:none;cursor:pointer;background:var(--ac);color:var(--on);font:inherit;font-weight:700;font-size:.82rem;transition:filter .2s}
    .sflist .card .atc:hover{filter:brightness(1.06)}.sflist .card .atc:disabled{opacity:.7}
    .sflist .toast{position:fixed;right:18px;bottom:18px;z-index:300;background:var(--ac);color:var(--on);font-weight:700;padding:.8rem 1.2rem;border-radius:12px;opacity:0;transform:translateY(10px);transition:.25s;font-size:.88rem}
    .sflist .toast.on{opacity:1;transform:none}
    .sflist .toast a{color:var(--on);text-decoration:underline}
    @media(max-width:820px){.sflist .wrap{grid-template-columns:1fr}.sflist .filters{position:static}}
</style>
<div class="sflist">
    <div class="head"><h1>{{ $cfg['brand'] }} — All Products</h1></div>
    <div class="wrap">
        <aside class="filters">
            <h3>Filters</h3>
            <div class="fg"><h4>Category</h4>
                <label><input type="checkbox" checked disabled> {{ \App\Models\Category::where('slug', $catSlug)->value('name') }} ({{ count($products) }})</label>
            </div>
            <div class="fg"><h4>Price range</h4>
                <input type="range" id="sfPr" min="{{ $pmin }}" max="{{ $pmax }}" value="{{ $pmax }}">
                <div class="prange"><span>{{ $sym }}{{ number_format($pmin) }}</span><span id="sfPrV">{{ $sym }}{{ number_format($pmax) }}</span></div>
            </div>
            <div class="fg"><h4>Availability</h4>
                <label><input type="checkbox" checked disabled> In stock</label>
            </div>
        </aside>
        <div>
            <div class="grid" id="sfGrid">
                @forelse ($products as $product)
                    @php
                        $co = json_decode($product->choice_options, true) ?: [];
                        $def = [];
                        foreach ($co as $o) { $def[$o['attribute_id']] = $o['values'][0] ?? ''; }
                        $pr = (float) home_base_price($product, false);
                    @endphp
                    <div class="card" data-price="{{ $pr }}">
                        <a class="im" href="{{ route('product', $product->slug) }}"><img loading="lazy" src="/assets/store/img/{{ $product->slug }}.jpg" alt="{{ $product->getTranslation('name') }}" onerror="this.onerror=null;this.src='https://loremflickr.com/500/500/{{ urlencode($cfg['cat']) }}';"></a>
                        <div class="cb">
                            <a class="nm" href="{{ route('product', $product->slug) }}" style="color:inherit;text-decoration:none">{{ $product->getTranslation('name') }}</a>
                            <div class="ds">{{ \Illuminate\Support\Str::limit(strip_tags($product->getTranslation('description')), 56) }}</div>
                            <div class="pr">{!! home_base_price($product) !!}</div>
                            <button class="atc" data-id="{{ $product->id }}" data-def='@json($def)'>Add to Cart</button>
                        </div>
                    </div>
                @empty
                    <p style="color:var(--muted)">No products yet.</p>
                @endforelse
            </div>
        </div>
    </div>
    <div class="toast" id="sfToast"></div>
</div>
<script>
(function(){
    var CSRF='{{ csrf_token() }}', ADD='{{ route('cart.addToCart') }}', CART='{{ route('cart') }}';
    var pr=document.getElementById('sfPr'), prv=document.getElementById('sfPrV'), toast=document.getElementById('sfToast'), SYM='{{ $sym }}';
    if(pr){pr.addEventListener('input',function(){prv.textContent=SYM+Number(pr.value).toLocaleString('en-IN');
        document.querySelectorAll('#sfGrid .card').forEach(function(c){c.style.display=(parseFloat(c.dataset.price)<=parseFloat(pr.value))?'':'none';});});}
    function tip(html){toast.innerHTML=html;toast.classList.add('on');setTimeout(function(){toast.classList.remove('on');},2600);}
    document.querySelectorAll('.atc').forEach(function(b){b.addEventListener('click',function(){
        var def=JSON.parse(b.dataset.def||'{}');var body=new URLSearchParams();body.append('id',b.dataset.id);body.append('quantity',1);
        Object.keys(def).forEach(function(k){body.append('attribute_id_'+k,def[k]);});
        b.disabled=true;b.textContent='Adding…';
        fetch(ADD,{method:'POST',headers:{'X-CSRF-TOKEN':CSRF,'X-Requested-With':'XMLHttpRequest','Content-Type':'application/x-www-form-urlencoded'},body:body,credentials:'same-origin'})
        .then(function(r){return r.text();}).then(function(){b.disabled=false;b.textContent='Add to Cart';tip('Added to cart ✓ &nbsp;<a href="'+CART+'">View cart →</a>');})
        .catch(function(){b.disabled=false;b.textContent='Add to Cart';tip('Could not add. Try again.');});
    });});
})();
</script>
@endsection
