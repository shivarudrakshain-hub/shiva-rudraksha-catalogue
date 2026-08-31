@extends('frontend.layouts.app')

@section('meta_title', 'VOLT — Electronics | ' . get_setting('website_name'))

@php
    // Sample product imagery via remote link (no downloads) — keyword per product slug.
    $sf_imgkw = [
        'volt-earbuds'    => 'wireless,earbuds',
        'volt-smartwatch' => 'smartwatch',
        'volt-phone'      => 'smartphone',
    ];
    $sf_img = function ($p) use ($sf_imgkw) {
        $kw = $sf_imgkw[$p->slug] ?? urlencode($p->getTranslation('name'));
        return 'https://source.unsplash.com/600x600/?' . $kw . '&sig=' . $p->id;
    };
@endphp

@section('content')
<style>
    .sf-volt{--ac:#4d7cff;--bg:#080a11;--surf:#12141d;--ink:#eaf0ff;--muted:#8a93a8;--line:rgba(120,150,255,.16);
        background:var(--bg);color:var(--ink);font-family:'Inter',system-ui,sans-serif;margin-top:-1px}
    .sf-volt a{text-decoration:none}
    .sf-hero{position:relative;overflow:hidden;padding:5.5rem 1rem 5rem;text-align:center;
        background:radial-gradient(90% 130% at 50% -10%,rgba(77,124,255,.32),transparent 60%),var(--bg)}
    .sf-hero:before{content:"";position:absolute;inset:0;background-image:linear-gradient(var(--line) 1px,transparent 1px),linear-gradient(90deg,var(--line) 1px,transparent 1px);background-size:46px 46px;-webkit-mask-image:radial-gradient(70% 70% at 50% 0,#000,transparent);mask-image:radial-gradient(70% 70% at 50% 0,#000,transparent);opacity:.5}
    .sf-hero .eb{position:relative;letter-spacing:.28em;text-transform:uppercase;font-size:.72rem;color:var(--ac);font-weight:600}
    .sf-hero h1{position:relative;font-size:clamp(2.6rem,6vw,4.6rem);margin:.6rem 0 .6rem;line-height:1.02;font-weight:800;letter-spacing:-.02em}
    .sf-hero p{position:relative;color:var(--muted);max-width:560px;margin:0 auto 1.6rem;font-size:1.05rem}
    .sf-cta{position:relative;display:inline-flex;gap:.5rem;align-items:center;padding:.9rem 1.8rem;border-radius:999px;background:var(--ac);color:#061024;font-weight:700;box-shadow:0 14px 30px -12px var(--ac)}
    .sf-strip{display:flex;flex-wrap:wrap;justify-content:center;gap:1.6rem;padding:1.4rem;border-top:1px solid var(--line);border-bottom:1px solid var(--line);color:var(--muted);font-size:.82rem}
    .sf-strip b{color:var(--ink)}
    .sf-wrap{max-width:1180px;margin:0 auto;padding:3rem 1.1rem 4.5rem}
    .sf-h2{font-size:1.7rem;font-weight:800;margin:0 0 .3rem;letter-spacing:-.01em}
    .sf-sub{color:var(--muted);margin:0 0 1.6rem}
    .sf-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(240px,1fr));gap:1.3rem}
    .sf-card{display:flex;flex-direction:column;background:var(--surf);border:1px solid var(--line);border-radius:18px;overflow:hidden;transition:transform .25s,box-shadow .25s,border-color .25s}
    .sf-card:hover{transform:translateY(-5px);box-shadow:0 26px 50px -28px #000;border-color:color-mix(in srgb,var(--ac) 55%,var(--line))}
    .sf-thumb{aspect-ratio:1/1;background:#0e1119;overflow:hidden}
    .sf-thumb img{width:100%;height:100%;object-fit:cover;transition:transform .5s}
    .sf-card:hover .sf-thumb img{transform:scale(1.06)}
    .sf-cb{padding:1rem 1.05rem 1.2rem;display:flex;flex-direction:column;gap:.35rem;flex:1}
    .sf-nm{font-weight:700;font-size:1.02rem;color:var(--ink)}
    .sf-ds{color:var(--muted);font-size:.8rem;flex:1}
    .sf-cf{display:flex;align-items:center;justify-content:space-between;margin-top:.5rem}
    .sf-pr{font-weight:800;font-size:1.1rem;color:var(--ink)}
    .sf-view{padding:.5rem 1rem;border-radius:999px;border:1px solid var(--line);color:var(--ink);font-size:.8rem;font-weight:600}
    .sf-card:hover .sf-view{background:var(--ac);color:#061024;border-color:transparent}
    .sf-foot{text-align:center;color:var(--muted);padding:0 1rem 3rem}
    .sf-foot a{color:var(--ac)}
</style>

<div class="sf-volt">
    <section class="sf-hero">
        <div class="eb">Next-gen electronics</div>
        <h1>Power your everyday.</h1>
        <p>Audio, wearables and phones engineered to keep up. Free shipping, cash on delivery, easy returns.</p>
        <a href="{{ route('products.category', 'electronics') }}" class="sf-cta">Shop all electronics →</a>
    </section>

    <div class="sf-strip">
        <span>⚡ <b>Free shipping</b> over ₹999</span>
        <span>🔁 <b>7-day</b> returns</span>
        <span>🔒 <b>Secure</b> checkout</span>
        <span>💬 <b>Real</b> support</span>
    </div>

    <div class="sf-wrap">
        <h2 class="sf-h2">Featured gear</h2>
        <p class="sf-sub">Hand-picked electronics, ready to ship.</p>
        <div class="sf-grid">
            @forelse ($products as $product)
                <a class="sf-card" href="{{ route('product', $product->slug) }}">
                    <div class="sf-thumb">
                        <img loading="lazy" src="{{ $sf_img($product) }}" alt="{{ $product->getTranslation('name') }}"
                             onerror="this.onerror=null;this.src='https://picsum.photos/seed/{{ $product->id }}/600';">
                    </div>
                    <div class="sf-cb">
                        <div class="sf-nm">{{ $product->getTranslation('name') }}</div>
                        <div class="sf-ds">{{ \Illuminate\Support\Str::limit(strip_tags($product->getTranslation('description')), 60) }}</div>
                        <div class="sf-cf">
                            <span class="sf-pr">{!! home_base_price($product) !!}</span>
                            <span class="sf-view">View →</span>
                        </div>
                    </div>
                </a>
            @empty
                <p style="color:var(--muted)">No products yet.</p>
            @endforelse
        </div>
    </div>

    <div class="sf-foot">VOLT — a Zolo Cart storefront template · every feature on the live engine · <a href="{{ route('home') }}">Zolo Cart</a></div>
</div>
@endsection
