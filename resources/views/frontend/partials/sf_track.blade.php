{{-- Themed ORDER TRACKING — faithful to the Stitch "Track Your Order Status".
     Rendered by HomeController@trackOrder when a storefront skin is active.
     Real engine: submits ?order_code=... to route('orders.track'); reads the live Order. --}}
@extends('frontend.layouts.app')
@section('meta_title', 'Track your order | ' . get_setting('website_name'))
@php
    $slug = session('sf_skin');
    $cfg = config('storefronts.' . $slug);
    $dark = $cfg['dark'] ?? true;
    $ac = $cfg['accent']; $on = $cfg['on'];
    $bg = $dark ? '#080a11' : '#f4f6f9'; $surf = $dark ? '#12151d' : '#ffffff';
    $ink = $dark ? '#eef2f7' : '#141414'; $muted = $dark ? '#98a1b2' : '#6b7280';
    $line = $dark ? 'rgba(255,255,255,.1)' : 'rgba(0,0,0,.1)';

    $steps = ['Ordered', 'Confirmed', 'Shipped', 'Delivered'];
    $curStep = -1; $cancelled = false; $ord = $order ?? null;
    if ($ord) {
        $st = strtolower(str_replace([' ', '-'], '_', $ord->delivery_status ?? 'pending'));
        $map = ['pending'=>0,'on_review'=>0,'order_placed'=>0,'confirmed'=>1,'processing'=>1,'preparing'=>1,
            'picked_up'=>2,'on_the_way'=>2,'on_delivery'=>2,'out_for_delivery'=>2,'shipped'=>2,'delivered'=>3];
        $curStep = $map[$st] ?? 0;
        if ($st === 'cancelled' || $st === 'canceled') { $cancelled = true; }
    }
@endphp
@section('content')
<style>
    .sftrk{--ac:{{ $ac }};--on:{{ $on }};--bg:{{ $bg }};--surf:{{ $surf }};--ink:{{ $ink }};--muted:{{ $muted }};--line:{{ $line }};
        background:var(--bg);color:var(--ink);font-family:'Inter',system-ui,sans-serif;min-height:82vh;
        background-image:linear-gradient(color-mix(in srgb,var(--bg) 88%,transparent),var(--bg)),
            repeating-linear-gradient(0deg,transparent,transparent 39px,color-mix(in srgb,var(--ac) 8%,transparent) 40px),
            repeating-linear-gradient(90deg,transparent,transparent 39px,color-mix(in srgb,var(--ac) 8%,transparent) 40px)}
    .sftrk .hero{text-align:center;padding:3.4rem 1rem 1rem}
    .sftrk .hero h1{font-family:'{{ $cfg['font'] }}',serif;font-weight:600;font-size:clamp(2.2rem,6vw,3.8rem);margin:0;
        text-shadow:0 0 40px color-mix(in srgb,var(--ac) 45%,transparent)}
    .sftrk .form{max-width:520px;margin:1.6rem auto 0;text-align:left}
    .sftrk .form label{display:block;font-size:.9rem;margin:1rem 0 .4rem}
    .sftrk .form input{width:100%;padding:.9rem 1rem;border-radius:12px;background:color-mix(in srgb,var(--ac) 6%,var(--surf));
        border:1.5px solid color-mix(in srgb,var(--ac) 55%,var(--line));color:var(--ink);font:inherit;outline:none;
        box-shadow:0 0 14px -4px color-mix(in srgb,var(--ac) 60%,transparent)}
    .sftrk .form input::placeholder{color:var(--muted)}
    .sftrk .form button{width:100%;margin-top:1.4rem;padding:1rem;border-radius:999px;border:none;cursor:pointer;
        background:linear-gradient(180deg,color-mix(in srgb,var(--ac) 120%,#fff),var(--ac));color:var(--on);font-weight:700;font-size:1rem;
        box-shadow:0 0 30px -6px var(--ac)}
    .sftrk .err{max-width:520px;margin:1rem auto 0;text-align:center;color:#ff8a8a}
    /* timeline */
    .sftrk .tl{max-width:820px;margin:3.5rem auto 1rem;display:flex;justify-content:space-between;position:relative;padding:0 1rem}
    .sftrk .tl .node{display:flex;flex-direction:column;align-items:center;flex:1;position:relative;z-index:2}
    .sftrk .tl .dot{width:64px;height:64px;border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:1.5rem;
        border:3px solid var(--line);background:var(--surf);color:var(--muted);transition:.3s}
    .sftrk .tl .node.done .dot{border-color:var(--ac);color:var(--ac);box-shadow:0 0 22px -2px var(--ac);background:color-mix(in srgb,var(--ac) 12%,var(--surf))}
    .sftrk .tl .node.active .dot{border-color:var(--ac);color:var(--on);background:var(--ac);box-shadow:0 0 30px 0 var(--ac)}
    .sftrk .tl .lbl{margin-top:.7rem;font-weight:600;font-size:.95rem}
    .sftrk .tl .node:not(.done):not(.active) .lbl{color:var(--muted)}
    .sftrk .tl .seg{position:absolute;top:32px;height:4px;background:var(--line);z-index:1}
    .sftrk .tl .seg.fill{background:var(--ac);box-shadow:0 0 12px -1px var(--ac)}
    .sftrk .eta{text-align:center;color:var(--ink);margin:2rem auto 0;font-size:1.05rem}
    .sftrk .odetail{max-width:820px;margin:2.5rem auto 0;background:var(--surf);border:1px solid var(--line);border-radius:16px;padding:1.4rem 1.6rem}
    .sftrk .odetail .rowd{display:flex;justify-content:space-between;padding:.5rem 0;border-bottom:1px solid var(--line);font-size:.92rem}
    .sftrk .odetail .rowd:last-child{border-bottom:none}
    .sftrk .odetail .k{color:var(--muted)}
    .sftrk .pad{padding-bottom:4rem}
    .sftrk .cancel{max-width:820px;margin:2.5rem auto 0;text-align:center;color:#ff8a8a;font-weight:600}
</style>
<div class="sftrk">
    <div class="pad">
        <div class="hero"><h1>Track Your Order Status</h1></div>

        <form class="form" method="GET" action="{{ route('orders.track') }}">
            <label>Order ID</label>
            <input name="order_code" value="{{ request('order_code') }}" placeholder="e.g. {{ \App\Models\Order::query()->value('code') ?? '20240101-1234' }}" required>
            <label>Email Address <span style="color:var(--muted);font-weight:400">(optional)</span></label>
            <input name="email" type="email" placeholder="Email on the order">
            <button type="submit">Track Order</button>
        </form>

        @if (request()->has('order_code') && !$ord)
            <div class="err">No order found for that Order ID. Check the code and try again.</div>
        @endif

        @if ($ord)
            @if ($cancelled)
                <div class="cancel">This order was cancelled.</div>
            @else
            <div class="tl">
                <div class="seg {{ $curStep >= 1 ? 'fill' : '' }}" style="left:12.5%;width:25%"></div>
                <div class="seg {{ $curStep >= 2 ? 'fill' : '' }}" style="left:37.5%;width:25%"></div>
                <div class="seg {{ $curStep >= 3 ? 'fill' : '' }}" style="left:62.5%;width:25%"></div>
                @foreach ($steps as $i => $s)
                    <div class="node {{ $i < $curStep ? 'done' : ($i === $curStep ? 'active' : '') }}">
                        <div class="dot">{{ $i <= $curStep ? '✓' : ($i === 1 ? '⚙' : ($i === 2 ? '🚚' : ($i === 3 ? '🏠' : '📦'))) }}</div>
                        <div class="lbl">{{ $s }}</div>
                    </div>
                @endforeach
            </div>
            <div class="eta">Current status: <b>{{ ucwords(str_replace('_', ' ', $ord->delivery_status ?? 'pending')) }}</b></div>
            @endif

            <div class="odetail">
                <div class="rowd"><span class="k">Order ID</span><span>{{ $ord->code }}</span></div>
                <div class="rowd"><span class="k">Placed on</span><span>{{ \Carbon\Carbon::parse($ord->created_at)->format('d M Y, g:i A') }}</span></div>
                @if(isset($ord->grand_total))<div class="rowd"><span class="k">Order total</span><span>{{ single_price($ord->grand_total) }}</span></div>@endif
                <div class="rowd"><span class="k">Payment</span><span>{{ ucwords(str_replace('_', ' ', $ord->payment_status ?? 'unpaid')) }} · {{ strtoupper($ord->payment_type ?? 'COD') }}</span></div>
            </div>
        @endif
    </div>
</div>
@endsection
