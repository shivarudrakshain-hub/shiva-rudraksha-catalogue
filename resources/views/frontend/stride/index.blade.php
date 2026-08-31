@extends('frontend.layouts.app')
@section('meta_title', 'STRIDE — Footwear | ' . get_setting('website_name'))
@php
    $sf = [
        'class' => 'sf-stride', 'brand' => 'STRIDE',
        'ac' => '#d6ff3f', 'bg' => '#0b0c0e', 'surf' => '#15171b', 'ink' => '#eef1f4', 'muted' => '#8b93a0', 'line' => 'rgba(214,255,63,.14)', 'on' => '#141a04',
        'font' => "'Archivo',sans-serif", 'fontimport' => 'https://fonts.googleapis.com/css2?family=Archivo:wght@600;700;800&display=swap',
        'eb' => 'Move fast', 'h1' => 'Built<br>to move.', 'p' => 'Sneakers, runners and boots tuned for the road. Free shipping, cash on delivery.',
        'cta' => 'Shop footwear →', 'h2' => 'This season', 'sub' => 'Fresh drops for the road.',
        'imgkw' => ['stride-runner' => 'running,shoe', 'stride-sneaker' => 'sneaker', 'stride-boot' => 'boots'],
    ];
@endphp
@section('content')
    @include('frontend.partials.sf_store')
@endsection
