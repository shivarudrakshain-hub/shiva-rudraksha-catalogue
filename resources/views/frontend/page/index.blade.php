@extends('frontend.layouts.app')
@section('meta_title', 'PAGE — Books & Stationery | ' . get_setting('website_name'))
@php
    $sf = [
        'class' => 'sf-page', 'brand' => 'PAGE',
        'ac' => '#3f6f5f', 'bg' => '#f7f5ef', 'surf' => '#ffffff', 'ink' => '#22201a', 'muted' => '#847d70', 'line' => 'rgba(0,0,0,.1)', 'on' => '#ffffff',
        'font' => "'Fraunces',serif", 'fontimport' => 'https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,500;9..144,600&display=swap',
        'eb' => 'Paper goods', 'h1' => 'For the<br>makers.', 'p' => 'Notebooks, pens and planners for every idea. Free shipping, cash on delivery.',
        'cta' => 'Shop stationery →', 'h2' => 'Shop all', 'sub' => 'For every idea.',
        'imgkw' => ['page-notebook' => 'notebook', 'page-pens' => 'fountain,pen', 'page-planner' => 'planner,diary'],
    ];
@endphp
@section('content')
    @include('frontend.partials.sf_store')
@endsection
