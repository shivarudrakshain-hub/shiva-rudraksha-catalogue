{{-- Skin overlay for the ENGINE checkout page. Renders only when a storefront skin
     is active. Adds a Stitch-style step bar + serif title and restyles the existing
     Bootstrap checkout markup — the form (#checkout-form) and all JS are untouched,
     so COD / payment behaviour is preserved. Scoped to the .gry-bg checkout section. --}}
@php
    $sfSlug = session('sf_skin');
    $cfg = $sfSlug ? config('storefronts.' . $sfSlug) : null;
@endphp
@if ($cfg)
@php
    $dark = $cfg['dark'] ?? true;
    $ac = $cfg['accent']; $on = $cfg['on'];
    $bg = $dark ? '#0a0c12' : '#f4f6f9'; $surf = $dark ? '#12151d' : '#ffffff';
    $ink = $dark ? '#eef2f7' : '#141414'; $muted = $dark ? '#98a1b2' : '#6b7280';
    $line = $dark ? 'rgba(255,255,255,.1)' : 'rgba(0,0,0,.1)';
    $field = $dark ? '#0e111a' : '#ffffff';
@endphp
<style>
    /* ---- themed checkout (scoped to the checkout section) ---- */
    .gry-bg{background:{{ $bg }} !important;color:{{ $ink }}}
    .sfco-head{max-width:1000px;margin:0 auto;padding:2rem 1rem .4rem;font-family:'Inter',system-ui,sans-serif}
    .sfco-steps{display:flex;gap:.6rem;margin-bottom:1.4rem}
    .sfco-steps .s{flex:1}
    .sfco-steps .s .lb{font-size:.82rem;color:{{ $muted }};margin-bottom:.4rem;display:flex;justify-content:center}
    .sfco-steps .s.done .lb,.sfco-steps .s.active .lb{color:{{ $ink }};font-weight:600}
    .sfco-steps .s .bar{height:4px;border-radius:999px;background:{{ $line }}}
    .sfco-steps .s.done .bar,.sfco-steps .s.active .bar{background:{{ $ac }}}
    .sfco-title{font-family:'{{ $cfg['font'] }}',serif;font-weight:600;font-size:clamp(1.8rem,4vw,2.6rem);color:{{ $ink }};margin:.2rem 0 .4rem}
    .sfco-crumb{font-size:.82rem;color:{{ $muted }};margin-bottom:.5rem}
    .sfco-crumb a{color:{{ $ac }};text-decoration:none}
    /* cards / panels */
    .gry-bg .card{background:{{ $surf }} !important;border:1px solid {{ $line }} !important;border-radius:16px !important;color:{{ $ink }};box-shadow:none !important;margin-bottom:1.5rem}
    .gry-bg .card-header{background:transparent !important;color:{{ $ink }} !important}
    .gry-bg .card-header .fw-700,.gry-bg .card-header span{color:{{ $ink }} !important}
    .gry-bg h1,.gry-bg h2,.gry-bg h3,.gry-bg h4,.gry-bg h5,.gry-bg h6,.gry-bg label,.gry-bg p,.gry-bg span,.gry-bg td,.gry-bg th,.gry-bg strong{color:{{ $ink }}}
    .gry-bg .text-muted,.gry-bg .fs-12,.gry-bg small{color:{{ $muted }} !important}
    /* form fields */
    .gry-bg .form-control,.gry-bg .aiz-selectpicker,.gry-bg select,.gry-bg textarea,.gry-bg input[type=text],.gry-bg input[type=email],.gry-bg input[type=tel],.gry-bg input[type=number]{
        background:{{ $field }} !important;border:1px solid {{ $line }} !important;color:{{ $ink }} !important;border-radius:10px !important}
    .gry-bg .form-control::placeholder{color:{{ $muted }}}
    .gry-bg .form-control:focus{border-color:{{ $ac }} !important;box-shadow:0 0 0 3px color-mix(in srgb,{{ $ac }} 25%,transparent) !important}
    .gry-bg .select2-container--default .select2-selection--single{background:{{ $field }} !important;border:1px solid {{ $line }} !important;border-radius:10px !important;color:{{ $ink }}}
    .gry-bg .select2-selection__rendered{color:{{ $ink }} !important}
    /* buttons */
    .gry-bg .btn-primary,.gry-bg #submitOrderBtn,.gry-bg .btn-styled{
        background:linear-gradient(180deg,color-mix(in srgb,{{ $ac }} 118%,#fff),{{ $ac }}) !important;
        border:none !important;color:{{ $on }} !important;border-radius:12px !important;font-weight:700 !important;box-shadow:0 14px 30px -14px {{ $ac }} !important}
    .gry-bg .btn-link{color:{{ $ac }} !important}
    /* order summary */
    #cart_summary .card,#cart_summary{color:{{ $ink }}}
    #cart_summary .cart-summary,#cart_summary .card{background:{{ $surf }} !important}
    .gry-bg hr{border-color:{{ $line }}}
    .gry-bg .aiz-radio-inline,.gry-bg .aiz-checkbox{color:{{ $ink }}}
    @media(max-width:600px){.sfco-title{font-size:1.6rem}}
</style>
<div class="sfco-head">
    <div class="sfco-crumb"><a href="{{ route('cart') }}">Cart</a> &nbsp;›&nbsp; <span>Shipping</span> &nbsp;›&nbsp; <span style="color:{{ $muted }}">Payment</span></div>
    <div class="sfco-steps">
        <div class="s done"><div class="lb">Cart</div><div class="bar"></div></div>
        <div class="s active"><div class="lb">Shipping</div><div class="bar"></div></div>
        <div class="s"><div class="lb">Payment</div><div class="bar"></div></div>
    </div>
    <div class="sfco-title">Checkout</div>
</div>
@endif
