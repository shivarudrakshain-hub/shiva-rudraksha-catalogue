{{-- Themed CONTACT — faithful to the Stitch "Contact Us & Support".
     Rendered by PageController for contact_us_page when a storefront skin is active.
     Form posts to the live engine route('contact') with name/email/phone/content. --}}
@extends('frontend.layouts.app')
@section('meta_title', 'Contact | ' . get_setting('website_name'))
@php
    $slug = session('sf_skin');
    $cfg = config('storefronts.' . $slug);
    $dark = $cfg['dark'] ?? true;
    $ac = $cfg['accent']; $on = $cfg['on'];
    $bg = $dark ? '#080a11' : '#f4f6f9'; $surf = $dark ? '#12151d' : '#ffffff';
    $ink = $dark ? '#eef2f7' : '#141414'; $muted = $dark ? '#98a1b2' : '#6b7280';
    $line = $dark ? 'rgba(255,255,255,.1)' : 'rgba(0,0,0,.1)';
    $field = $dark ? '#0e111a' : '#ffffff';
    $cEmail = get_setting('contact_email') ?: 'support@' . str_replace(['https://', 'http://', 'www.'], '', rtrim(config('app.url'), '/'));
    $cPhone = get_setting('contact_phone') ?: '+91 00000 00000';
    $cAddr  = get_setting('contact_address') ?: 'Erode, Tamil Nadu, India';
@endphp
@section('content')
<style>
    .sfct{--ac:{{ $ac }};--on:{{ $on }};--bg:{{ $bg }};--surf:{{ $surf }};--ink:{{ $ink }};--muted:{{ $muted }};--line:{{ $line }};
        background:var(--bg);color:var(--ink);font-family:'Inter',system-ui,sans-serif;min-height:82vh}
    .sfct .hero{text-align:center;padding:4.4rem 1rem 2rem;background:radial-gradient(80% 130% at 50% 0,color-mix(in srgb,var(--ac) 16%,transparent),transparent 60%),var(--bg)}
    .sfct .hero h1{font-family:'{{ $cfg['font'] }}',serif;font-weight:600;font-size:clamp(2.2rem,5.5vw,3.8rem);margin:0}
    .sfct .hero p{color:var(--muted);margin:.6rem 0 0}
    .sfct .strip{display:flex;flex-wrap:wrap;justify-content:center;gap:1.8rem;padding:1.2rem;border-top:1px solid var(--line);border-bottom:1px solid var(--line);color:var(--muted);font-size:.84rem}
    .sfct .strip b{color:var(--ink)}
    .sfct .cols{max-width:1120px;margin:0 auto;padding:2.6rem 1.2rem 4.5rem;display:grid;grid-template-columns:1fr 1fr;gap:1.8rem;align-items:start}
    .sfct .panel{background:var(--surf);border:1px solid var(--line);border-radius:18px;padding:1.8rem}
    .sfct .panel h2{font-family:'{{ $cfg['font'] }}',serif;font-weight:600;font-size:1.5rem;margin:0 0 1.2rem}
    .sfct label{display:block;font-size:.9rem;margin:1rem 0 .4rem}
    .sfct label:first-of-type{margin-top:0}
    .sfct input,.sfct select,.sfct textarea{width:100%;padding:.85rem 1rem;border-radius:10px;background:{{ $field }};border:1px solid var(--line);color:var(--ink);font:inherit;outline:none}
    .sfct input:focus,.sfct select:focus,.sfct textarea:focus{border-color:var(--ac);box-shadow:0 0 0 3px color-mix(in srgb,var(--ac) 25%,transparent)}
    .sfct textarea{min-height:120px;resize:vertical}
    .sfct .send{width:100%;margin-top:1.4rem;padding:1rem;border-radius:12px;border:none;cursor:pointer;background:linear-gradient(180deg,color-mix(in srgb,var(--ac) 118%,#fff),var(--ac));color:var(--on);font-weight:700;font-size:1rem;box-shadow:0 16px 34px -16px var(--ac)}
    .sfct .info h3{font-size:.95rem;margin:1.2rem 0 .2rem}
    .sfct .info h3:first-child{margin-top:0}
    .sfct .info p{color:var(--muted);margin:0}
    .sfct .loc{margin-top:1.6rem}
    .sfct .loc .row{padding:.9rem 0;border-top:1px solid var(--line)}
    .sfct .loc .row b{display:block}
    .sfct .loc .row span{color:var(--muted);font-size:.85rem}
    @if(session('status') || $errors->any()){{-- flash handled by base --}}@endif
    @media(max-width:820px){.sfct .cols{grid-template-columns:1fr}}
</style>
<div class="sfct">
    <div class="hero"><h1>Contact Us &amp; Support</h1><p>We're here to help with your {{ $cfg['cat'] }} needs.</p></div>
    <div class="strip"><span>✅ <b>Free shipping</b> over ₹999</span><span>🔁 <b>7-day</b> returns</span><span>🔒 <b>Secure</b> checkout</span><span>💬 <b>Real</b> support</span></div>
    <div class="cols">
        <div class="panel">
            <h2>Send us a message</h2>
            @if (session('flash') || session('message'))<div style="color:var(--ac);margin-bottom:1rem">Thanks — your message was sent.</div>@endif
            <form method="POST" action="{{ route('contact') }}" onsubmit="return sfCtSubmit(this)">
                @csrf
                <label>Name</label><input name="name" required>
                <label>Email</label><input name="email" type="email" required>
                <label>Phone</label><input name="phone" type="tel">
                <label>Subject</label>
                <select id="sfCtSubj">
                    <option>General Inquiry</option><option>Order Status</option><option>Technical Support</option><option>Returns &amp; Refunds</option>
                </select>
                <label>Message</label><textarea id="sfCtMsg" required placeholder="How can we help?"></textarea>
                <input type="hidden" name="content" id="sfCtContent">
                <button class="send" type="submit">Send Message</button>
            </form>
        </div>
        <div>
            <div class="panel info">
                <h2>Customer Support</h2>
                <h3>Email</h3><p>{{ $cEmail }}</p>
                <h3>Phone</h3><p>{{ $cPhone }}</p>
                <h3>Hours</h3><p>Mon–Fri 9am–6pm · Sat 10am–4pm (IST)</p>
            </div>
            <div class="panel loc" style="margin-top:1.8rem">
                <h2>Store Location</h2>
                <div class="row"><b>{{ $cfg['brand'] }} HQ</b><span>{{ $cAddr }}</span></div>
                <div class="row"><b>Support centre</b><span>Cash on delivery · Free shipping · Easy returns across India</span></div>
            </div>
        </div>
    </div>
</div>
<script>
function sfCtSubmit(f){var s=document.getElementById('sfCtSubj').value,m=document.getElementById('sfCtMsg').value;
    document.getElementById('sfCtContent').value='Subject: '+s+'\n\n'+m;return true;}
</script>
@endsection
