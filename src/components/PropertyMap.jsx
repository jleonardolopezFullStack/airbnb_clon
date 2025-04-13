"use client";

import { useEffect, useRef } from "react";
import { Loader } from "@googlemaps/js-api-loader";

export default function PropertyMap() {
  const mapRef = useRef(null);

  useEffect(() => {
    const loader = new Loader({
      apiKey: process.env.NEXT_PUBLIC_GOOGLE_GEOCODING_API_KEY, // reemplaza con tu API key
      version: "weekly",
    });

    loader
      .importLibrary("maps")
      .then(() => {
        if (mapRef.current) {
          new google.maps.Map(mapRef.current, {
            center: { lat: -34.397, lng: 150.644 },
            zoom: 8,
          });
        }
      })
      .catch((e) => {
        console.error("Error al cargar Google Maps:", e);
      });
  }, []);

  return (
    <div>
      <div ref={mapRef} style={{ width: "100%", height: "500px" }} />
    </div>
  );
}

/* import {
  GoogleMap,
  useJsApiLoader,
  Marker,s
  useLoadScript, 
  Circle,
  StandaloneSearchBox,
  LoadScript,
} from "@react-google-maps/api";
import React, { useEffect, useState, useMemo, useRef } from "react";

const PropertyMap = ({ property }) => {
  const [location, setLocation] = useState(null);
  const [error, setError] = useState("");

  console.log(location);

  const containerStyle = {
    width: "100%",
    height: "400px",
  };

  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_GEOCODING_API_KEY,
  });

  useEffect(() => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          });
        },

        (err) => {
          setError(`Error obteniendo ubicación: ${err.message}`);
        }
      );
    } else {
      setError("Geolocalización no está soportada en este navegador.");
    }
  }, []);

  return (
    <div>
      <h2>Ubicación del Usuario</h2>
      {location ? (
        <GoogleMap
          mapContainerStyle={containerStyle}
          center={location}
          zoom={15}
        >
          <Marker position={location} />
        </GoogleMap>
      ) : (
        <p>Obteniendo ubicación...</p>
      )}
    </div>
  );
};

export default PropertyMap;
 */
