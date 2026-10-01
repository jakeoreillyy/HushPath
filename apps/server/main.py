import os

from dotenv import load_dotenv
import requests
from collections import defaultdict
import time
import googlemaps

load_dotenv()

# Get the API key
API_KEY = os.getenv("VITE_GOOGLE_MAPS_API_KEY")
gmaps = googlemaps.Client(key=API_KEY)



# Sets the API boundary from Grafton street to Grangegorman
query = """
[out:json];
(
  node["shop"](53.3390,-6.2850,53.3580,-6.2450);
  node["amenity"~"restaurant|bar|cafe|pub"](53.3390,-6.2850,53.3580,-6.2450);
  node["tourism"](53.3390,-6.2850,53.3580,-6.2450);
);
out body;
"""

# Creating location end point
response = requests.get(
    url="https://overpass-api.de/api/interpreter", params={"data": query}
)

data = response.json()

elements = data["elements"]
print(f"Number of POIs found: {len(elements)}")

# 0.001 = 80m
GRID_SIZE = 0.001
density = defaultdict(int)

# Group the POI and density of the cell
for el in elements:
    lat = round(el["lat"] / GRID_SIZE) * GRID_SIZE
    lon = round(el["lon"] / GRID_SIZE) * GRID_SIZE
    density[(lat, lon)] += 1


# End point for reverse geocoding
def reverse_geocode(lat, lon):
    headers = {"User-Agent": "HushPath/1.0"}
    params = {"lat": lat, "lon": lon, "format": "json"}
    res = requests.get(
        url="https://nominatim.openstreetmap.org/reverse", params=params, headers=headers
    )

    data = res.json()

    return (
        data.get("address", {}).get("road") or
        data.get("address", {}).get("suburb") or
        data.get("address", {}).get("city_district") or
        data.get("display_name", "Unknown")        
    )


# sort it based on most dense
sorted_cells = sorted(density.items(), key=lambda x: x[1], reverse=True)

for cell, count in sorted_cells[:10]:
    lat, lon = cell
    location = reverse_geocode(lat, lon)
    print(f"{location} - {count} POIs")
    time.sleep(1)



# Sort cells by density, ascending for least dense areas
sorted_cells_ascending = sorted(density.items(), key=lambda x: x[1])

# Take the top 1 least dense cell as a "waypoint"
least_dense_cell = sorted_cells_ascending[0][0]  # (lat, lon)


origin = "Kings Building, May Lane Dublin D07 A0TN"           # replace with actual address
destination = "Technological University Dublin, Grangegorman, Dublin D07"

# Format waypoint for Google Maps (lat,lng)
waypoint = f"{least_dense_cell[0]},{least_dense_cell[1]}"


directions = gmaps.directions(
    origin,
    destination,
    mode="walking",        # or driving/bicycling/transit
    waypoints=[waypoint],  # pass the least dense cell as a waypoint
    optimize_waypoints=False
)


