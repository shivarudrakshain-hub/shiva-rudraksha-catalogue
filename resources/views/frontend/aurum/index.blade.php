@extends('frontend.layouts.app')
@section('meta_title', 'AURUM — Jewelry & Watches | ' . get_setting('website_name'))
@php
    $sf = [
        'class' => 'sf-aurum', 'brand' => 'AURUM',
        'ac' => '#d4af37', 'bg' => '#0c0b0a', 'surf' => '#16130f', 'ink' => '#f3ead6', 'muted' => '#b3a487', 'line' => 'rgba(212,175,55,.18)', 'on' => '#1a1509',
        'font' => "'Cormorant Garamond',serif", 'fontimport' => 'https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@500;600;700&display=swap',
        'eb' => 'Fine pieces', 'h1' => 'Quiet luxury.', 'p' => 'Hand-finished jewelry and watches, made to last. Free shipping, cash on delivery.',
        'cta' => 'Shop the collection →', 'h2' => 'The collection', 'sub' => 'Crafted to keep.',
        'imgkw' => ['aurum-ring' => 'ring,jewelry', 'aurum-watch' => 'watch', 'aurum-pendant' => 'necklace,pendant'],
    ];
@endphp
@section('content')
    @include('frontend.partials.sf_store')
@endsection
