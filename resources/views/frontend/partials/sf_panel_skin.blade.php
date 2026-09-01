{{-- Skin overlay for the customer account panel (dashboard, orders, addresses, wishlist…).
     Renders only when a storefront skin is active. Restyles the existing aiz panel markup
     to the niche dark theme — no structural/JS change. Scoped to .sfpanel. --}}
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
    .sfpanel{background:{{ $bg }};color:{{ $ink }};min-height:82vh;font-family:'Inter',system-ui,sans-serif}
    .sfpanel .aiz-user-sidenav,.sfpanel .aiz-card-box,.sfpanel .card,.sfpanel .aiz-user-sidenav-wrap{
        background:{{ $surf }} !important;border-color:{{ $line }} !important;color:{{ $ink }};border-radius:14px}
    .sfpanel .aiz-user-sidenav-wrap{box-shadow:none}
    .sfpanel h1,.sfpanel h2,.sfpanel h3,.sfpanel h4,.sfpanel h5,.sfpanel h6,.sfpanel .h1,.sfpanel .h2,.sfpanel .h3,.sfpanel .h4,.sfpanel .h5,
    .sfpanel .text-dark,.sfpanel .fw-700,.sfpanel label,.sfpanel strong,.sfpanel td,.sfpanel th,.sfpanel p,.sfpanel span{color:{{ $ink }}}
    .sfpanel .text-muted,.sfpanel .opacity-60,.sfpanel .fs-12,.sfpanel small{color:{{ $muted }} !important;opacity:1}
    /* sidebar nav */
    .sfpanel .aiz-side-nav-link{color:{{ $muted }} !important;border-radius:10px;transition:.15s}
    .sfpanel .aiz-side-nav-link:hover{color:{{ $ink }} !important;background:color-mix(in srgb,{{ $ac }} 10%,transparent)}
    .sfpanel .aiz-side-nav-link.active{color:{{ $on }} !important;background:{{ $ac }} !important}
    .sfpanel .aiz-side-nav-link.active i,.sfpanel .aiz-side-nav-link.active .aiz-side-nav-text{color:{{ $on }} !important}
    /* tables */
    .sfpanel table,.sfpanel .table{color:{{ $ink }}}
    .sfpanel .table td,.sfpanel .table th{border-color:{{ $line }} !important}
    .sfpanel .table thead th{color:{{ $muted }};border-color:{{ $line }} !important}
    /* fields + buttons */
    .sfpanel .form-control,.sfpanel select,.sfpanel textarea,.sfpanel input{background:{{ $field }} !important;border:1px solid {{ $line }} !important;color:{{ $ink }} !important;border-radius:10px !important}
    .sfpanel .form-control:focus{border-color:{{ $ac }} !important;box-shadow:0 0 0 3px color-mix(in srgb,{{ $ac }} 25%,transparent) !important}
    .sfpanel .btn-primary,.sfpanel .btn-styled{background:linear-gradient(180deg,color-mix(in srgb,{{ $ac }} 118%,#fff),{{ $ac }}) !important;border:none !important;color:{{ $on }} !important;border-radius:10px !important;font-weight:700}
    .sfpanel .btn-soft-primary,.sfpanel .btn-outline-primary{color:{{ $ac }} !important;border-color:{{ $ac }} !important}
    .sfpanel a{color:{{ $ac }}}
    .sfpanel .badge-success{background:color-mix(in srgb,#2ea24d 22%,transparent);color:#7ee2a0}
    .sfpanel hr,.sfpanel .border-bottom,.sfpanel .border-right,.sfpanel .border-top{border-color:{{ $line }} !important}
    .sfpanel .avatar .image{border:2px solid {{ $line }}}
</style>
@endif
