@extends('frontend.layouts.app')

@section('content')
<main class="page-shell" style="padding-top:50px;padding-bottom:100px;">
    <div class="container contact-page">
        <div class="page-heading">
            <span>CONTACT</span>
            <h1>We reply personally.</h1>
            <p>Message us and you will hear back from a person, not an auto-responder.</p>
        </div>

        <div class="contact-grid">
            <a href="https://wa.me/14372671257" target="_blank" rel="noreferrer" style="text-decoration:none;">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path></svg>
                <span>
                    <small>WHATSAPP (FASTEST)</small>
                    <strong>Chat with us</strong>
                </span>
            </a>

            <a href="tel:+14372671257" style="text-decoration:none;">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path></svg>
                <span>
                    <small>PHONE</small>
                    <strong>437-267-1257</strong>
                </span>
            </a>

            <a href="mailto:shivarudrakshain@gmail.com" style="text-decoration:none;">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="20" height="16" x="2" y="4" rx="2"></rect><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"></path></svg>
                <span>
                    <small>EMAIL</small>
                    <strong>shivarudrakshain@gmail.com</strong>
                </span>
            </a>

            <div style="cursor:default;">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"></path><circle cx="12" cy="10" r="3"></circle></svg>
                <span>
                    <small>BASED IN</small>
                    <strong>Scarborough, Ontario, Canada</strong>
                </span>
            </div>
        </div>
    </div>
</main>
@endsection
