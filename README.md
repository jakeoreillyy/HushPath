# HushPath

**HushPath** is a walking route planner that finds calmer, less crowded paths between two locations — prioritising quiet streets over busy ones.

Built at a hackathon using React, Python, and the Google Maps & OpenStreetMap APIs.

---

## How It Works

1. **POI Density Mapping** — The Python backend queries the [Overpass API](https://overpass-api.de/) to fetch points of interest (shops, restaurants, bars, cafes, tourism spots) within a target area.
2. **Grid-Based Density Analysis** — POIs are bucketed into an ~80m grid. Each cell is scored by how many POIs it contains.
3. **Quiet Route Generation** — The least-dense grid cells are used as waypoints, and Google Maps Directions API generates a walking route that avoids busy areas.
4. **Map Rendering** — The frontend displays the route on an interactive Google Map with step-by-step directions.

---

## Getting Started

### Prerequisites

- Node.js ≥ 20
- Python ≥ 3.9
- A [Google Maps API key](https://developers.google.com/maps) with the following APIs enabled:
  - Maps JavaScript API
  - Directions API

### Frontend Setup

```bash
cd apps/client
npm install
```

Create a `.env` file in `apps/client/`:

```env
VITE_GOOGLE_MAPS_API_KEY=your_api_key_here
```

Then run the dev server:

```bash
npm run dev
```

### Backend Setup

```bash
cd apps/server
pip install -r requirements.txt
```

Add your Google Maps API key to a `.env` file:

```env
VITE_GOOGLE_MAPS_API_KEY=your_api_key_here
```

Run the route analysis:

```bash
python main.py
```

---

## 🛠️ Tech Stack

| Layer    | Technology                                                    |
| -------- | ------------------------------------------------------------- |
| Frontend | React 19, TypeScript, Vite, Tailwind CSS, MUI                 |
| Maps     | Google Maps (React wrapper), Leaflet (server-side viz)        |
| Backend  | Python, `googlemaps`, `requests`                              |
| Data     | OpenStreetMap via Overpass API, Nominatim (reverse geocoding) |

---

## 👥 Team

Built during a hackathon under the theme "Invisible struggles of a person"
