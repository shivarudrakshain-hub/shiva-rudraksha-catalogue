@extends('frontend.layouts.app')

@section('content')
@php
$aspects = [
    [
        'title' => 'Creation & Transformation',
        'text' => 'Shiva’s role as the ‘Destroyer’ represents transformation rather than malevolence—the ending of one state so that renewal and new beginnings can emerge.',
        'icon' => '<path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z"/>'
    ],
    [
        'title' => 'Renunciation & Asceticism',
        'text' => 'Shiva is often portrayed in deep meditation at Mount Kailash. His ash-covered form represents detachment from worldly attachment and dedication to spiritual realization.',
        'icon' => '<path d="m8 3 4 8 5-5 5 15H2L8 3z"/>'
    ],
    [
        'title' => 'The Third Eye',
        'text' => 'The third eye symbolizes insight beyond ordinary perception—the ability to recognize truth beyond surface appearances.',
        'icon' => '<path d="2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"/><circle cx="12" cy="12" r="3"/>'
    ],
    [
        'title' => 'Nataraja',
        'text' => 'As Nataraja, Shiva performs the cosmic dance representing creation, preservation, transformation and the continuous rhythm of existence.',
        'icon' => '<path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 2.5z"/>'
    ],
    [
        'title' => 'Trident — Trishul',
        'text' => 'The Trishul is one of Shiva’s best-known symbols and is commonly interpreted as representing fundamental triads such as creation, preservation and transformation.',
        'icon' => '<circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="1"/>'
    ],
    [
        'title' => 'Ganga',
        'text' => 'Hindu tradition describes Shiva receiving the sacred Ganga in his matted hair, moderating the river’s descent before it reached the Earth.',
        'icon' => '<path d="M2 6c.6.5 1.2 1 2.5 1C7 7 7 5 9.5 5c2.6 0 2.4 2 5 2 2.5 0 2.5-2 5-2 1.3 0 1.9.5 2.5 1"/><path d="M2 12c.6.5 1.2 1 2.5 1 2.5 0 2.5-2 5-2 2.6 0 2.4 2 5 2 2.5 0 2.5-2 5-2 1.3 0 1.9.5 2.5 1"/><path d="M2 18c.6.5 1.2 1 2.5 1 2.5 0 2.5-2 5-2 2.6 0 2.4 2 5 2 2.5 0 2.5-2 5-2 1.3 0 1.9.5 2.5 1"/>'
    ],
    [
        'title' => 'The Crescent Moon',
        'text' => 'The crescent moon worn by Shiva is associated with time, cycles, calmness and mastery over the changing phases of existence.',
        'icon' => '<path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"/>'
    ],
    [
        'title' => 'Family',
        'text' => 'Shiva is traditionally worshipped with Parvati, the divine feminine energy or Shakti. Their sons Ganesha and Kartikeya are also major deities in Hindu traditions.',
        'icon' => '<path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/>'
    ]
];
@endphp

<main class="rs-info-page">
    <div class="container rs-info-container">
        <section class="rs-info-hero shiva-hero">
            <span>THE ADIYOGI • MAHADEVA</span>
            <h1>Who Is Lord Shiva?</h1>
            <p>A concise introduction to the symbolism, stories and spiritual significance of one of Hinduism’s principal deities.</p>
        </section>

        <section class="rs-info-section rs-intro">
            <div class="rs-section-title">
                <span>01</span>
                <div>
                    <small>INTRODUCTION</small>
                    <h2>Lord Shiva</h2>
                </div>
            </div>
            <p>Lord Shiva is a principal deity in Hinduism and holds a central place in many Hindu traditions. He is often described as the transformer within the commonly presented Hindu triad of Brahma, Vishnu and Shiva, while Shaiva traditions worship Shiva as the Supreme Reality itself.</p>
            <p>Shiva embodies seemingly contrasting qualities: stillness and cosmic movement, renunciation and family life, dissolution and renewal. His imagery is rich with symbols that point toward meditation, self-knowledge, impermanence and spiritual liberation.</p>
        </section>

        <section class="rs-info-section">
            <div class="rs-section-title">
                <span>02</span>
                <div>
                    <small>SYMBOLISM</small>
                    <h2>Key Aspects of Lord Shiva</h2>
                </div>
            </div>
            <div class="rs-shiva-grid">
                @foreach ($aspects as $aspect)
                    <article class="rs-shiva-card">
                        <div>
                            <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                {!! $aspect['icon'] !!}
                            </svg>
                        </div>
                        <h3>{{ $aspect['title'] }}</h3>
                        <p>{{ $aspect['text'] }}</p>
                    </article>
                @endforeach
            </div>
        </section>

        <section class="rs-info-section rs-dark-section">
            <div class="rs-section-title">
                <span>03</span>
                <div>
                    <small>DEVOTION & PRACTICE</small>
                    <h2>Shiva, Rudraksha & Worship</h2>
                </div>
            </div>
            <div class="rs-shiva-story-grid">
                <article>
                    <h3>&#128143; Rudraksha</h3>
                    <p>Shiva is frequently depicted wearing Rudraksha beads. Within Hindu devotional traditions, Rudraksha is considered sacred and is used in prayer, mantra repetition and meditation.</p>
                </article>
                <article>
                    <h3>&#2384; Om Namah Shivaya</h3>
                    <p>“Om Namah Shivaya” is among the best-known mantras dedicated to Shiva. Devotees chant it during worship, meditation and personal spiritual practice.</p>
                </article>
                <article>
                    <h3>&#129684; Maha Shivaratri</h3>
                    <p>Maha Shivaratri is a major festival dedicated to Lord Shiva. Devotees may fast, keep vigil, perform Abhishekam, visit temples and spend time in prayer or meditation.</p>
                </article>
                <article>
                    <h3>&#2384; Philosophical Significance</h3>
                    <p>Different Hindu philosophical schools understand Shiva in different ways—from a personal deity and cosmic lord to the highest consciousness or ultimate reality beyond ordinary form.</p>
                </article>
            </div>
        </section>

        <section class="rs-final-note">
            <div style="font-size:34px;">&#9772;</div>
            <div>
                <small>SPIRITUAL SIGNIFICANCE</small>
                <h2>Transformation Through Awareness</h2>
                <p>For millions of devotees, Lord Shiva represents inner stillness, courage, transformation, compassion and the search for liberation. His symbolism continues to inspire meditation, devotion and self-inquiry.</p>
            </div>
        </section>
    </div>
</main>
@endsection
