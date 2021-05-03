import { latLng } from "leaflet";
import { useEffect, useState, useRef, useMemo } from "react";
import { MapContainer, TileLayer, useMap, Marker, Popup } from "react-leaflet";

/**
 * Pans map to lat/long input automatically.
 */
const PanToTypedCoord = (props: any) => {
  const map = useMap();
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      // avoid updating map too frequently (on each character typed)
      map.panTo(latLng(props.latitude, props.longitude));
    }, 500);
    return () => clearTimeout(timeoutId);
  }, [map, props.latitude, props.longitude]);
  return null;
};

/**
 * Movable marker that sets the latitude and longitude inputs automatically and vice versa.
 */
const PositionMarker = (props: any) => {
  const [position, setPosition] = useState(
    latLng(props.latitude, props.longitude)
  );
  const markerRef = useRef<any>();
  const eventHandlers = useMemo(
    // Marker sets Latitude and longitude inputs.
    () => ({
      dragend() {
        const marker = markerRef.current;
        if (marker != null) {
          setPosition(marker._latlng);
          props.getCoords(marker._latlng);
        }
      },
    }),
    [props]
  );

  useEffect(() => {
    // Latitude and longitude inputs set marker location.
    const timeoutId = setTimeout(() => {
      // avoid updating map too frequently (on each character typed)
      const marker = markerRef.current;
      if (marker != null) {
        setPosition(latLng(props.latitude, props.longitude));
      }
    }, 500);
    return () => clearTimeout(timeoutId);
  }, [props.latitude, props.longitude]);

  return (
    <Marker
      draggable={true}
      eventHandlers={eventHandlers}
      position={position}
      ref={markerRef}
    >
      <Popup minWidth={90}>
        <span>
          {props.latitude}; {props.longitude}
        </span>
      </Popup>
    </Marker>
  );
};

const ParentMapContainer = (props: any) => {
  return (
    <MapContainer center={[10, 10]} zoom={13} scrollWheelZoom={true}>
      <TileLayer
        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <PanToTypedCoord
        latitude={props.latitude}
        longitude={props.longitude}
      ></PanToTypedCoord>
      <PositionMarker
        getCoords={props.getCoords}
        latitude={props.latitude}
        longitude={props.longitude}
      />
    </MapContainer>
  );
};

export default function MapHandler(props: any) {
  return (
    <ParentMapContainer
      getCoords={props.getCoords}
      latitude={props.latitude}
      longitude={props.longitude}
    />
  );
}
