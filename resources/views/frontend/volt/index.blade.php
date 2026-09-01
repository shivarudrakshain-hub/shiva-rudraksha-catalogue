@extends('frontend.layouts.app')
@section('meta_title', 'VOLT — Electronics | ' . get_setting('website_name'))
@php
    $sf_imgkw = ['volt-earbuds' => 'earbuds', 'volt-smartwatch' => 'smartwatch', 'volt-phone' => 'smartphone'];
@endphp
@section('content')
<style>
    @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@500;600;700&family=Inter:wght@400;500;600;700&display=swap');
    .volt{--ac:#4d7cff;--bg:#080a11;--surf:#12141d;--ink:#eaf0ff;--muted:#8a93a8;--line:rgba(120,150,255,.14);
        background:var(--bg);color:var(--ink);font-family:'Inter',system-ui,sans-serif;margin-top:-1px}
    .volt a{text-decoration:none}
    .volt .hero{position:relative;overflow:hidden;padding:6rem 1rem 5.5rem;text-align:center;
        background:radial-gradient(80% 90% at 50% 0%,rgba(77,124,255,.22),transparent 60%),var(--bg)}
    .volt .hero .streak{position:absolute;inset:0;pointer-events:none;overflow:hidden}
    .volt .hero .streak:before,.volt .hero .streak:after{content:"";position:absolute;width:140%;height:90px;
        background:linear-gradient(90deg,transparent,rgba(160,190,255,.14),transparent);filter:blur(10px);transform:rotate(-18deg)}
    .volt .hero .streak:before{top:22%;left:-20%}
    .volt .hero .streak:after{top:52%;left:-10%;height:60px;opacity:.7}
    .volt .hero .eb{position:relative;letter-spacing:.3em;text-transform:uppercase;font-size:.72rem;color:var(--ac);font-weight:600}
    .volt .hero h1{position:relative;font-family:'Playfair Display',serif;font-weight:600;font-size:clamp(2.8rem,7vw,5rem);line-height:1.03;margin:.7rem 0 .7rem}
    .volt .hero p{position:relative;color:var(--muted);max-width:540px;margin:0 auto 1.7rem;font-size:1.05rem;line-height:1.55}
    .volt .cta{position:relative;display:inline-flex;gap:.5rem;align-items:center;padding:.95rem 1.9rem;border-radius:999px;
        background:linear-gradient(180deg,#5b86ff,#3f6fff);color:#fff;font-weight:600;box-shadow:0 0 0 6px rgba(77,124,255,.12),0 18px 40px -14px rgba(77,124,255,.8)}
    .volt .strip{display:flex;flex-wrap:wrap;justify-content:center;gap:2rem;padding:1.4rem;border-top:1px solid var(--line);border-bottom:1px solid var(--line);color:var(--muted);font-size:.84rem}
    .volt .strip b{color:var(--ink);font-weight:600}
    .volt .sec{max-width:1180px;margin:0 auto;padding:4rem 1.1rem 5rem}
    .volt .sec .h2{font-family:'Playfair Display',serif;font-weight:600;font-size:2rem;text-align:center;margin:0 0 .3rem}
    .volt .sec .sub{text-align:center;color:var(--muted);margin:0 0 2.4rem}
    .volt .grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(280px,1fr));gap:2rem}
    .volt .pcard{position:relative;background:rgba(255,255,255,.035);border:1px solid var(--line);border-radius:20px;padding:1rem;
        backdrop-filter:blur(8px);transition:transform .3s,box-shadow .3s}
    .volt .pcard:after{content:"";position:absolute;left:10%;right:10%;bottom:-16px;height:44px;z-index:-1;
        background:radial-gradient(ellipse at center,rgba(77,124,255,.32),transparent 70%);filter:blur(14px);opacity:.6;transition:opacity .3s}
    .volt .pcard:hover{transform:translateY(-6px);box-shadow:0 30px 60px -30px #000}
    .volt .pcard:hover:after{opacity:1}
    .volt .pcard .im{aspect-ratio:1/1;border-radius:14px;overflow:hidden;background:#0e1119}
    .volt .pcard .im img{width:100%;height:100%;object-fit:cover;transition:transform .5s}
    .volt .pcard:hover .im img{transform:scale(1.05)}
    .volt .pcard .nm{font-weight:700;font-size:1.05rem;margin:.9rem 0 .3rem}
    .volt .pcard .ds{color:var(--muted);font-size:.82rem;min-height:2.4em;line-height:1.4}
    .volt .pcard .cf{display:flex;align-items:center;justify-content:space-between;margin-top:.9rem}
    .volt .pcard .pr{font-weight:700;font-size:1.15rem}
    .volt .pcard .view{padding:.5rem 1rem;border-radius:999px;border:1px solid var(--line);color:var(--ink);font-size:.82rem;font-weight:600;transition:.2s}
    .volt .pcard:hover .view{background:var(--ac);border-color:transparent;color:#fff}
    /* cookie banner */
    .volt-cookie{position:fixed;left:16px;bottom:16px;z-index:120;max-width:280px;background:#0f1220;border:1px solid var(--line);border-radius:14px;padding:1rem;color:var(--muted);font-size:.78rem;box-shadow:0 20px 50px -20px #000}
    .volt-cookie b{color:var(--ink)}
    .volt-cookie button{margin-top:.6rem;width:100%;padding:.55rem;border-radius:8px;border:none;background:#2a2f45;color:#fff;font:inherit;font-size:.8rem;cursor:pointer}
    @media(max-width:600px){.volt-cookie{display:none}}
</style>

<div class="volt">
    <section class="hero">
        <div class="streak"></div>
        <div class="eb">Next-gen electronics</div>
        <h1>Power your everyday.</h1>
        <p>Audio, wearables and phones engineered to keep up. Free shipping, cash on delivery, easy returns.</p>
        <a href="{{ url('/volt/shop') }}" class="cta">Shop all electronics →</a>
    </section>

    <div class="strip">
        <span>⚡ <b>Free shipping</b> over ₹999</span>
        <span>🎁 <b>7-day</b> returns</span>
        <span>🔒 <b>Secure</b> checkout</span>
        <span>💬 <b>Real</b> support</span>
    </div>

    <section class="sec">
        <div class="h2">Featured gear</div>
        <div class="sub">Hand-picked electronics, ready to ship.</div>
        <div class="grid">
            @forelse ($products as $product)
                <a class="pcard" href="{{ route('product', $product->slug) }}">
                    <div class="im"><img loading="lazy" src="/assets/store/img/{{ $product->slug }}.jpg" alt="{{ $product->getTranslation('name') }}"
                        onerror="this.onerror=null;this.src='https://loremflickr.com/600/600/{{ $sf_imgkw[$product->slug] ?? 'gadget' }}';"></div>
                    <div class="nm">{{ $product->getTranslation('name') }}</div>
                    <div class="ds">{{ \Illuminate\Support\Str::limit(strip_tags($product->getTranslation('description')), 60) }}</div>
                    <div class="cf"><span class="pr">{!! home_base_price($product) !!}</span><span class="view">View →</span></div>
                </a>
            @empty
                <p style="color:var(--muted)">No products yet.</p>
            @endforelse
        </div>
    </section>
</div>

<div class="volt-cookie" id="voltCookie">We use cookies for a better experience, check our <b>policy</b>.<button onclick="try{localStorage.setItem('volt_cookie','1')}catch(e){};document.getElementById('voltCookie').style.display='none'">Ok, I Understood</button></div>
<script>try{if(localStorage.getItem('volt_cookie'))document.getElementById('voltCookie').style.display='none';}catch(e){}</script>
@endsection
