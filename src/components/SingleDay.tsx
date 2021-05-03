import { useState } from "react";
import DatePicker from 'react-date-picker';

export default function SingleDay(props: any) {
  const [date, setDate] = useState(new Date());

  const setLengths = (input: any) => {
  }

  const getDate = (date: Date | Date[]) => {
    if (date instanceof Date) {
      setDate(date);
    }
  };

  /*
          <Calculator
          date={date}
          lat={props.latitude}
          long={props.longitude}
        />
  */

  if (props.show) {
    return (
      <div>
        <DatePicker
          onChange={(value) => getDate(value)}
          value={date}
        ></DatePicker>
      </div>
    );
  } else {
    return null;
  }
}
