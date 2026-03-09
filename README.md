# Weather MVP

Minimal `Next.js` weather app scaffold with:

- App Router pages for home, search, and settings
- Internal API routes for current weather, forecast, and location search
- Open-Meteo provider integration with mock fallbacks
- Shared normalization layer so the provider can be replaced later

## Run

```bash
npm install
npm run dev
```

Open `http://localhost:3000`.

## Notes

- No API key is required because the scaffold uses Open-Meteo.
- If the external API is unreachable, the UI falls back to mock data.
- Settings are URL-driven in this MVP. Persist them with cookies, local storage, or a database later.
- Strong next steps: add geolocation permission flow, a client-side cache layer, and user-saved cities.
