@extends('frontend.layouts.app')

@section('content')
<main class="recommendation-page" style="padding-top:40px;padding-bottom:90px;">
    <section id="birth-chart" class="birth-chart-section">
        <div class="container birth-chart-layout">
            <div class="birth-chart-intro">
                <span class="birth-chart-eyebrow">
                    <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z"/></svg>
                    PERSONALIZED GUIDANCE
                </span>

                <h2>Birth chart Rudraksha recommendation</h2>

                <p>
                    Share your birth details to request a personalized Rudraksha
                    recommendation. After submitting, WhatsApp will open with your
                    information ready to send.
                </p>

                <div class="birth-chart-points">
                    <span>
                        <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="8" r="5"/><path d="M20 21a8 8 0 1 0-16 0"/></svg>
                        Personalized review
                    </span>
                    <span>
                        <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"/></svg>
                        Direct WhatsApp request
                    </span>
                    <span>
                        <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z"/></svg>
                        Suitable Mukhi recommendation
                    </span>
                </div>
            </div>

            <form class="birth-chart-form" onsubmit="submitBirthChart(event)">
                <div class="birth-chart-form-heading">
                    <span>REQUEST A RECOMMENDATION</span>
                    <h3>Enter your birth details</h3>
                    <p>All fields are required.</p>
                </div>

                <label>
                    <span>
                        <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="8" r="5"/><path d="M20 21a8 8 0 1 0-16 0"/></svg>
                        Full name
                    </span>
                    <input type="text" id="bc-name" placeholder="Enter your full name" autocomplete="name" required>
                </label>

                <div class="birth-chart-form-grid">
                    <label>
                        <span>
                            <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2"><rect width="18" height="18" x="3" y="4" rx="2" ry="2"/><line x1="16" x2="16" y1="2" y2="6"/><line x1="8" x2="8" y1="2" y2="6"/><line x1="3" x2="21" y1="10" y2="10"/></svg>
                            Date of birth
                        </span>
                        <input type="date" id="bc-dob" required>
                    </label>

                    <label>
                        <span>
                            <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 14 14"/></svg>
                            Time of birth
                        </span>
                        <input type="time" id="bc-tob" required>
                    </label>
                </div>

                <label>
                    <span>
                        <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/></svg>
                        Place of birth
                    </span>
                    <input type="text" id="bc-pob" placeholder="City, state/province, country" autocomplete="address-level2" required>
                </label>

                <div id="bc-error" style="display:none;color:#b52a2a;font-size:14px;margin-bottom:12px;font-weight:600;"></div>

                <button type="submit" class="birth-chart-submit">
                    <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"/></svg>
                    Send Request via WhatsApp
                </button>

                <p class="birth-chart-note">
                    Your information is not stored by this website. It is placed
                    directly into the WhatsApp message you choose to send.
                </p>
            </form>
        </div>
    </section>
</main>

<script>
function submitBirthChart(e) {
    e.preventDefault();
    var name = document.getElementById('bc-name').value.trim();
    var dob = document.getElementById('bc-dob').value.trim();
    var tob = document.getElementById('bc-tob').value.trim();
    var pob = document.getElementById('bc-pob').value.trim();
    var errEl = document.getElementById('bc-error');

    if (!name || !dob || !tob || !pob) {
        if (errEl) {
            errEl.textContent = 'Please complete all birth details before submitting.';
            errEl.style.display = 'block';
        }
        return;
    }

    var message = [
        "Namaste Shiva Rudraksha Inc.,",
        "",
        "I would like a Rudraksha recommendation based on my birth chart.",
        "",
        "Full name: " + name,
        "Date of birth: " + dob,
        "Time of birth: " + tob,
        "Place of birth: " + pob,
        "",
        "Please review my birth details and recommend the suitable Rudraksha."
    ].join("\n");

    var whatsappUrl = "https://wa.me/14372671257?text=" + encodeURIComponent(message);
    window.open(whatsappUrl, "_blank", "noopener,noreferrer");
}
</script>
@endsection
