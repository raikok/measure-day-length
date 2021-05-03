import { useState } from "react";
import Input from "../components/Input";
import MapHandler from "../components/MapHandler";
import SingleDay from "../components/SingleDay";
import RangeDay from "../components/RangeDay";
import "../Container.css";
import { LatLng } from "leaflet";

/**
 * Main container that contains all the logic for the measure-day-length app.
 */
export default function Container() {
  const [latitude, setLatitude] = useState(58.36517);
  const [longitude, setLongitude] = useState(26.74113);
  const [calendar, setCalendar] = useState(false);
  const [map, setMap] = useState(true);
  const [singleDay, selectSingleDay] = useState("");

  const toggleCalendar = () => {
    // button toggle for Calendar (and graph) display. Toggles Map off.
    setCalendar(!calendar);
    if (!calendar) {
      setMap(false);
    }
  };

  const toggleMap = () => {
    // button toggle for Map display. Toggles Calendar off.
    setMap(!map);
    if (!map) {
      setCalendar(false);
    }
  };

  const toggleSingleDay = () => { // I'm using "a" and "b" as values, because you can't use numeric values in CSS (so as to when one is selected) and because I have more values than 2 (can't use boolean).
    selectSingleDay("a");
  };

  const toggleRangeDay = () => { // Info at #L29
    selectSingleDay("b");
  };

  const getLatitude = (latitude: any) => {
    // callback function for Input component
    if (latitude == "-" || latitude == "-0") {
      //make-shift error handling, DEFINATELY not the best solution, todo do actual input validation
      setLatitude(-0);
    } else {
      setLatitude(latitude);
    }
  };

  const getLongitude = (longitude: any) => {
    // callback function for Input component
    if (longitude == "-" || longitude == "-0") {
      // same todo as above
      setLongitude(-0);
    } else {
      setLongitude(longitude);
    }
  };

  const getCoords = (coordinates: LatLng) => {
    // Callback function for Map marker (if the marker gets moved, then it also updates the input boxes).
    getLatitude(coordinates.lat);
    getLongitude(coordinates.lng);
  };

  return (
    <div className="container">
      <div className="header">
        <div className={"button calendar " + calendar}>
          <div className="modal-close calendar" onClick={toggleCalendar}></div>
          <div className="dropdown calendar">
            <div className="header buttons">
              <div className={"button singleDay " + singleDay}>
                <div
                  className="modal-close singleDay"
                  onClick={toggleSingleDay}
                ></div>
                Single Day
              </div>
              <div className={"button rangeDay " + singleDay}>
                <div
                  className="modal-close rangeDay"
                  onClick={toggleRangeDay}
                ></div>
                Day Range
              </div>
            </div>
            <SingleDay
              show={singleDay === "a"}
              latitude={latitude}
              longitude={longitude}
            ></SingleDay>
            <RangeDay
              show={singleDay === "b"}
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
