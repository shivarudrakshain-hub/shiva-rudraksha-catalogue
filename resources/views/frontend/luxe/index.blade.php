@extends('frontend.layouts.app')
@section('meta_title', 'LUXE — Beauty | ' . get_setting('website_name'))
@php
    $sf = [
        'class' => 'sf-luxe', 'brand' => 'LUXE',
        'ac' => '#c2687a', 'bg' => '#faf5f4', 'surf' => '#ffffff', 'ink' => '#241b1e', 'muted' => '#8a7a7f', 'line' => 'rgba(0,0,0,.1)', 'on' => '#ffffff',
        'font' => "'Playfair Display',serif", 'fontimport' => 'https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,600;1,500&display=swap',
        'eb' => 'Clean beauty', 'h1' => 'Glow,<br>defined.', 'p' => 'Skincare and colour that love your skin. Free shipping, cash on delivery.',
        'cta' => 'Shop bestsellers →', 'h2' => 'Bestsellers', 'sub' => 'Loved by many.',
        'imgkw' => ['luxe-lipstick' => 'lipstick', 'luxe-serum' => 'skincare,serum', 'luxe-foundation' => 'foundation,makeup'],
    ];
@endphp
@section('content')
    @include('frontend.partials.sf_store')
@endsection
