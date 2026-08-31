@extends('frontend.layouts.app')
@section('meta_title', 'APEX — Sports & Fitness | ' . get_setting('website_name'))
@php
    $sf = [
        'class' => 'sf-apex', 'brand' => 'APEX',
        'ac' => '#ff5a3c', 'bg' => '#0a0c10', 'surf' => '#141821', 'ink' => '#eef2f7', 'muted' => '#8b94a3', 'line' => 'rgba(255,90,60,.16)', 'on' => '#1a0805',
        'font' => "'Space Grotesk',sans-serif", 'fontimport' => 'https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@500;600;700&display=swap',
        'eb' => 'Performance gear', 'h1' => 'Train<br>relentless.', 'p' => 'Weights, mats and gear to push every session. Free shipping, cash on delivery.',
        'cta' => 'Shop the kit →', 'h2' => 'Kit up', 'sub' => 'Built for the grind.',
        'imgkw' => ['apex-dumbbell' => 'dumbbell', 'apex-mat' => 'yoga,mat', 'apex-shaker' => 'shaker,bottle'],
    ];
@endphp
@section('content')
    @include('frontend.partials.sf_store')
@endsection
