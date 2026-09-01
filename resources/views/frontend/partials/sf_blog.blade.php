{{-- Themed BLOG listing — faithful to the Stitch "Electronics Blog & News".
     Rendered by BlogController@all_blog when a storefront skin is active. Real Blog posts. --}}
@extends('frontend.layouts.app')
@section('meta_title', 'Blog | ' . get_setting('website_name'))
@php
    $slug = session('sf_skin');
    $cfg = config('storefronts.' . $slug);
    $dark = $cfg['dark'] ?? true;
    $ac = $cfg['accent']; $on = $cfg['on'];
    $bg = $dark ? '#080a11' : '#f4f6f9'; $surf = $dark ? '#12151d' : '#ffffff';
    $ink = $dark ? '#eef2f7' : '#141414'; $muted = $dark ? '#98a1b2' : '#6b7280';
    $line = $dark ? 'rgba(255,255,255,.1)' : 'rgba(0,0,0,.1)';
@endphp
@section('content')
<style>
    .sfblog{--ac:{{ $ac }};--on:{{ $on }};--bg:{{ $bg }};--surf:{{ $surf }};--ink:{{ $ink }};--muted:{{ $muted }};--line:{{ $line }};
        background:var(--bg);color:var(--ink);font-family:'Inter',system-ui,sans-serif;min-height:82vh}
    .sfblog .hero{position:relative;text-align:center;padding:5rem 1rem;border-bottom:1px solid var(--line);
        background:linear-gradient(color-mix(in srgb,var(--bg) 60%,transparent),var(--bg)),radial-gradient(80% 120% at 50% 0,color-mix(in srgb,var(--ac) 18%,transparent),transparent 60%),var(--surf)}
    .sfblog .hero h1{font-family:'{{ $cfg['font'] }}',serif;font-weight:600;font-size:clamp(2.2rem,5.5vw,3.8rem);margin:0}
    .sfblog .sub{text-align:center;color:var(--muted);padding:2rem 1rem 0;font-size:1.05rem}
    .sfblog .grid{max-width:1120px;margin:0 auto;padding:2rem 1.2rem 4.5rem;display:grid;grid-template-columns:repeat(auto-fill,minmax(340px,1fr));gap:1.6rem}
    .sfblog .card{background:var(--surf);border:1px solid var(--line);border-radius:18px;overflow:hidden;display:flex;flex-direction:column;transition:transform .25s,box-shadow .25s}
    .sfblog .card:hover{transform:translateY(-5px);box-shadow:0 30px 60px -34px #000}
    .sfblog .card .im{aspect-ratio:16/9;overflow:hidden;background:#0e1119}
    .sfblog .card .im img{width:100%;height:100%;object-fit:cover;transition:transform .5s}
    .sfblog .card:hover .im img{transform:scale(1.05)}
    .sfblog .cb{padding:1.3rem 1.4rem 1.5rem;display:flex;flex-direction:column;flex:1}
    .sfblog .cb h3{font-family:'{{ $cfg['font'] }}',serif;font-weight:600;font-size:1.3rem;margin:0 0 .5rem;line-height:1.25}
    .sfblog .cb h3 a{color:var(--ink);text-decoration:none}
    .sfblog .cb p{color:var(--muted);font-size:.9rem;line-height:1.55;flex:1;margin:0 0 1.1rem}
    .sfblog .cf{display:flex;align-items:center;justify-content:space-between}
    .sfblog .rm{padding:.55rem 1.1rem;border-radius:999px;border:none;background:linear-gradient(180deg,color-mix(in srgb,var(--ac) 118%,#fff),var(--ac));color:var(--on);font-weight:700;font-size:.82rem;text-decoration:none}
    .sfblog .dt{color:var(--muted);font-size:.82rem}
    .sfblog .empty{text-align:center;color:var(--muted);padding:4rem 1rem}
    .sfblog .pag{max-width:1120px;margin:0 auto;padding:0 1.2rem 4rem}
    .sfblog .pag a,.sfblog .pag span{color:var(--ink)}
</style>
<div class="sfblog">
    <div class="hero"><h1>{{ $cfg['brand'] }} {{ ucfirst($cfg['cat']) }} Blog &amp; News</h1></div>
    <div class="sub">Stay updated on the latest {{ $cfg['tag'] }}, reviews and insights.</div>
    @if (isset($blogs) && count($blogs))
        <div class="grid">
            @foreach ($blogs as $blog)
                @php
                    $img = $blog->banner ? uploaded_asset($blog->banner) : '/assets/store/img/hero-' . $slug . '.jpg';
                    $excerpt = strip_tags($blog->short_description ?? $blog->description ?? '');
                @endphp
                <article class="card">
                    <a class="im" href="{{ route('blog.details', $blog->slug) }}"><img loading="lazy" src="{{ $img }}" alt="{{ $blog->title }}" onerror="this.onerror=null;this.src='/assets/store/img/hero-{{ $slug }}.jpg'"></a>
                    <div class="cb">
                        <h3><a href="{{ route('blog.details', $blog->slug) }}">{{ $blog->title }}</a></h3>
                        <p>{{ \Illuminate\Support\Str::limit($excerpt, 130) }}</p>
                        <div class="cf">
                            <a class="rm" href="{{ route('blog.details', $blog->slug) }}">Read More</a>
                            <span class="dt">{{ \Carbon\Carbon::parse($blog->created_at)->format('d M Y') }}</span>
                        </div>
                    </div>
                </article>
            @endforeach
        </div>
        <div class="pag">{{ $blogs->links() }}</div>
    @else
        <div class="empty"><p>No articles published yet — check back soon.</p></div>
    @endif
</div>
@endsection
