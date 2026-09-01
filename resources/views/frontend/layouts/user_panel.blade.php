@extends('frontend.layouts.app')
@section('content')
@php $sfP = session('sf_skin') && config('storefronts.' . session('sf_skin')); @endphp
@includeIf('frontend.partials.sf_panel_skin')
<section class="py-5 {{ $sfP ? 'sfpanel' : '' }}">
    <div class="container">
        <div class="d-flex align-items-start">
			@include('frontend.inc.user_side_nav')
			<div class="aiz-user-panel">
				@yield('panel_content')
            </div>
        </div>
    </div>
</section>
@endsection