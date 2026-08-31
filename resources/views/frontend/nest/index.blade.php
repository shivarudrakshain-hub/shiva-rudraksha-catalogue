@extends('frontend.layouts.app')
@section('meta_title', 'NEST — Furniture & Home | ' . get_setting('website_name'))
@php
    $sf = [
        'class' => 'sf-nest', 'brand' => 'NEST',
        'ac' => '#9a7b4f', 'bg' => '#f4f1ec', 'surf' => '#ffffff', 'ink' => '#201d18', 'muted' => '#847c70', 'line' => 'rgba(0,0,0,.1)', 'on' => '#ffffff',
        'font' => "'Fraunces',serif", 'fontimport' => 'https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,500;9..144,600&display=swap',
        'eb' => 'Home, considered', 'h1' => 'Made to<br>live in.', 'p' => 'Furniture and lighting for calmer spaces. Free shipping, cash on delivery.',
        'cta' => 'Shop the home →', 'h2' => 'New arrivals', 'sub' => 'Made to last.',
        'imgkw' => ['nest-chair' => 'lounge,chair', 'nest-lamp' => 'floor,lamp', 'nest-table' => 'side,table'],
    ];
@endphp
@section('content')
    @include('frontend.partials.sf_store')
@endsection
