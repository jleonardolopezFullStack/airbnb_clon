"use client";

import {
  GoogleMap,
  useJsApiLoader,
  Marker,
  useLoadScript,
  Circle,
  StandaloneSearchBox,
  LoadScript,
} from "@react-google-maps/api";
import React, { useEffect, useState, useMemo, useRef } from "react";

const PropertyMap = ({
  /* { radius, setLatitude, Style, address, setAddress, latitude, longitude, setLongitude } = */ property,
}) => {
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
  /* 
  const [lat, setLat] = useState(null);
  const [lng, setLng] = useState(null);
  const [viewpoer, setViewpoer] = useState({
    latitude: 0,
    longitude: 0,
    zoom: 12,
    width: "100%",
    height: "500px",
  });
  const [loading, setLoading] = useState(true);
  const [geocodeError, setGeocodeError] = useState(false); 

  const [map, setMap] = useState(null);
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_GEOCODING_API_KEY,
    libraries: ["places"],
  });

  const center = useMemo(
    () => ({ lat: latitude, lng: longitude }),
    [latitude, longitude]
  );

  const changeCoordinate = (coord, index) => {
    const { latlng } = coord;
    const lat = latLng.lat();
    const lng = latLng.lng();
    setlatitude(lat);
    setLongitude(lng);
  };

  useEffect(() => {
    map?.panTo({ lat: latitude, lng: longitude });
  }, [latitude, longitude]);

  /*   useEffect(() => {
    const fetchCoords = async () => {
      try {
        const res = await fromAddress(
          `${property.location.street} ${property.location.city} ${property.location.state} ${property.location.zipcode}`
        );

        // Check geocode results
        if (res.results.length === 0) {
          setGeocodeError(true);
          return;
        }
        const { lat, lng } = res.results[0].geometry.location;
        console.log(lat, lng);
      } catch (error) {
        console.log(error);
        setGeocodeError(true);
      } finally {
        setLoading(false);
      }
    };
  }, []); */

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
