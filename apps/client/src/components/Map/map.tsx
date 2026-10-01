import { useState, useEffect } from "react";
import {
  GoogleMap,
  LoadScript,
  DirectionsRenderer,
} from "@react-google-maps/api";

const apiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;

const containerStyle = {
  width: "100%",
  height: "748px",
};

const center = {
  lat: 53.3489,
  lng: -6.2735,
};

// Hardcoded waypoints along the walking route
const ROUTE_PATH = [
  { lat: 53.3478, lng: -6.276 }, // Workday Kings Building
  { lat: 53.3501, lng: -6.2775 },
  { lat: 53.3497, lng: -6.276 },
  //   { lat: 53.3492, lng: -6.2748 },
  //   { lat: 53.3488, lng: -6.274 },
  //   { lat: 53.3483, lng: -6.2733 },
  //   { lat: 53.3479, lng: -6.2725 },
  //   { lat: 53.3475, lng: -6.2718 },
  //   { lat: 53.3471, lng: -6.271 },
  //   { lat: 53.3467, lng: -6.27 },
  { lat: 53.355, lng: -6.2797 }, // TUD Grangegorman
];

export default function Map() {
  const [map, setMap] = useState<google.maps.Map | null>(null);
  const [polyline, setPolyline] = useState<google.maps.Polyline | null>(null);

  function drawRoute(mapInstance: google.maps.Map) {
    // clear previous
    if (polyline) polyline.setMap(null);

    const path = new google.maps.Polyline({
      path: ROUTE_PATH,
      geodesic: true,
      strokeColor: "#1976d2",
      strokeOpacity: 1.0,
      strokeWeight: 5,
    });

    path.setMap(mapInstance);
    setPolyline(path);

    // Add start marker
    new google.maps.Marker({
      position: ROUTE_PATH[0],
      map: mapInstance,
      label: "Workdat office",
      title: "Workday Kings Building",
    });

    // Add end marker
    new google.maps.Marker({
      position: ROUTE_PATH[ROUTE_PATH.length - 1],
      map: mapInstance,
      label: "Grangegorman",
      title: "TUD Grangegorman",
    });
  }

  return (
    <LoadScript googleMapsApiKey={apiKey}>
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={center}
        zoom={15}
        onLoad={(mapInstance) => {
          setMap(mapInstance);
          drawRoute(mapInstance);
        }}
      />
    </LoadScript>
  );
}
