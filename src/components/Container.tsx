import { useState } from "react";
import Input from "../components/Input";
import MapHandler from "../components/MapHandler";
import SingleDay from "../components/SingleDay";
import RangeDay from "../components/RangeDay";
import "../Container.css";
import { LatLng } from "leaflet";

export default function Container() {
  const [latitude, setLatitude] = useState(58.36517);
  const [longitude, setLongitude] = useState(26.74113);
  const [calendar, setCalendar] = useState(false);
  const [map, setMap] = useState(false);

  const toggleCalendar = () => {
    setCalendar(!calendar);
  };

  const stopPropagation = (e: any) => {
    e.stopPropagation();
  };

  const toggleMap = () => {
    setMap(!map);
  };

  const getLatitude = (latitude: any) => {
    if (latitude == "-" || latitude == "-0") {
      setLatitude(-0);
    } else {
      setLatitude(latitude);
    }
  };

  const getLongitude = (longitude: any) => {
    if (longitude == "-" || longitude == "-0") {
        setLongitude(-0);
      } else {
        setLongitude(longitude);
      }
  };

  const getCoords = (coordinates: LatLng) => {
    getLatitude(coordinates.lat);
    getLongitude(coordinates.lng);
  };

  return (
    <div className="container">
      <div className="header">
        <div className={"button calendar " + calendar}>
          <div className="modal-close calendar" onClick={toggleCalendar}></div>
          <div className="dropdown calendar">
            <SingleDay
              onClick={stopPropagation}
              show={false}
              latitude={latitude}
              longitude={longitude}
            ></SingleDay>
            <RangeDay
              onClick={stopPropagation}
              show={true}
              latitude={latitude}
              longitude={longitude}
            ></RangeDay>
          </div>
          Calendar
        </div>
        <Input
          className="input latitude"
          title={"Latitude"}
          value={latitude}
          getData={getLatitude}
        ></Input>
        <Input
          className="input longitude"
          title={"Longitude"}
          value={longitude}
          getData={getLongitude}
        ></Input>
        <div className={"button map " + map}>
          <div className="modal-close map" onClick={toggleMap}></div>
          <div className="dropdown map">
            <MapHandler
              map={map}
              getCoords={getCoords}
              latitude={latitude}
              longitude={longitude}
            />
          </div>
          Map
        </div>
      </div>
    </div>
  );
}
