import { useState } from "react";
import {
  CalendarDays,
  Clock3,
  MapPin,
  MessageCircle,
  Sparkles,
  UserRound,
} from "lucide-react";

const initialForm = {
  fullName: "",
  dateOfBirth: "",
  placeOfBirth: "",
  timeOfBirth: "",
  period: "AM",
};

export default function BirthChartRecommendation() {
  const [form, setForm] = useState(initialForm);
  const [error, setError] = useState("");

  const updateField = (event) => {
    setForm((current) => ({
      ...current,
      [event.target.name]: event.target.value,
    }));
    setError("");
  };

  const submitRequest = (event) => {
    event.preventDefault();

    const fullName = form.fullName.trim();
    const placeOfBirth = form.placeOfBirth.trim();

    if (!fullName || !form.dateOfBirth || !placeOfBirth || !form.timeOfBirth || !/^((0?[1-9])|(1[0-2])):[0-5][0-9]$/.test(form.timeOfBirth)) {
      setError("Please complete all birth details before submitting.");
      return;
    }

    const message = [
      "Namaste Shiva Rudraksha Inc.,",
      "",
      "I would like a Rudraksha recommendation based on my birth chart.",
      "",
      `Full name: ${fullName}`,
      `Date of birth: ${form.dateOfBirth}`,
      `Time of birth: ${form.timeOfBirth} ${form.period}`,
      `Place of birth: ${placeOfBirth}`,
      "",
      "Please review my birth details and recommend the suitable Rudraksha.",
    ].join("\n");

    const whatsappUrl =
      `https://wa.me/14372671257?text=${encodeURIComponent(message)}`;

    window.open(whatsappUrl, "_blank", "noopener,noreferrer");
  };

  return (
    <section id="birth-chart" className="birth-chart-section">
      <div className="container birth-chart-layout">
        <div className="birth-chart-intro">
          <span className="birth-chart-eyebrow">
            <Sparkles />
            VEDIC ASTROLOGY · PERSONALIZED GUIDANCE
          </span>

          <h2>Birth Chart <em>Rudraksha Recommendation</em></h2>

          <p>
            Share your birth details for a personalized Rudraksha recommendation informed by Vedic astrology traditions. Our team will review your request and reply via WhatsApp.
          </p>

          <div className="birth-chart-points">
            <span><UserRound /> Personalized review</span>
            <span><MessageCircle /> Direct WhatsApp request</span>
            <span><Sparkles /> Suitable Mukhi recommendation</span>
          </div>
          <div className="birth-chart-vedic-art" role="img" aria-label="Decorative Vedic astrology birth chart with a lotus and sacred Om symbol" />
        </div>

        <form className="birth-chart-form" onSubmit={submitRequest}>
          <div className="birth-chart-form-heading">
            <span>REQUEST A RECOMMENDATION</span>
            <h3>Enter your birth details</h3>
            <p>All fields are required.</p>
          </div>

          <label>
            <span><UserRound /> Full name</span>
            <input
              type="text"
              name="fullName"
              value={form.fullName}
              onChange={updateField}
              placeholder="Enter your full name"
              autoComplete="name"
              required
            />
          </label>

          <div className="birth-chart-form-grid">
            <label>
              <span><CalendarDays /> Date of birth</span>
              <input
                type="date"
                name="dateOfBirth"
                value={form.dateOfBirth}
                onChange={updateField}
                required
              />
            </label>

            <label>
              <span><Clock3 /> Time of birth</span>
              <div className="birth-chart-time-controls">
                <input type="text" name="timeOfBirth" value={form.timeOfBirth} onChange={updateField} placeholder="hh:mm" inputMode="numeric" pattern="(0?[1-9]|1[0-2]):[0-5][0-9]" title="Enter 12-hour time, for example 09:25" aria-label="Time of birth in 12-hour format" required />
                <div className="birth-chart-period" role="group" aria-label="AM or PM">
                  <button type="button" aria-pressed={form.period === "AM"} className={form.period === "AM" ? "selected" : ""} onClick={() => setForm(v => ({...v,period:"AM"}))}>AM</button>
                  <button type="button" aria-pressed={form.period === "PM"} className={form.period === "PM" ? "selected" : ""} onClick={() => setForm(v => ({...v,period:"PM"}))}>PM</button>
                </div>
              </div>
            </label>
          </div>

          <label>
            <span><MapPin /> Place of birth</span>
            <input
              type="text"
              name="placeOfBirth"
              value={form.placeOfBirth}
              onChange={updateField}
              placeholder="City, state/province, country"
              autoComplete="address-level2"
              required
            />
          </label>

          {error && <p className="birth-chart-error">{error}</p>}

          <button type="submit" className="birth-chart-submit">
            <MessageCircle />
            Send Request via WhatsApp
          </button>

          <p className="birth-chart-note">
            Your information is not stored by this website. It is placed
            directly into the WhatsApp message you choose to send.
          </p>
        </form>
      </div>
    </section>
  );
}
