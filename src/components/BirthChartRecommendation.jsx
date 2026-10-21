import { useEffect, useState } from "react";
import {
  CalendarDays,
  Clock3,
  MapPin,
  MessageCircle,
  Sparkles,
  UserRound,
} from "lucide-react";

import "./BirthChartRecommendation.css";

const initialForm = {
  fullName: "",
  dateOfBirth: "",
  placeOfBirth: "",
  hour: "",
  minute: "",
  period: "AM",
};

export default function BirthChartRecommendation() {
  const [form, setForm] = useState(initialForm);
  const [error, setError] = useState("");
  const [cities, setCities] = useState([]);
  const [cityStatus, setCityStatus] = useState("");
  const [citySelected, setCitySelected] = useState(false);
  useEffect(() => {
    const query = form.placeOfBirth.trim();
    if (citySelected || query.length < 2) { setCities([]); setCityStatus(""); return; }
    const controller = new AbortController();
    const timer = setTimeout(async () => {
      setCityStatus("Searching cities…");
      try {
        const response = await fetch("https://geocoding-api.open-meteo.com/v1/search?name=" + encodeURIComponent(query) + "&count=8&language=en&format=json", {signal:controller.signal});
        if (!response.ok) throw new Error("Geocoding unavailable");
        const data = await response.json();
        setCities((data.results || []).map(city => [city.name,city.admin1,city.country].filter(Boolean).join(", ")));
        setCityStatus(data.results?.length ? "" : "No suggestions found. You may enter the location manually.");
      } catch (err) {
        if (err.name !== "AbortError") { setCities([]); setCityStatus("Suggestions unavailable. Enter the city manually."); }
      }
    },350);
    return () => { clearTimeout(timer); controller.abort(); };
  },[form.placeOfBirth,citySelected]);
  const updateTimePart = (part, raw) => {
    const digits = raw.replace(/\D/g, "").slice(0, 2);
    if (digits.length === 2 && Number(digits) > (part === "hour" ? 12 : 59)) return;
    setForm(current => ({ ...current, [part]: digits }));
    setError("");
  };


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

    if (!fullName || !form.dateOfBirth || !placeOfBirth || !/^((0[0-9])|(1[0-2]))$/.test(form.hour) || !/^[0-5][0-9]$/.test(form.minute)) {
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
      `Time of birth: ${form.hour}:${form.minute} ${form.period}`,
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
            BIRTH CHART · PERSONALIZED GUIDANCE
          </span>

          <h1>Your birth chart.<br /><em>Your Rudraksha.</em></h1>

          <p>
            Share your birth details for a personalized Rudraksha recommendation informed by Vedic astrology traditions. Our team will review your request and reply via WhatsApp.
          </p>

          <div className="birth-chart-points">
            <span><UserRound aria-hidden="true" /> A personal review of your birth details</span>
            <span><MessageCircle aria-hidden="true" /> Guidance directly from our team</span>
            <span><Sparkles aria-hidden="true" /> Help choosing a suitable Mukhi</span>
          </div>

        </div>

        <form className="birth-chart-form" onSubmit={submitRequest} aria-label="Birth chart recommendation request">
          <div className="birth-chart-form-heading">
            <span>REQUEST A RECOMMENDATION</span>
            <h2>Let’s find your Rudraksha</h2>
            <p>Enter your details below. Our team will reply on WhatsApp.</p>
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
                <div className="birth-chart-clock-input">
                  <input type="text" name="hour" value={form.hour} onChange={event => updateTimePart("hour",event.target.value)} placeholder="HH" inputMode="numeric" maxLength={2} pattern="0[0-9]|1[0-2]" title="Hours must be 00 to 12" aria-label="Birth hour (00 to 12)" required />
                  <span aria-hidden="true">:</span>
                  <input type="text" name="minute" value={form.minute} onChange={event => updateTimePart("minute",event.target.value)} placeholder="MM" inputMode="numeric" maxLength={2} pattern="[0-5][0-9]" title="Minutes must be 00 to 59" aria-label="Birth minutes (00 to 59)" required />
                </div>
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
              onChange={(event) => { setCitySelected(false); updateField(event); }}
              placeholder="Start typing a city, e.g. Erode"
              autoComplete="off"
              role="combobox"
              aria-autocomplete="list"
              aria-expanded={cities.length > 0}
              aria-controls="birth-city-suggestions"
              required
            />
            {cities.length > 0 && <div id="birth-city-suggestions" className="birth-city-suggestions" role="listbox">{cities.map((city,index) => <button key={city + index} type="button" role="option" aria-selected={false} onClick={() => { setForm(current => ({...current,placeOfBirth:city})); setCitySelected(true); setCities([]); setCityStatus(""); }}>{city}</button>)}</div>}
            {cityStatus && <small className="birth-city-status" role="status">{cityStatus}</small>}
          </label>

          {error && <p className="birth-chart-error">{error}</p>}

          <button type="submit" className="birth-chart-submit">
            <MessageCircle />
            Send Request via WhatsApp
          </button>

          <p className="birth-chart-note">
            Review your details in WhatsApp before sending. Your information is not stored by this website; it is placed
            directly into the WhatsApp message you choose to send.
          </p>
        </form>
      </div>
    </section>
  );
}
