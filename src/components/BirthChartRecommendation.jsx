import { useState } from "react";
import { calculateVedicChart } from "../lib/vedicChart";
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
  latitude: "",
  longitude: "",
  timeZone: "",
};

export default function BirthChartRecommendation() {
  const [form, setForm] = useState(initialForm);
  const [error, setError] = useState("");
  const [chart, setChart] = useState(null);

  const updateField = (event) => {
    setForm((current) => ({
      ...current,
      [event.target.name]: event.target.value,
    }));
    setError("");
    setChart(null);
  };

  const generateChart = (event) => {
    event.preventDefault();
    setError("");
    setChart(null);
    try { setChart(calculateVedicChart(form)); }
    catch(err) { setError(err.message || "Unable to calculate chart."); }
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

          <div className="birth-chart-form-grid">
            <label><span>Birth latitude</span><input name="latitude" type="number" step="any" min="-66" max="66" placeholder="43.6532" value={form.latitude} onChange={updateField} required /></label>
            <label><span>Birth longitude (West negative)</span><input name="longitude" type="number" step="any" min="-180" max="180" placeholder="-79.3832" value={form.longitude} onChange={updateField} required /></label>
          </div>
          <label><span>Birth timezone (IANA)</span><input name="timeZone" placeholder="America/Toronto" value={form.timeZone} onChange={updateField} required /></label>
          <p className="birth-chart-note">Confirm the exact coordinates and timezone of the birthplace. Incorrect inputs change the result.</p>
          {error && <p className="birth-chart-error" role="alert">{error}</p>}

          <button type="submit" className="birth-chart-submit">
            <MessageCircle />
            Display Birth Chart
          </button>

          <button type="button" className="birth-chart-submit" onClick={submitRequest} style={{marginTop:12,background:"#6c1722"}}><MessageCircle /> Request Guidance via WhatsApp</button>
          <p className="birth-chart-note">
            Your information is not stored by this website. It is placed
            directly into the WhatsApp message you choose to send.
          </p>
        </form>
        {chart && <section aria-live="polite" style={{gridColumn:"1 / -1",padding:24,background:"#fff9ef",borderRadius:16}}>
          <h3>Vedic Birth Chart — {form.fullName}</h3>
          <p><strong>Lagna:</strong> {chart.lagna} · <strong>Rashi:</strong> {chart.rashi} · <strong>Nakshatra:</strong> {chart.nakshatra} · <strong>Pada:</strong> {chart.pada}</p>
          <p>{chart.ayanamsa} · {chart.houseSystem} · {chart.utc} UTC</p>
          <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(150px,1fr))",gap:10}}>
          {chart.houses.map((h,i)=><div key={i} style={{background:"white",border:"1px solid #d9c19c",padding:14,borderRadius:10}}><strong>House {i+1}: {h.sign}</strong><p>{h.planets.join(", ")||"—"}</p></div>)}
          </div><p>Approximate Lahiri-style calculation for spiritual reference. Lunar nodes are not included. Results require verification against reference charts.</p>
        </section>
      </div>
    </section>
  );
}
