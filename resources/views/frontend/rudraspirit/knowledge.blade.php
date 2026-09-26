@extends('frontend.layouts.app')

@section('content')
@php
$steps = [
    ['title' => 'Cleanse', 'image' => asset('images/knowledge/step-1-cleanse.png'), 'alt' => 'Step 1 cleanse Rudraksha with clean plain water', 'text' => 'Cleanse Rudraksha with clean plain water to remove any surface dust.'],
    ['title' => 'Turmeric Water', 'image' => asset('images/knowledge/step-2-turmeric-water.png'), 'alt' => 'Step 2 wash Rudraksha with turmeric water', 'text' => 'Wash Rudraksha with turmeric water for natural purification and auspicious sanctity.'],
    ['title' => 'Soak in Cow Ghee', 'image' => asset('images/knowledge/step-3-cow-ghee.png'), 'alt' => 'Step 3 soak Rudraksha in cow ghee for 24 hours', 'text' => 'Soak Rudraksha in pure cow ghee for 24 hours to deeply condition the seed fibers.'],
    ['title' => 'Soak in Cow Milk', 'image' => asset('images/knowledge/step-4-cow-milk.png'), 'alt' => 'Step 4 soak Rudraksha in full-fat cow milk for 24 hours', 'text' => 'Soak Rudraksha in full-fat cow milk for 24 hours following traditional Vedic purification.'],
    ['title' => 'Remove & Dry', 'image' => asset('images/knowledge/step-5-remove-dry.png'), 'alt' => 'Step 5 remove Rudraksha and dry it carefully', 'text' => 'Remove Rudraksha and dry it carefully in a shaded, well-ventilated area.'],
    ['title' => 'Chant & Energize', 'image' => asset('images/knowledge/step-6-chant-energize.png'), 'alt' => 'Step 6 chant Om Namah Shivaya and energize Rudraksha', 'text' => 'Chant "Om Namah Shivaya" or the specific Beej Mantra 108 times to energize your Rudraksha before wearing.']
];

$guidance = [
    ['Funerals', 'Traditionally, Rudraksha is removed before attending funerals or cremation ceremonies.'],
    ['Women Can Wear Rudraksha', 'Traditional Rudraksha guidance does not universally prohibit women from wearing Rudraksha during menstruation. Practices may vary by family, lineage and personal belief.'],
    ['Do Not Share Worn Rudraksha', 'Once a Rudraksha has been personally worn, it is traditionally recommended not to exchange or transfer it to another person.'],
    ['Wear Close to the Body', 'When worn as a mala or pendant, keep the Rudraksha comfortably close to the body. Malas are traditionally worn around the neck.'],
    ['Thread or Metal', 'Rudraksha may be worn using black, yellow, white or red thread, or mounted in silver, gold, copper or another suitable metal.'],
    ['Keep It Personal', 'Treat your Rudraksha as a personal spiritual item and avoid unnecessary handling by other people.'],
    ['Wear Consistently', 'Traditional practice encourages wearing Rudraksha consistently rather than frequently putting it on and removing it.'],
    ['Daily Practice', 'Wear your Rudraksha naturally and respectfully as part of your everyday spiritual practice.'],
    ['Lifestyle', 'Different traditions have different recommendations regarding food, alcohol and smoking. Follow the spiritual discipline that is meaningful to you.'],
    ['Keep It Close', 'Keep the beads close to you when possible. Rudraksha may also be respectfully kept in a Puja room for family worship.'],
    ['If the Thread Breaks', 'If the thread or cord breaks, replace it with a new clean thread or suitable chain and continue wearing the Rudraksha.']
];
@endphp

<main class="rs-info-page">
    <div class="container rs-info-container">
        <section class="rs-info-hero">
            <span>RUDRAKSHA KNOWLEDGE</span>
            <h1>Basic Energizing Method</h1>
            <p>Traditional guidance for preparing, wearing and respecting your Rudraksha.</p>
        </section>

        <section class="rs-info-section rs-intro">
            <div class="rs-section-title">
                <span>01</span>
                <div>
                    <small>TRADITIONAL GUIDANCE</small>
                    <h2>Before You Begin</h2>
                </div>
            </div>
            <p>Rudraksha has been revered for centuries in Hindu spiritual traditions and is especially associated with Lord Shiva. References to Rudraksha are found across Shaiva and Puranic traditions, including the Shiva Purana and Devi Bhagavata Purana.</p>
            <p>Rudraksha may traditionally be worn by people of different ages and backgrounds. Customs vary between families, teachers and spiritual lineages, so the following method is presented as a simple traditional practice.</p>
        </section>

        <section class="rs-info-section">
            <div class="rs-section-title">
                <span>02</span>
                <div>
                    <small>STEP BY STEP</small>
                    <h2>How to Energize Your Rudraksha</h2>
                </div>
            </div>
            <div class="rs-energize-timeline">
                @foreach ($steps as $index => $step)
                    <article class="rs-timeline-step {{ $index % 2 ? 'rs-timeline-step--reverse' : '' }}">
                        <div class="rs-timeline-image-wrap">
                            <img src="{{ $step['image'] }}" alt="{{ $step['alt'] }}" loading="lazy">
                        </div>
                        <div class="rs-timeline-marker" aria-hidden="true">
                            <span>{{ str_pad($index + 1, 2, '0', STR_PAD_LEFT) }}</span>
                        </div>
                        <div class="rs-timeline-copy">
                            <small>STEP {{ $index + 1 }}</small>
                            <h3>{{ $step['title'] }}</h3>
                            <p>{{ $step['text'] }}</p>
                        </div>
                    </article>
                @endforeach
            </div>
            <div class="rs-callout">
                <svg viewBox="0 0 24 24" width="28" height="28" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="color:var(--orange);"><path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"/><path d="M19 3v4"/><path d="M21 5h-4"/></svg>
                <div>
                    <strong>Traditional Wearing Day</strong>
                    <p>Monday is traditionally considered especially auspicious for energizing and wearing Rudraksha.</p>
                </div>
            </div>
        </section>

        <section class="rs-info-section rs-dark-section">
            <div class="rs-section-title">
                <span>03</span>
                <div>
                    <small>CARE & TRADITION</small>
                    <h2>Do’s & Don’ts</h2>
                </div>
            </div>
            <div class="rs-guidance-grid">
                @foreach ($guidance as $index => $item)
                    <article class="rs-guidance-card">
                        <span>{{ str_pad($index + 1, 2, '0', STR_PAD_LEFT) }}</span>
                        <div>
                            <h3>{{ $item[0] }}</h3>
                            <p>{{ $item[1] }}</p>
                        </div>
                    </article>
                @endforeach
            </div>
        </section>

        <section class="rs-final-note">
            <div style="font-size:34px;">&#9772;</div>
            <div>
                <small>MOST IMPORTANT</small>
                <h2>Respect the Rudraksha</h2>
                <p>Rudraksha is traditionally regarded as sacred and associated with Lord Shiva. Wear and care for it respectfully, and never use spiritual practices with the intention of harming or manipulating another person.</p>
            </div>
        </section>

        <section class="rs-disclaimer">
            <strong>Traditional & Cultural Information</strong>
            <p>Information on this page reflects traditional, spiritual and cultural beliefs associated with Rudraksha. It is not medical, psychological, financial or professional advice.</p>
        </section>
    </div>
</main>
@endsection
