"use client";
import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import Spinner from "./Spinner";
// import MapComponent from "./MapComponent";
const MapComponent = dynamic(() => import("../components/MapComponent"), {
  ssr: false,
});

const PropertyMap = ({ property }) => {
  const [lat, setLat] = useState(null);
  const [lng, setLng] = useState(null);
  const [viewport, setViewport] = useState({
    latitude: 0,
    longitude: 0,
    zoom: 12,
    width: "100%",
    height: "500px",
  });
  const [loading, setLoading] = useState(true);
  const [geocodeError, setGeocodeError] = useState(false);
  const query = `${property.location.street}, ${property.location.city}, ${property.location.zipcode}`;
  const encodedAddress = encodeURIComponent(query);
  useEffect(() => {
    const fetchCoords = async () => {
      try {
        const res = await fetch(
          `https://api.opencagedata.com/geocode/v1/json?q=${encodedAddress}&key=${process.env.NEXT_PUBLIC_GEOCODING_API_KEY}`
        );
        const data = await res.json();
        // Check geocode results
        if (data.results.length === 0) {
          setGeocodeError(true);
          return;
        }

        const { lat, lng } = data.results[0].geometry;
        setLat(lat);
        setLng(lng);
        setViewport({
          ...viewport,
          latitude: lat,
          longitude: lng,
        });
      } catch (error) {
        console.error(error);
        setGeocodeError(true);
      } finally {
        setLoading(false);
      }
    };

    fetchCoords();
  }, []);

  if (loading) return <Spinner />;

  if (geocodeError)
    return <div className="text-xl">No location data found</div>;

  return (
    <div>
      <MapComponent lat={lat} lng={lng} />
    </div>
  );
};

export default PropertyMap;
