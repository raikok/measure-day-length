import { useState, useReducer } from "react";
import GraphHandler from "../components/GraphHandler";
import Calculator from "../components/Calculator";
import DateRangePicker from "@wojtekmaj/react-daterange-picker";
/**
 * Component to house a calendar for picking a date range, a graph to display length of day info and Calculator object to display info about each day length.
 */
export default function RangeDay(props: any) {
  const [date, setDate] = useState([new Date(), new Date()]);
  const [dayLengthArray, setDayLengthArray] = useState([{}]);

  const setLengths = (input: {}[]) => {
    // Callback function for calculator, sets day length array for GraphHandler displaying.
    setDayLengthArray(input);
  };

  if (props.show) {
    return (
      <div>
        <DateRangePicker onChange={setDate} value={date} />

        <GraphHandler
          dayLengthArray={dayLengthArray}
          latitude={props.latitude}
          longitude={props.longitude}
        />

        <Calculator
          className="calculator"
          date={date}
          lat={props.latitude}
          long={props.longitude}
          getData={setLengths}
        />
      </div>
    );
  } else {
    return null;
  }
}
