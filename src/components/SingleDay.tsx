import { useState } from "react";
import DatePicker from "react-date-picker";
import Calculator from "../components/Calculator";
/**
 * Component for displaying information about a single day (sunrise, sunset and length of day). 
 * Includes a date picker for selecting the single day and calculator for displaying the information.
 */
export default function SingleDay(props: any) {
  const [date, setDate] = useState(new Date());

  const setLengths = (input: any) => {};

  const getDate = (date: Date | Date[]) => { // Callback function for DatePicker.
    if (date instanceof Date) {
      setDate(date);
    }
  };

  if (props.show) {
    return (
      <div>
        <DatePicker
          onChange={(value) => getDate(value)}
          value={date}
        ></DatePicker>
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
