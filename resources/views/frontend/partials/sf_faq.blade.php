{{-- Themed FAQ — faithful to the Stitch "Frequently Asked Questions" accordion.
     Rendered by the /faq route when a storefront skin is active. --}}
@extends('frontend.layouts.app')
@section('meta_title', 'FAQ | ' . get_setting('website_name'))
@php
    $slug = session('sf_skin');
    $cfg = config('storefronts.' . $slug);
    $dark = $cfg['dark'] ?? true;
    $ac = $cfg['accent']; $on = $cfg['on'];
    $bg = $dark ? '#080a11' : '#f4f6f9'; $surf = $dark ? '#12151d' : '#ffffff';
    $ink = $dark ? '#eef2f7' : '#141414'; $muted = $dark ? '#98a1b2' : '#6b7280';
    $line = $dark ? 'rgba(255,255,255,.1)' : 'rgba(0,0,0,.1)';
    $faqs = [
        ['Shipping & Delivery', 'Everything about getting your order to your door.', [
            ['How much does shipping cost?', 'We offer free standard shipping on all orders over ₹999. For orders below that a flat ₹49 applies. Expedited options are available at checkout.'],
            ['How long will it take to get my order?', 'Standard shipping typically takes 3–5 business days; expedited shipping takes 1–2 business days.'],
            ['Do you ship across India?', 'Yes — we deliver nationwide, with cash on delivery available on most pincodes.'],
        ]],
        ['Returns & Refunds', 'Changed your mind? Here is how returns work.', [
            ['What is the return window?', 'You can return most items within 7 days of delivery, unused and in original packaging.'],
            ['How long do refunds take?', 'Once we receive the returned item, refunds are processed within 5–7 business days to the original payment method.'],
        ]],
        ['Product Warranties', 'Warranty and after-sales support.', [
            ['Are products covered by warranty?', 'Eligible products carry a manufacturer warranty; the period is shown on each product page.'],
            ['How do I claim warranty support?', 'Contact our support team with your order ID and we will guide you through the claim.'],
        ]],
    ];
@endphp
@section('content')
<style>
    .sffaq{--ac:{{ $ac }};--on:{{ $on }};--bg:{{ $bg }};--surf:{{ $surf }};--ink:{{ $ink }};--muted:{{ $muted }};--line:{{ $line }};
        background:var(--bg);color:var(--ink);font-family:'Inter',system-ui,sans-serif;min-height:82vh}
    .sffaq .hero{text-align:center;padding:4.6rem 1rem 2.4rem}
    .sffaq .hero h1{font-family:'{{ $cfg['font'] }}',serif;font-weight:600;font-size:clamp(2.2rem,6vw,3.8rem);margin:0}
    .sffaq .wrap{max-width:840px;margin:0 auto;padding:0 1.2rem 5rem;display:flex;flex-direction:column;gap:1rem}
    .sffaq .grp{background:var(--surf);border:1px solid var(--line);border-radius:16px;overflow:hidden}
    .sffaq .gh{width:100%;text-align:left;background:none;border:none;cursor:pointer;padding:1.3rem 1.5rem;display:flex;justify-content:space-between;align-items:center;color:var(--ink)}
    .sffaq .gh .t{font-weight:700;font-size:1.15rem}
    .sffaq .gh .s{color:var(--muted);font-size:.82rem;margin-top:.2rem;font-weight:400}
    .sffaq .gh .ch{color:var(--ac);font-size:1.2rem;transition:transform .25s}
    .sffaq .grp.open .gh .ch{transform:rotate(180deg)}
    .sffaq .body{display:none;padding:0 1.5rem 1.4rem;border-top:1px solid var(--line)}
    .sffaq .grp.open .body{display:block}
    .sffaq .q{font-weight:600;margin:1.2rem 0 .4rem}
    .sffaq .a{color:var(--muted);line-height:1.6}
    .sffaq .a a{color:var(--ac)}
</style>
<div class="sffaq">
    <div class="hero"><h1>Frequently Asked Questions</h1></div>
    <div class="wrap">
        @foreach ($faqs as $gi => $g)
            <div class="grp {{ $gi === 0 ? 'open' : '' }}">
                <button type="button" class="gh" onclick="this.parentNode.classList.toggle('open')">
                    <span><span class="t">{{ $g[0] }}</span><br><span class="s">{{ $g[1] }}</span></span>
                    <span class="ch">⌄</span>
                </button>
                <div class="body">
                    @foreach ($g[2] as $qa)
                        <div class="q">{{ $qa[0] }}</div>
                        <div class="a">{{ $qa[1] }}</div>
                    @endforeach
                    <div class="a" style="margin-top:1rem">Still need help? <a href="{{ url('/contact-us') }}">Contact support</a>.</div>
                </div>
            </div>
        @endforeach
    </div>
</div>
@endsection
