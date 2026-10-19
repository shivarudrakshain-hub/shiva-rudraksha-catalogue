# Vedic birth chart calculation integration

The Recommendations page now has an on-page chart view. **A real ephemeris-backed calculation endpoint must be deployed before this feature can generate charts.** The UI deliberately shows an error rather than inventing planetary positions.

## Required endpoint
`POST /api/vedic-birth-chart` with JSON:
```json
{"fullName":"Example","dateOfBirth":"1990-01-01","timeOfBirth":"08:30","placeOfBirth":"Toronto, Ontario, Canada"}
```

## Response contract
```json
{
  "lagna": "Aries",
  "rashi": "Cancer",
  "nakshatra": "Pushya",
  "pada": 2,
  "ayanamsa": "Lahiri",
  "houseSystem": "Whole sign",
  "houses": [
    {"sign":"Aries","planets":[]},
    {"sign":"Taurus","planets":[]},
    {"sign":"Gemini","planets":[]},
    {"sign":"Cancer","planets":["Moon"]},
    {"sign":"Leo","planets":[]},
    {"sign":"Virgo","planets":[]},
    {"sign":"Libra","planets":[]},
    {"sign":"Scorpio","planets":[]},
    {"sign":"Sagittarius","planets":[]},
    {"sign":"Capricorn","planets":[]},
    {"sign":"Aquarius","planets":[]},
    {"sign":"Pisces","planets":[]}
  ]
}
```
**The values above are schema examples, not an actual calculated chart.**

## Backend requirements
- Resolve birthplace to latitude/longitude and IANA timezone, including historical DST for the entered date.
- Use a trustworthy astronomical ephemeris (e.g., Swiss Ephemeris subject to its licensing terms) to calculate geocentric sidereal positions and ascendant.
- Document the ayanamsa, house system, and node conventions.
- Validate inputs and return explicit errors for ambiguous locations or missing birth time.
- Rate limit the endpoint; never log or retain personally identifying birth details unnecessarily.
- Configure same-origin API routing for the production deployment.
- Test against verified reference charts before enabling publicly.

The WhatsApp recommendation flow remains available independently.
