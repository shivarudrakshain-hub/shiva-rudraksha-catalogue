@extends('frontend.layouts.app')
@section('meta_title', 'THREAD — Clothing | ' . get_setting('website_name'))
@php
    $sf = [
        'class' => 'sf-thread', 'brand' => 'THREAD',
        'ac' => '#141414', 'bg' => '#f5f3f0', 'surf' => '#ffffff', 'ink' => '#17130f', 'muted' => '#7c746a', 'line' => 'rgba(0,0,0,.1)', 'on' => '#ffffff',
        'font' => "'Playfair Display',serif", 'fontimport' => 'https://fonts.googleapis.com/css2?family=Playfair+Display:wght@600;700&display=swap',
        'eb' => 'The essentials', 'h1' => 'Wear it<br>every day.', 'p' => 'Elevated basics in heavyweight cotton. Free shipping, cash on delivery.',
        'cta' => 'Shop the edit →', 'h2' => 'The edit', 'sub' => 'Everyday staples, considered.',
        'imgkw' => ['thread-tee' => 't-shirt', 'thread-hoodie' => 'hoodie', 'thread-jacket' => 'jacket'],
    ];
@endphp
@section('content')
    @include('frontend.partials.sf_store')
@endsection
