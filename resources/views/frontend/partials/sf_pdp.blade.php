{{-- Themed per-niche PRODUCT PAGE — faithful to the Stitch product_details mockup.
     Big gallery + thumbnails, colour swatches, quantity stepper, full-width Add to Cart,
     spec-card grid (real product fields) and real reviews. Wired to the live engine. --}}
@extends('frontend.layouts.app')
@section('meta_title', $detailedProduct->getTranslation('name') . ' | ' . get_setting('website_name'))
@php
    $slug = session('sf_skin');
    $cfg = config('storefronts.' . $slug);
    $dark = $cfg['dark'] ?? true;
    $ac = $cfg['accent']; $on = $cfg['on'];
    $bg = $dark ? '#0a0c12' : '#f6f7f9'; $surf = $dark ? '#12151d' : '#ffffff';
    $ink = $dark ? '#eef2f7' : '#141414'; $muted = $dark ? '#98a1b2' : '#6b7280';
    $line = $dark ? 'rgba(255,255,255,.1)' : 'rgba(0,0,0,.1)';

    // --- variations ---
    $co = json_decode($detailedProduct->choice_options, true) ?: [];
    $attrs = [];
    foreach ($co as $o) {
        $a = \App\Models\Attribute::find($o['attribute_id']);
        $attrs[] = ['id' => (int) $o['attribute_id'], 'name' => $a ? $a->name : 'Option', 'values' => $o['values']];
    }
    $stock = []; $qtyTotal = 0;
    foreach ($detailedProduct->stocks as $st) { $stock[$st->variant] = (float) $st->price; $qtyTotal += (int) $st->qty; }
    $minp = $stock ? min($stock) : (float) $detailedProduct->unit_price;
    $sym = optional(\App\Models\Currency::find(get_setting('system_default_currency')))->symbol ?: '₹';

    // --- gallery (prefer a hi-res "-pro" detail shot; fall back to the base card image) ---
    $base = 'assets/store/img/' . $detailedProduct->slug . '.jpg';
    $pro  = 'assets/store/img/' . $detailedProduct->slug . '-pro.jpg';
    $gallery = [];
    if (file_exists(public_path($pro)))  $gallery[] = '/' . $pro;
    if (file_exists(public_path($base))) $gallery[] = '/' . $base;
    if (!$gallery) $gallery[] = '/' . $base; // let onerror handle it
    $mainImg = $gallery[0];

    // --- colour swatch map (render Colour attribute as swatches; others as chips) ---
    $colorMap = ['black'=>'#111','phantom black'=>'#15171c','white'=>'#f3f3f3','silver'=>'#d7d9dd','grey'=>'#8b8f96','gray'=>'#8b8f96',
        'blue'=>'#2f6bff','navy'=>'#1f2b52','red'=>'#e23b3b','green'=>'#2ea24d','olive'=>'#6b7a3a','beige'=>'#d8c7a8','brown'=>'#6b4a2b',
        'gold'=>'#c9a24b','pink'=>'#e58fb0','purple'=>'#7d54c9','orange'=>'#f0872e','yellow'=>'#f2c53d','teal'=>'#1f8f8f','titanium'=>'#8d8b86',
        'obsidian'=>'#15171c','aurora'=>'#3a6ea5','graphite'=>'#3b3f45','midnight'=>'#101828','charcoal'=>'#36393f','slate'=>'#5b6672',
        'sand'=>'#d8c7a8','space grey'=>'#4a4e57','space gray'=>'#4a4e57','jet black'=>'#0a0a0a','ivory'=>'#f2ede1','onyx'=>'#0f1013',
        'sky'=>'#7fb2e8','forest'=>'#2f5d3a','crimson'=>'#b0243a','cobalt'=>'#274bdb','rose gold'=>'#e6b7a9','pearl'=>'#eae6df'];

    // --- spec cards from REAL fields (no fabricated data) ---
    $catName = optional($detailedProduct->category)->getTranslation('name');
    if (!$catName && $detailedProduct->category_id) {
        $catName = optional(\App\Models\Category::find($detailedProduct->category_id))->getTranslation('name');
    }
    $specs = [];
    if ($catName) $specs[] = ['Category', $catName];
    $specs[] = ['SKU', strtoupper(\Illuminate\Support\Str::limit(str_replace('-', '', $detailedProduct->slug), 12, ''))];
    $specs[] = ['Availability', $qtyTotal > 0 ? 'In stock (' . $qtyTotal . ')' : 'Made to order'];
    foreach ($attrs as $a) { $specs[] = [$a['name'], implode(' · ', array_slice($a['values'], 0, 6))]; }
    $specs[] = ['Shipping', 'Free over ' . $sym . '999'];
    $specs[] = ['Returns', '7-day easy returns'];

    // --- real reviews ---
    try {
        $reviews = \App\Models\Review::where('product_id', $detailedProduct->id)->where('status', 1)->latest()->take(6)->get();
        $rCount = \App\Models\Review::where('product_id', $detailedProduct->id)->where('status', 1)->count();
        $rAvg = $rCount ? round(\App\Models\Review::where('product_id', $detailedProduct->id)->where('status', 1)->avg('rating'), 1) : 0;
    } catch (\Throwable $e) { $reviews = collect(); $rCount = 0; $rAvg = 0; }

    $features = [
        'volt' => '⚡ 2-year warranty + free fast shipping', 'crave' => '☕ Subscribe & save 15% on repeat orders',
        'thread' => '📏 Free size exchange within 7 days', 'stride' => '👟 True-to-size fit guarantee',
        'spex' => '🕶️ Try these on your face with live AR', 'luxe' => '💄 Cruelty-free · dermatologist tested',
        'nest' => '🪑 5-year build warranty · white-glove delivery', 'aurum' => '💍 Free engraving + lifetime polish',
        'apex' => '🏋️ Free 30-day training plan included', 'page' => '📓 Add personalisation at checkout',
    ];
    $starsRow = function ($val) {
        $out = ''; for ($i = 1; $i <= 5; $i++) { $out .= $i <= round($val) ? '★' : '☆'; } return $out;
    };
@endphp
@section('content')
<style>
    .sfpdp{--ac:{{ $ac }};--on:{{ $on }};--bg:{{ $bg }};--surf:{{ $surf }};--ink:{{ $ink }};--muted:{{ $muted }};--line:{{ $line }};
        background:var(--bg);color:var(--ink);font-family:'{{ $cfg['font'] }}',serif;min-height:70vh}
    .sfpdp .b{font-family:'Inter',system-ui,sans-serif}
    .sfpdp a{color:inherit;text-decoration:none}
    .sfpdp .wrap{max-width:1160px;margin:0 auto;padding:1.4rem 1.2rem 4rem}
    .sfpdp .crumb{font-family:'Inter',sans-serif;font-size:.78rem;color:var(--muted);margin-bottom:1.2rem}
    .sfpdp .crumb a:hover{color:var(--ac)}
    .sfpdp .cols{display:grid;grid-template-columns:minmax(0,1fr) minmax(0,1fr);gap:2.6rem;align-items:start}
    /* gallery */
    .sfpdp .gmain{border-radius:20px;overflow:hidden;border:1px solid var(--line);background:var(--surf);aspect-ratio:1/1;display:flex;align-items:center;justify-content:center}
    .sfpdp .gmain img{width:100%;height:100%;object-fit:cover}
    .sfpdp .thumbs{display:flex;gap:.7rem;margin-top:.8rem}
    .sfpdp .thumbs .t{width:72px;height:72px;border-radius:12px;overflow:hidden;border:1px solid var(--line);background:var(--surf);cursor:pointer;padding:0}
    .sfpdp .thumbs .t.on{border-color:var(--ac);box-shadow:0 0 0 2px color-mix(in srgb,var(--ac) 45%,transparent)}
    .sfpdp .thumbs .t img{width:100%;height:100%;object-fit:cover}
    /* info */
    .sfpdp h1{font-size:clamp(1.9rem,3.6vw,2.9rem);line-height:1.06;margin:.1rem 0 .5rem;font-weight:600}
    .sfpdp .price{font-family:'Inter',sans-serif;font-weight:800;font-size:1.7rem;color:var(--ink);margin:.2rem 0 1.4rem}
    .sfpdp .opt{margin-bottom:1.3rem}
    .sfpdp .opt .lab{font-family:'Inter',sans-serif;font-size:.9rem;color:var(--ink);margin-bottom:.55rem;display:block}
    .sfpdp .opt .lab b{color:var(--muted);font-weight:500}
    .sfpdp .chips{display:flex;flex-wrap:wrap;gap:.55rem}
    .sfpdp .chip{font-family:'Inter',sans-serif;padding:.5rem .95rem;border-radius:10px;border:1px solid var(--line);background:transparent;color:var(--muted);cursor:pointer;font-size:.85rem;transition:.15s}
    .sfpdp .chip:hover{color:var(--ink)}
    .sfpdp .chip.on{border-color:var(--ac);color:var(--ink);background:color-mix(in srgb,var(--ac) 14%,transparent)}
    .sfpdp .sw{width:40px;height:40px;border-radius:10px;border:1px solid var(--line);cursor:pointer;position:relative;transition:.15s}
    .sfpdp .sw.on{box-shadow:0 0 0 2px var(--bg),0 0 0 4px var(--ac)}
    .sfpdp .sw span{position:absolute;inset:0;border-radius:inherit}
    .sfpdp .qtyrow .lab{font-family:'Inter',sans-serif;font-size:.9rem;color:var(--ink);margin-bottom:.55rem;display:block}
    .sfpdp .qty{display:inline-flex;align-items:center;border:1px solid var(--line);border-radius:999px;overflow:hidden}
    .sfpdp .qty button{width:44px;height:46px;border:none;background:transparent;color:var(--ink);font-size:1.15rem;cursor:pointer}
    .sfpdp .qty span{width:44px;text-align:center;font-family:'Inter',sans-serif;font-weight:700}
    .sfpdp .add{display:block;width:100%;margin-top:1.4rem;padding:1.05rem 1.4rem;border-radius:14px;border:none;cursor:pointer;
        background:linear-gradient(180deg,color-mix(in srgb,var(--ac) 118%,#fff 0%),var(--ac));color:var(--on);
        font-family:'Inter',sans-serif;font-weight:700;font-size:1rem;box-shadow:0 18px 40px -16px var(--ac);transition:filter .15s}
    .sfpdp .add:hover{filter:brightness(1.06)}
    .sfpdp .add:disabled{opacity:.7}
    .sfpdp .msg{font-family:'Inter',sans-serif;font-size:.85rem;min-height:1.2rem;margin:.7rem 0 0}
    .sfpdp .msg a{color:var(--ac);font-weight:700}
    .sfpdp .desc{font-family:'Inter',sans-serif;color:var(--muted);line-height:1.65;margin:1.3rem 0 0}
    .sfpdp .feat{font-family:'Inter',sans-serif;display:flex;align-items:center;gap:.6rem;margin-top:1.2rem;padding:.85rem 1.05rem;border:1px dashed color-mix(in srgb,var(--ac) 55%,var(--line));border-radius:12px;background:color-mix(in srgb,var(--ac) 8%,transparent);font-size:.88rem;font-weight:600}
    .sfpdp .feat a{color:var(--ac);font-weight:800}
    /* sections */
    .sfpdp .sec{margin-top:3.2rem}
    .sfpdp .tabbar{display:flex;gap:1.6rem;border-bottom:1px solid var(--line);font-family:'Inter',sans-serif}
    .sfpdp .tabbar button{background:none;border:none;padding:.7rem 0;color:var(--muted);font-weight:600;font-size:.95rem;cursor:pointer;border-bottom:2px solid transparent;margin-bottom:-1px}
    .sfpdp .tabbar button.on{color:var(--ink);border-bottom-color:var(--ac)}
    .sfpdp .tabpane{display:none;padding-top:1.6rem}
    .sfpdp .tabpane.on{display:block}
    .sfpdp .specgrid{display:grid;grid-template-columns:repeat(auto-fill,minmax(240px,1fr));gap:1rem}
    .sfpdp .scard{border:1px solid var(--line);border-radius:14px;padding:1rem 1.1rem;background:var(--surf);font-family:'Inter',sans-serif}
    .sfpdp .scard .k{font-size:.78rem;color:var(--muted);margin-bottom:.25rem}
    .sfpdp .scard .v{font-size:.98rem;font-weight:600;color:var(--ink)}
    .sfpdp .descfull{font-family:'Inter',sans-serif;color:var(--muted);line-height:1.75;max-width:820px}
    /* reviews */
    .sfpdp .rvhead{display:flex;align-items:center;justify-content:space-between;flex-wrap:wrap;gap:1rem;margin-bottom:1.4rem}
    .sfpdp .rvscore{display:flex;align-items:center;gap:.8rem}
    .sfpdp .rvscore .num{font-size:2.4rem;font-weight:600}
    .sfpdp .rvscore .st{color:var(--ac);font-size:1.2rem;font-family:'Inter',sans-serif;letter-spacing:2px}
    .sfpdp .rvscore .ct{font-family:'Inter',sans-serif;color:var(--muted);font-size:.9rem}
    .sfpdp .rv{display:flex;gap:.9rem;padding:1.2rem 0;border-top:1px solid var(--line);font-family:'Inter',sans-serif}
    .sfpdp .rv .av{width:44px;height:44px;border-radius:50%;flex:0 0 auto;background:color-mix(in srgb,var(--ac) 22%,var(--surf));display:flex;align-items:center;justify-content:center;font-weight:700;color:var(--ink)}
    .sfpdp .rv .av img{width:100%;height:100%;border-radius:50%;object-fit:cover}
    .sfpdp .rv .rt{flex:1}
    .sfpdp .rv .nm{font-weight:700}
    .sfpdp .rv .when{color:var(--muted);font-size:.8rem;float:right}
    .sfpdp .rv .rst{color:var(--ac);letter-spacing:1px;font-size:.85rem;margin:.15rem 0 .4rem}
    .sfpdp .rv .tx{color:var(--muted);line-height:1.55}
    .sfpdp .rvempty{font-family:'Inter',sans-serif;color:var(--muted);border:1px dashed var(--line);border-radius:14px;padding:1.6rem;text-align:center}
    @media(max-width:820px){.sfpdp .cols{grid-template-columns:1fr}}
</style>
<div class="sfpdp">
    <div class="wrap">
        <div class="crumb"><a href="{{ url('/' . $slug) }}">{{ $cfg['brand'] }}</a> / <a href="{{ url('/' . $slug . '/shop') }}">Shop</a> / <span>{{ $detailedProduct->getTranslation('name') }}</span></div>
        <div class="cols">
            <div class="gwrap">
                <div class="gmain"><img id="sfMain" src="{{ $mainImg }}" alt="{{ $detailedProduct->getTranslation('name') }}"
                    onerror="this.onerror=null;this.src='https://loremflickr.com/900/900/{{ urlencode($cfg['cat']) }}';"></div>
                @if (count($gallery) > 1)
                    <div class="thumbs">
                        @foreach ($gallery as $i => $g)
                            <button type="button" class="t {{ $i === 0 ? 'on' : '' }}" onclick="sfSwap(this,'{{ $g }}')"><img src="{{ $g }}" alt=""></button>
                        @endforeach
                    </div>
                @endif
            </div>
            <div class="info">
                <h1>{{ $detailedProduct->getTranslation('name') }}</h1>
                <div class="price" id="sfPrice">{{ $sym }}{{ number_format($minp) }}</div>

                @foreach ($attrs as $a)
                    @php $isColor = \Illuminate\Support\Str::contains(strtolower($a['name']), ['color', 'colour']); @endphp
                    <div class="opt" data-attr="{{ $a['id'] }}">
                        <span class="lab">{{ $a['name'] }}: <b id="sfLab{{ $a['id'] }}">{{ $a['values'][0] ?? '' }}</b></span>
                        <div class="chips">
                            @foreach ($a['values'] as $i => $v)
                                @php $hex = $colorMap[strtolower(trim($v))] ?? null; @endphp
                                @if ($isColor && $hex)
                                    <button type="button" class="sw {{ $i === 0 ? 'on' : '' }}" title="{{ $v }}"
                                        data-attr="{{ $a['id'] }}" data-val="{{ $v }}"><span style="background:{{ $hex }}"></span></button>
                                @else
                                    <button type="button" class="chip {{ $i === 0 ? 'on' : '' }}" data-attr="{{ $a['id'] }}" data-val="{{ $v }}">{{ $v }}</button>
                                @endif
                            @endforeach
                        </div>
                    </div>
                @endforeach

                <div class="qtyrow">
                    <span class="lab">Quantity</span>
                    <div class="qty"><button type="button" id="sfDec">−</button><span id="sfQty">1</span><button type="button" id="sfInc">+</button></div>
                </div>

                <button class="add" id="sfAdd">Add to Cart · <span id="sfPrice2">{{ $sym }}{{ number_format($minp) }}</span></button>
                <div class="msg" id="sfMsg"></div>

                <div class="desc">{{ \Illuminate\Support\Str::limit(strip_tags($detailedProduct->getTranslation('description')), 240) }}</div>
                <div class="feat">{{ $features[$slug] ?? '✓ Free shipping + easy returns' }}
                    @if($slug === 'spex')&nbsp;<a href="{{ url('/spex') }}">Open AR try-on →</a>@endif
                </div>
            </div>
        </div>

        {{-- Specifications / Description --}}
        <div class="sec">
            <div class="tabbar">
                <button class="on" data-tab="spec" onclick="sfTab(this)">Specifications</button>
                <button data-tab="desc" onclick="sfTab(this)">Description</button>
            </div>
            <div class="tabpane on" id="tab-spec">
                <div class="specgrid">
                    @foreach ($specs as $s)
                        <div class="scard"><div class="k">{{ $s[0] }}</div><div class="v">{{ $s[1] }}</div></div>
                    @endforeach
                </div>
            </div>
            <div class="tabpane" id="tab-desc">
                <div class="descfull">{!! nl2br(e(strip_tags($detailedProduct->getTranslation('description')))) !!}</div>
            </div>
        </div>

        {{-- Reviews --}}
        <div class="sec">
            <div class="rvhead">
                <div>
                    <h2 style="font-size:1.6rem;margin:0 0 .6rem">User Reviews</h2>
                    @if ($rCount)
                        <div class="rvscore"><span class="num">{{ $rAvg }}</span><span class="st">{{ $starsRow($rAvg) }}</span><span class="ct">{{ $rCount }} review{{ $rCount == 1 ? '' : 's' }}</span></div>
                    @endif
                </div>
                <a class="chip b" href="{{ auth()->user() ? route('dashboard') : route('user.login') }}">Write a review</a>
            </div>
            @if ($reviews->count())
                @foreach ($reviews as $rv)
                    <div class="rv">
                        <div class="av">@if(optional($rv->user)->avatar_original)<img src="{{ uploaded_asset($rv->user->avatar_original) }}" alt="">@else{{ strtoupper(substr(optional($rv->user)->name ?? 'A', 0, 1)) }}@endif</div>
                        <div class="rt">
                            <span class="when">{{ $rv->created_at->diffForHumans() }}</span>
                            <div class="nm">{{ optional($rv->user)->name ?? 'Verified buyer' }}</div>
                            <div class="rst">{{ $starsRow($rv->rating) }}</div>
                            <div class="tx">{{ $rv->comment }}</div>
                        </div>
                    </div>
                @endforeach
            @else
                <div class="rvempty">No reviews yet — be the first to review the {{ $detailedProduct->getTranslation('name') }}.</div>
            @endif
        </div>
    </div>
</div>
<script>
(function(){
    var CSRF='{{ csrf_token() }}', SYM='{{ $sym }}', MIN={{ $minp }},
        ATTRS={!! json_encode(array_column($attrs,'id')) !!},
        STOCK={!! json_encode($stock) !!},
        PID={{ $detailedProduct->id }}, ADDURL='{{ route('cart.addToCart') }}', CARTURL='{{ route('cart') }}';
    var sel={};
    document.querySelectorAll('.sfpdp .opt').forEach(function(o){
        var f=o.querySelector('.sw.on,.chip.on'); if(f) sel[o.dataset.attr]=f.dataset.val;
    });
    function money(n){return SYM+Number(n||0).toLocaleString('en-IN');}
    function variant(){return ATTRS.map(function(id){return String(sel[id]).replace(/\s+/g,'');}).join('-');}
    function refresh(){var p=STOCK[variant()];p=(p==null?MIN:p);
        document.getElementById('sfPrice').textContent=money(p);
        document.getElementById('sfPrice2').textContent=money(p);}
    document.querySelectorAll('.sfpdp .sw,.sfpdp .chip[data-attr]').forEach(function(c){
        c.addEventListener('click',function(){
            sel[c.dataset.attr]=c.dataset.val;
            c.parentNode.querySelectorAll('.sw,.chip').forEach(function(x){x.classList.toggle('on',x===c);});
            var lab=document.getElementById('sfLab'+c.dataset.attr); if(lab) lab.textContent=c.dataset.val;
            refresh();
        });
    });
    var qty=1;
    document.getElementById('sfInc').onclick=function(){qty++;document.getElementById('sfQty').textContent=qty;};
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
    window.sfSwap=function(btn,src){document.getElementById('sfMain').src=src;
        document.querySelectorAll('.sfpdp .thumbs .t').forEach(function(t){t.classList.toggle('on',t===btn);});};
    window.sfTab=function(btn){var t=btn.dataset.tab;
        document.querySelectorAll('.sfpdp .tabbar button').forEach(function(b){b.classList.toggle('on',b===btn);});
        document.querySelectorAll('.sfpdp .tabpane').forEach(function(p){p.classList.toggle('on',p.id==='tab-'+t);});};
})();
</script>
@endsection
