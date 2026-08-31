{{-- Per-niche chrome skin: overrides the theme's colour variables site-wide when a
     storefront is active (session sf_skin, set by the /<niche> routes). Recolours the
     header, buttons, links, badges and inner pages (product/cart/checkout/account) to the
     niche accent. The main shop home is left untinted. --}}
@php
    $sfSkins = [
        'volt'   => ['#3f6fff', '#2f59d6'],
        'crave'  => ['#c9761f', '#a75f15'],
        'thread' => ['#141414', '#000000'],
        'stride' => ['#4b7d00', '#3a6100'],
        'spex'   => ['#2b6df6', '#1d55cc'],
        'luxe'   => ['#c2687a', '#a5505f'],
        'nest'   => ['#9a7b4f', '#7d6139'],
        'aurum'  => ['#b8912e', '#957324'],
        'apex'   => ['#ff5a3c', '#e0421f'],
        'page'   => ['#3f6f5f', '#305647'],
    ];
    $sfSk = session('sf_skin');
    if (request()->is('/') || request()->is('home')) {
        $sfSk = null; // never tint the base shop home
    }
@endphp
@if ($sfSk && isset($sfSkins[$sfSk]))
    @php $c = $sfSkins[$sfSk][0]; $h = $sfSkins[$sfSk][1]; @endphp
    <style>
        :root{
            --primary: {{ $c }} !important;
            --hov-primary: {{ $h }} !important;
            --soft-primary: {{ hex2rgba($c, 0.15) }} !important;
            --secondary-base: {{ $c }} !important;
            --hov-secondary-base: {{ $h }} !important;
            --soft-secondary-base: {{ hex2rgba($c, 0.15) }} !important;
        }
    </style>
@endif
