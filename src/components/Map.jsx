import React, { useEffect, useState } from "react";
import styles from "./Map.module.css";
import { useNavigate } from "react-router-dom";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMap,
  useMapEvents,
} from "react-leaflet";
import { useCities } from "../contexts/CitiesContext";
import { useGeolocation } from "../hooks/useGeolocation";
import Button from "./Button";
import useUrlPosition from "../hooks/useURLPosition";

export default function Map() {
  const { cities } = useCities();
  const [mapPosition, setMapPosition] = useState([40, 0]);
  const {
    isLoading: isLoadingPosition,
    position: positionGeolocation,
    getPosition,
  } = useGeolocation();
  
  const [mopLat,mopLng] = useUrlPosition();

  useEffect(() => {
    if (mopLat && mopLat) setMapPosition([mopLat, mopLng]);
  }, [mopLng, mopLat]);

  useEffect(() => {
    if (positionGeolocation)
      setMapPosition([positionGeolocation.lat, positionGeolocation.lng]);
  }, [positionGeolocation]);

  return (
    <div className={styles.mapContainer}>
     {!positionGeolocation && <Button type="position" onClick={getPosition}>
        {isLoadingPosition ? "Loading..." : " Use Your Position"}
      </Button>}


      <MapContainer
        center={mapPosition}
        zoom={7}
        scrollWheelZoom={true}
        className={styles.map}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png"
        />
        {cities.map((city) => (
          <Marker
            position={[city.position.lat, city.position.lng]}
            key={city.id}
          >
            <Popup>
              <span>{city.emoji}</span> <span>{city.cityName}</span>
            </Popup>
          </Marker>
        ))}
        <ChengeCenter position={mapPosition} />
        <HandelClickMap />
      </MapContainer>
    </div>
  );
}

function ChengeCenter({ position }) {
  const map = useMap();
  map.setView(position);
  return null;
}

function HandelClickMap() {
  const navigate = useNavigate();
  useMapEvents({
    click: (e) => navigate(`form?lat=${e.latlng.lat}&lng=${e.latlng.lng}`),
  });
}
