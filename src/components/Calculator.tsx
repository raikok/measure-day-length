import { useEffect, useState } from "react";
import SunCalc from "suncalc";
import tzLookup from "tz-lookup";
const { DateTime } = require("luxon");

export default function Calculator(props: any) {
  const addDay = function (date: Date) {
    var cloneDate = new Date(date);
    cloneDate.setDate(cloneDate.getDate() + 1);
    return cloneDate;
  };

  const getDates = (startDate: Date, stopDate: Date) => {
    var dateArray = [];
    var currentDate = startDate;
    while (currentDate <= stopDate) {
      dateArray.push(new Date(currentDate));
      currentDate = addDay(currentDate);
    }
    return dateArray;
  };

  const calculateLocal = () => {
    if (props.date instanceof Array) {
      const dateArray = getDates(props.date[0], props.date[1]);
      const output: any[] = [];
      dateArray.forEach((dateObj: Date) => {
        output.push(sunriseSunsetObj(dateObj));
      });
      return output;
    } else {
      return sunriseSunsetObj(props.date);
    }
  };

  const sunriseSunsetObj = (dateObj: Date) => {
    try {
      const tzB = tzLookup(props.lat, props.long);
      const currentTimeAtB = DateTime.fromISO(dateObj.toISOString(), {
        zone: tzB,
      });
      const suntimesAtB_in_tzA = SunCalc.getTimes(
        new Date(currentTimeAtB.toJSDate()),
        props.lat,
        props.long
      );
      const sunriseAtB_in_tzB = DateTime.fromISO(
        suntimesAtB_in_tzA.sunrise.toISOString(),
        { zone: tzB }
      );
      const sunsetAtB_in_tzB = DateTime.fromISO(
        suntimesAtB_in_tzA.sunset.toISOString(),
        { zone: tzB }
      );
      return {
        date: dateObj,
        sunrise: sunriseAtB_in_tzB,
        sunset: sunsetAtB_in_tzB,
      };
    } catch (err) {
      alert("Invalid coordinates!");
      return null;
    }
  };

  const [solarObj, setSolarObj] = useState(calculateLocal());

  useEffect(() => {
    setSolarObj(calculateLocal());
    props.getData(calcAllLengthOfDays());
  }, [props.date, props.lat, props.long]);

  const calcAllLengthOfDays = () => {
    console.log(solarObj instanceof Array);
    if (solarObj instanceof Array) {
      const output: Object[] = [];
      solarObj.forEach((sunriseSunsetObj: any) => {
        output.push(calcLengthOfDay(sunriseSunsetObj));
      });
      return output;
    } else {
      return calcLengthOfDay(solarObj);
    }
  };

  const calcLengthOfDay = (sunriseSunsetObj: any) => {
    const diff =
      sunriseSunsetObj.sunset.valueOf() - sunriseSunsetObj.sunrise.valueOf();

    const seconds = Math.floor((diff / 1000) % 60),
      minutes = Math.floor((diff / (1000 * 60)) % 60),
      hours = Math.floor((diff / (1000 * 60 * 60)) % 24),
      comparison = diff / (1000 * 60 * 60);

    const newDate = formatDate(sunriseSunsetObj.date);

    const output = {
      date: newDate,
      seconds: seconds,
      minutes: minutes,
      hours: hours,
      comparison: comparison,
    };

    return output;
  };

  const formatDate = (date: Date) => {
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

  /*const elements = printAll(calcAllLengthOfDays());


  let items: any = [];
  if (elements instanceof Array) {
    for (const [index, value] of elements.entries()) {
      items.push(<li key={index}>{value}</li>);
    }
  } else {
    items = elements;
  }*/
  return null;
}
