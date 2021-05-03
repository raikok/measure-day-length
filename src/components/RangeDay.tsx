import { useState, useReducer } from "react";
import GraphHandler from "../components/GraphHandler";
import Calculator from "../components/Calculator";
import DateRangePicker from "@wojtekmaj/react-daterange-picker";

export default function SingleDay(props: any) {
  const [date, setDate] = useState([new Date(), new Date()]);
  const [dayLengthArray, setDayLengthArray] = useState([{}]);
  const [, forceUpdate] = useReducer(x => x + 1, 0);

  const setLengths = (input: {}[]) => {
    console.log(input);
    setDayLengthArray(input);
    forceUpdate();
  };

  const formatDate = (date: Date) => {
    if (date) {
      const dateString = date.toString().split(" ");
      return (
        dateString.slice(0, 1) +
        " " +
        dateString.slice(1, 2) +
        " " +
        dateString.slice(2, 3) +
        " " +
        dateString.slice(3, 4)
      );
    }
  };

  const printAll = (input: any) => {
    if (input instanceof Array) {
      const output: any[] = [];
      input.forEach((inputLine: any) => {
        output.push(print(inputLine));
      });
      return output;
    } else {
      return print(input);
    }
  };

  const print = (output: any) => {
    return (
      formatDate(output.date) +
      ": " +
      output.hours +
      " hours, " +
      output.minutes +
      " minutes, " +
      output.seconds +
      " seconds."
    ).toString();
  };

  const elements = printAll(dayLengthArray);

  let items: any = [];
  if (elements instanceof Array) {
    for (const [index, value] of elements.entries()) {
      items.push(<li key={index}>{value}</li>);
    }
  } else {
    items = elements;
  }

  if (props.show) {
    return (
      <div>
        <DateRangePicker onChange={setDate} value={date} />
        <Calculator
          date={date}
          lat={props.latitude}
          long={props.longitude}
          getData={setLengths}
        />
        <GraphHandler
          dayLengthArray={dayLengthArray}
          latitude={props.latitude}
          longitude={props.longitude}
        />
        {items}
      </div>
    );
  } else {
    return null;
  }
}
