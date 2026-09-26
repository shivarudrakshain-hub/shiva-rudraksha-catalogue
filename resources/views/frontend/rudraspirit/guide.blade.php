@extends('frontend.layouts.app')

@section('content')
@php
    $guideJsonPath = public_path('data/rudraksha-guide.json');
    $guideItems = file_exists($guideJsonPath) ? json_decode(file_get_contents($guideJsonPath), true) : [];
@endphp

<main class="page-shell guide-page" style="padding-top:50px;padding-bottom:90px;background:radial-gradient(circle at 30% 10%,#fff0d4,transparent 35%),var(--cream);">
    <div class="container">
        <div class="page-heading">
            <span>RUDRAKSHA GUIDE</span>
            <h1>1–21 Mukhi traditional guide</h1>
            <p>
                Traditional associations for educational and spiritual reference.
                Click on any section to expand details regarding deities, planets, beeja mantras, chakras, and wearing rules.
            </p>
        </div>

        <!-- 1-21 Mukhi Traditional Section -->
        <section class="guide-section">
            <div class="guide-section-heading">
                <span>1–21 MUKHI</span>
                <h2>Traditional Mukhi Guide</h2>
            </div>

            <div class="guide-grid detailed-guide-grid">
                @foreach (array_filter($guideItems, function($g) { return ($g['section'] ?? '') !== 'special'; }) as $guide)
                    @php
                        $mNum = $guide['mukhi'] ?? 1;
                        $gImg = asset('images/products/' . $mNum . '-mukhi-nepal-rudraksha/top.jpg');
                    @endphp
                    <article class="guide-card detailed-guide-card">
                        <div class="guide-summary-grid">
                            <div class="guide-summary-copy">
                                <span class="guide-entry-type">TRADITIONAL MUKHI</span>
                                <h2>{{ $guide['title'] ?? ($mNum . ' Mukhi Rudraksha') }}</h2>
                                <p class="guide-benefits">{{ $guide['benefits'] ?? '' }}</p>
                            </div>
                            <div class="guide-summary-image">
                                <img src="{{ $gImg }}" alt="{{ $guide['title'] ?? '' }}" onerror="this.onerror=null;this.src='{{ asset('shivarudraksha/images/products/' . $mNum . '-mukhi-nepal-rudraksha/top.jpg') }}';" loading="lazy">
                            </div>
                        </div>

                        <div class="guide-accordion">
                            <!-- Description Tab -->
                            <div class="guide-accordion-item">
                                <button type="button" class="guide-accordion-trigger" onclick="toggleGuideAccordion(this)">
                                    <span>Description & Astrological Associations</span>
                                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="6 9 12 15 18 9"></polyline></svg>
                                </button>
                                <div class="guide-accordion-content" style="display:block;">
                                    <div class="guide-facts">
                                        <div><span>Presiding Deity</span><strong>{{ $guide['deity'] ?? 'Lord Shiva' }}</strong></div>
                                        <div><span>Ruling Planet</span><strong>{{ $guide['planet'] ?? 'Sun' }}</strong></div>
                                        <div><span>Beej / Wearing Mantra</span><strong>{{ $guide['mantra'] ?? 'Om Hreem Namah' }}</strong></div>
                                        <div><span>Chakra</span><strong>{{ $guide['chakra'] ?? 'Sahasrara' }}</strong></div>
                                        <div><span>Nakshatra</span><strong>{{ $guide['nakshatra'] ?? 'All' }}</strong></div>
                                        <div><span>Origin</span><strong>{{ $guide['origin'] ?? 'Nepal' }}</strong></div>
                                    </div>
                                    <div class="guide-about">
                                        <h3>About this Sacred Bead</h3>
                                        <p>{{ $guide['about'] ?? '' }}</p>
                                    </div>
                                </div>
                            </div>

                            <!-- Benefits Tab -->
                            @if (!empty($guide['benefitDetails']))
                            <div class="guide-accordion-item">
                                <button type="button" class="guide-accordion-trigger" onclick="toggleGuideAccordion(this)">
                                    <span>Traditional Benefits</span>
                                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="6 9 12 15 18 9"></polyline></svg>
                                </button>
                                <div class="guide-accordion-content" style="display:none;">
                                    <div class="guide-benefit-sections">
                                        @foreach ($guide['benefitDetails'] as $b)
                                            <div>
                                                <h3>{{ $b['title'] ?? '' }}</h3>
                                                <p>{{ $b['text'] ?? '' }}</p>
                                            </div>
                                        @endforeach
                                    </div>
                                </div>
                            </div>
                            @endif

                            <!-- Who Should Wear -->
                            @if (!empty($guide['whoShouldWear']))
                            <div class="guide-accordion-item">
                                <button type="button" class="guide-accordion-trigger" onclick="toggleGuideAccordion(this)">
                                    <span>Who Should Wear</span>
                                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="6 9 12 15 18 9"></polyline></svg>
                                </button>
                                <div class="guide-accordion-content" style="display:none;">
                                    <ul class="guide-list-content">
                                        @foreach ($guide['whoShouldWear'] as $line)
                                            <li>{{ $line }}</li>
                                        @endforeach
                                    </ul>
                                </div>
                            </div>
                            @endif

                            <!-- Wearing Rules & Energization -->
                            @if (!empty($guide['wearingRules']))
                            <div class="guide-accordion-item">
                                <button type="button" class="guide-accordion-trigger" onclick="toggleGuideAccordion(this)">
                                    <span>Wearing Rules & Energization</span>
                                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="6 9 12 15 18 9"></polyline></svg>
                                </button>
                                <div class="guide-accordion-content" style="display:none;">
                                    <ul class="guide-list-content">
                                        @foreach ($guide['wearingRules'] as $rule)
                                            <li>{{ $rule }}</li>
                                        @endforeach
                                    </ul>
                                    <div class="guide-mantra-callout">
                                        <span>Traditional Beej Mantra</span>
                                        <strong>"{{ $guide['mantra'] ?? 'Om Namah Shivaya' }}"</strong>
                                    </div>
                                </div>
                            </div>
                            @endif
                        </div>
                    </article>
                @endforeach
            </div>
        </section>

        <!-- Special Natural Forms Section -->
        <section class="guide-section special-guide-section" style="margin-top:60px;">
            <div class="guide-section-heading">
                <span>SPECIAL RUDRAKSHA FORMS</span>
                <h2>Rare & Naturally Formed Rudraksha</h2>
                <p>
                    Ganesh, Gauri Shankar, Trijuti, Garbh Gauri and 1 Mukhi Savaar are divine natural formations of immense spiritual energy.
                </p>
            </div>

            <div class="guide-grid detailed-guide-grid">
                @foreach (array_filter($guideItems, function($g) { return ($g['section'] ?? '') === 'special'; }) as $special)
                    <article class="guide-card detailed-guide-card">
                        <div class="guide-summary-grid">
                            <div class="guide-summary-copy">
                                <span class="guide-entry-type">SPECIAL NATURAL FORM</span>
                                <h2>{{ $special['title'] ?? 'Rare Rudraksha' }}</h2>
                                <p class="guide-benefits">{{ $special['benefits'] ?? '' }}</p>
                            </div>
                        </div>

                        <div class="guide-accordion">
                            <div class="guide-accordion-item">
                                <button type="button" class="guide-accordion-trigger" onclick="toggleGuideAccordion(this)">
                                    <span>Description & Spiritual Significance</span>
                                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="6 9 12 15 18 9"></polyline></svg>
                                </button>
                                <div class="guide-accordion-content" style="display:block;">
                                    <div class="guide-facts">
                                        <div><span>Presiding Deity</span><strong>{{ $special['deity'] ?? 'Lord Shiva & Parvati' }}</strong></div>
                                        <div><span>Significance</span><strong>{{ $special['title'] ?? '' }}</strong></div>
                                        <div><span>Wearing Mantra</span><strong>{{ $special['mantra'] ?? 'Om Namah Shivaya' }}</strong></div>
                                        <div><span>Chakra Alignment</span><strong>{{ $special['chakra'] ?? 'Anahata' }}</strong></div>
                                    </div>
                                    <div class="guide-about">
                                        <h3>About this Rare Formation</h3>
                                        <p>{{ $special['about'] ?? '' }}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </article>
                @endforeach
            </div>
        </section>

        <p class="tradition-note" style="margin-top:48px;font-size:14px;color:var(--muted);line-height:1.7;padding:20px;background:#fffaf3;border:1px solid #ebd9c2;border-radius:14px;">
            Deity, planetary, nakshatra, chakra, mantra and wearing associations
            can differ among scriptures, lineages and teachers. These descriptions
            are provided as traditional spiritual information and are not medical,
            legal or financial advice.
        </p>
    </div>
</main>

<script>
function toggleGuideAccordion(button) {
    var content = button.nextElementSibling;
    var isOpen = content.style.display !== 'none';
    content.style.display = isOpen ? 'none' : 'block';
    var svg = button.querySelector('svg');
    if (svg) {
        svg.style.transform = isOpen ? 'rotate(0deg)' : 'rotate(180deg)';
        svg.style.transition = 'transform 0.2s ease';
    }
}
</script>
@endsection
