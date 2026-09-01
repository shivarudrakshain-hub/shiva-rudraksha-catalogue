{{-- Custom per-niche storefront header (own menu + design), wired to the real engine.
     Swapped in for frontend.inc.nav by the layout when a storefront is active. --}}
@php
    $sfSlug = session('sf_skin');
    $cfg = config('storefronts.' . $sfSlug);
@endphp
@if ($cfg)
@php
    $dark = $cfg['dark'];
    $ac = $cfg['accent']; $on = $cfg['on'];
    $bg   = $dark ? '#0b0d13' : '#ffffff';
    $ink  = $dark ? '#eef2f7' : '#141414';
    $muted = $dark ? '#98a1b2' : '#6b7280';
    $line = $dark ? 'rgba(255,255,255,.10)' : 'rgba(0,0,0,.09)';
    try { $sfCur = \App\Models\Currency::where('status', 1)->get(); } catch (\Throwable $e) { $sfCur = collect(); }
    try { $sfLang = \App\Models\Language::all(); } catch (\Throwable $e) { $sfLang = collect(); }
    $sfCC = 0;
    try {
        $sfCC = auth()->user()
            ? \App\Models\Cart::where('user_id', auth()->id())->sum('quantity')
            : (session('temp_user_id') ? \App\Models\Cart::where('temp_user_id', session('temp_user_id'))->sum('quantity') : 0);
    } catch (\Throwable $e) {}
@endphp
<style>
    @import url('https://fonts.googleapis.com/css2?family={{ str_replace(' ', '+', $cfg['font']) }}:wght@500;600;700&family=Inter:wght@400;500;600&display=swap');
    .sfnav{position:sticky;top:0;z-index:1000;display:flex;align-items:center;gap:1.2rem;padding:.75rem 1.4rem;
        background:{{ $bg }};color:{{ $ink }};border-bottom:1px solid {{ $line }};font-family:'Inter',system-ui,sans-serif;
        backdrop-filter:blur(12px)}
    .sfnav a{color:inherit;text-decoration:none}
    .sfnav .sfbrand{font-family:'{{ $cfg['font'] }}',serif;font-weight:700;font-size:1.35rem;letter-spacing:.02em;white-space:nowrap}
    .sfnav .sfbrand b{color:{{ $ac }}}
    .sfnav .sfmenu{display:flex;gap:1.3rem;margin-left:.6rem}
    .sfnav .sfmenu a{font-size:.86rem;font-weight:600;color:{{ $muted }};transition:color .2s;position:relative;padding:.2rem 0}
    .sfnav .sfmenu a:hover{color:{{ $ink }}}
    .sfnav .sfmenu a:after{content:"";position:absolute;left:0;right:100%;bottom:-2px;height:2px;background:{{ $ac }};transition:right .25s}
    .sfnav .sfmenu a:hover:after{right:0}
    .sfnav .sfact{margin-left:auto;display:flex;align-items:center;gap:.7rem}
    .sfnav .sfsearch{display:flex;align-items:center;background:{{ $dark ? 'rgba(255,255,255,.07)' : 'rgba(0,0,0,.05)' }};border:1px solid {{ $line }};border-radius:999px;padding:.15rem .15rem .15rem .8rem}
    .sfnav .sfsearch input{background:none;border:none;outline:none;color:{{ $ink }};font:inherit;font-size:.82rem;width:150px}
    .sfnav .sfsearch button{border:none;background:{{ $ac }};color:{{ $on }};width:30px;height:30px;border-radius:50%;cursor:pointer}
    .sfnav .sfsel{background:none;border:1px solid {{ $line }};color:{{ $ink }};border-radius:8px;padding:.3rem .4rem;font:inherit;font-size:.78rem;cursor:pointer}
    .sfnav .sfsel option{color:#111}
    .sfnav .sfic{position:relative;width:40px;height:40px;border-radius:50%;border:1px solid {{ $line }};display:flex;align-items:center;justify-content:center;font-size:1.05rem}
    .sfnav .sfic:hover{border-color:{{ $ac }}}
    .sfnav .sfcc{position:absolute;top:-4px;right:-4px;min-width:18px;height:18px;border-radius:999px;background:{{ $ac }};color:{{ $on }};font-size:.66rem;font-weight:700;display:flex;align-items:center;justify-content:center;padding:0 4px}
    @media(max-width:900px){.sfnav .sfmenu{display:none}.sfnav .sfsearch input{width:90px}}
</style>
<header class="sfnav">
    <a class="sfbrand" href="{{ url('/' . $sfSlug) }}">{{ $cfg['emoji'] }} <b>{{ $cfg['brand'] }}</b></a>
    <nav class="sfmenu">
        <a href="{{ url('/' . $sfSlug) }}">Home</a>
        <a href="{{ url('/' . $sfSlug . '/shop') }}">Shop</a>
        <a href="{{ url('/' . $sfSlug . '/shop') }}">New in</a>
        <a href="https://animazon.in/marketplace/">All templates</a>
    </nav>
    <div class="sfact">
        <form class="sfsearch" action="{{ route('search') }}" method="GET">
            <input name="keyword" placeholder="Search {{ $cfg['brand'] }}…" aria-label="Search">
            <button type="submit" aria-label="Search">🔎</button>
        </form>
        @if ($sfCur->count() > 1)
            <select class="sfsel" onchange="changeCurrency(this.value)" title="Currency">
                @foreach ($sfCur as $c)<option value="{{ $c->code }}" @if($c->id == get_setting('system_default_currency')) selected @endif>{{ $c->code }}</option>@endforeach
            </select>
        @endif
        @if ($sfLang->count() > 1)
            <select class="sfsel" onchange="changeLanguage(this.value)" title="Language">
                @foreach ($sfLang as $l)<option value="{{ $l->code }}">{{ strtoupper($l->code) }}</option>@endforeach
            </select>
        @endif
        <a class="sfic" href="{{ auth()->user() ? route('dashboard') : route('user.login') }}" title="Account">👤</a>
        <a class="sfic" href="{{ route('cart') }}" title="Cart">🛒 @if ($sfCC > 0)<span class="sfcc">{{ $sfCC }}</span>@endif</a>
    </div>
</header>
@else
    @include('frontend.inc.nav')
@endif
