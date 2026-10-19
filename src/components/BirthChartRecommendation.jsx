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
};

export default function BirthChartRecommendation() {
  const [form, setForm] = useState(initialForm);
  const [error, setError] = useState("");
  const [chart, setChart] = useState(null);
  const [loading, setLoading] = useState(false);

  const updateField = (event) => {
    setForm((current) => ({
      ...current,
      [event.target.name]: event.target.value,
    }));
    setError("");
    setChart(null);
  };

  const generateChart = async (event) => {
    event.preventDefault();
    setError("");
    setChart(null);
    if (!form.fullName.trim() || !form.dateOfBirth || !form.timeOfBirth || !form.placeOfBirth.trim()) {
      setError("Please enter your name, birth date, exact birth time, and birthplace.");
      return;
    }
    setLoading(true);
    try {
      const response = await fetch("/api/vedic-birth-chart", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (!response.ok) throw new Error("Birth chart calculation is not available yet. Please use WhatsApp for a personalized recommendation.");
      const data = await response.json();
      if (!data || !Array.isArray(data.houses) || data.houses.length !== 12 || !data.lagna || !data.rashi || !data.nakshatra) {
        throw new Error("The chart service returned incomplete results. Please try again later.");
      }
      setChart(data);
    } catch (err) {
      setError(err.message || "Unable to calculate the chart right now.");
    } finally {
      setLoading(false);
    }
  };

  const submitRequest = (event) => {
    event.preventDefault();

    const fullName = form.fullName.trim();
    const placeOfBirth = form.placeOfBirth.trim();

    if (!fullName || !form.dateOfBirth || !placeOfBirth || !form.timeOfBirth) {
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
      `Time of birth: ${form.timeOfBirth}`,
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
            PERSONALIZED GUIDANCE
          </span>

          <h2>Birth chart Rudraksha recommendation</h2>

          <p>
            Share your birth details to request a personalized Rudraksha
            recommendation. After submitting, WhatsApp will open with your
            information ready to send.
          </p>

          <div className="birth-chart-points">
            <span><UserRound /> Personalized review</span>
            <span><MessageCircle /> Direct WhatsApp request</span>
            <span><Sparkles /> Suitable Mukhi recommendation</span>
          </div>
        </div>

        <form className="birth-chart-form" onSubmit={generateChart}>
          <div className="birth-chart-form-heading">
            <span>VEDIC BIRTH CHART</span>
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
              <input
                type="time"
                name="timeOfBirth"
                value={form.timeOfBirth}
                onChange={updateField}
                required
              />
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
        </form>\n        {chart && <section className="birth-chart-result" aria-live="polite" style={{ gridColumn: "1 / -1", background: "#fff9ed", borderRadius: 16, padding: 24, marginTop: 20 }}>\n          <h3>Vedic Birth Chart — {form.fullName}</h3>\n          <p><strong>Lagna:</strong> {chart.lagna} · <strong>Rashi:</strong> {chart.rashi} · <strong>Nakshatra:</strong> {chart.nakshatra}{chart.pada ? ` · Pada: ${chart.pada}` : ""}</p>\n          <p>Sidereal zodiac · {chart.ayanamsa || "Ayanamsa not specified"} · {chart.houseSystem || "House system not specified"}</p>\n          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(155px,1fr))", gap: 12 }}>\n            {chart.houses.map((house, index) => <article key={index} style={{ border: "1px solid #ddc59c", padding: 14, borderRadius: 10, background: "white" }}>\n              <strong>House {index + 1}</strong>\n              <p>{house.sign || "—"}</p>\n              <small>{Array.isArray(house.planets) ? house.planets.join(", ") || "No planets" : "No planets"}</small>\n            </article>)}\n          </div>\n          <p style={{ marginTop: 16 }}>Traditional astrological interpretations are for spiritual reference and do not guarantee outcomes.</p>\n        </section>}
      </div>
    </section>
  );
}
