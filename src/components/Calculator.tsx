import { useEffect, useState } from "react";
import SunCalc from "suncalc";
import tzLookup from "tz-lookup";
const { DateTime } = require("luxon");
/**
 * Function for calculating the sunrise and sunset times of given latitude (props.latitude) and longitude (props.longitude).
 */
export default function Calculator(props: any) {
  /**
   * Returns the next date.
   * @param date Date to be added onto.
   * @returns next date of @argument date
   */
  const addDay = function (date: Date) {
    var cloneDate = new Date(date);
    cloneDate.setDate(cloneDate.getDate() + 1);
    return cloneDate;
  };
  /**
   * Gets list of dates between two edge dates.
   * @param startDate Dates from.
   * @param stopDate Dates to.
   * @returns List of dates including: date from, dates inbetween, date to.
   */
  const getDates = (startDate: Date, stopDate: Date) => {
    var dateArray = [];
    var currentDate = startDate;
    while (currentDate <= stopDate) {
      dateArray.push(new Date(currentDate));
      currentDate = addDay(currentDate);
    }
    return dateArray;
  };
  /**
   * Calculates the sunrise and sunset times using helper functions, designed to run when props change.
   * @returns Either an array of sunriseSunsetObj if the user selected range of days, or single object if single day.
   */
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

  /**
   * Calculates the sunrise and sunset time of latitude and longitude, and then calculates that time into that lat/long's local timezone.
   * Source: https://tech.beyondtracks.com/posts/sun-times/
   * @param dateObj Certain date that we need sunrise and sunset times of.
   * @returns Array of objects that include: the original date, sunrise time, sunset time.
   */
  const sunriseSunsetObj = (dateObj: Date) => {
    try {
      const tzB = tzLookup(props.lat, props.long); // Get timezone of lat/long.
      const timeAtB = DateTime.fromISO(dateObj.toISOString(), {
        // Get time at timezone location on current dateObj.
        zone: tzB,
      });
      const suntimesAtB_in_tzA = SunCalc.getTimes(
        // get sunrise, sunset (calculates these in user timezone (not the one above))
        new Date(timeAtB.toJSDate()),
        props.lat,
        props.long
      );
      const sunriseAtB_in_tzB = DateTime.fromISO(
        // get sunrise in local timezone.
        suntimesAtB_in_tzA.sunrise.toISOString(),
        { zone: tzB }
      );
      const sunsetAtB_in_tzB = DateTime.fromISO(
        // get sunset in local timezone.
        suntimesAtB_in_tzA.sunset.toISOString(),
        { zone: tzB }
      );
      return {
        // Return object with original dateObject and sunrise and sunset times in local timezone.
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
    // recalculate on props change.
    setSolarObj(calculateLocal());
    props.getData(calcAllLengthOfDays());
  }, [props.date, props.lat, props.long]);

  /**
   * Calculate length of day with for loop if original state aas an array, otherwise just once.
   */
  const calcAllLengthOfDays = () => {
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

  /**
   * Get length of sunriseSunsetObj day.
   */
  const calcLengthOfDay = (sunriseSunsetObj: any) => {
    const diff =
      sunriseSunsetObj.sunset.valueOf() - sunriseSunsetObj.sunrise.valueOf();

    const seconds = Math.floor((diff / 1000) % 60),
      minutes = Math.floor((diff / (1000 * 60)) % 60),
      hours = Math.floor((diff / (1000 * 60 * 60)) % 24),
      comparison = diff / (1000 * 60 * 60);

    const newDate = formatDate(sunriseSunsetObj.date);

    const output = {
      date: newDate, // used when displaying single day.
      seconds: seconds,
      minutes: minutes,
      hours: hours,
      comparison: comparison, // used in graph
    };

    return output;
  };

  /**
   * Format date to have weekday, day of month, year and seperate these by spaces.
   */
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
  /**
   * Format date to just have time in HH:MM:SS.
   */
  const formatTime = (date: Date) => {
    const dateString = date.toString().split(" ");
    return dateString.slice(4, 5);
  };

  /**
   * Get length of days if original input was array. Get Sunrise, sunset and length of day and return div if single day.
   */
  const printAll = (input: any) => {
    if (input instanceof Array) {
      // Input is array.
      const output: any[] = [];
      input.forEach((inputLine: any) => {
        output.push(print(inputLine));
      });
      return output;
    } else {
      // Input is single day.
      const sol: any = solarObj;
      if (sol) {
        const sunrise = formatTime(new Date(sol.sunrise));
        const sunset = formatTime(new Date(sol.sunset));
        if (sunrise && sunset) {
          return (
            <div>
              <p>Sun will rise at (local time): {sunrise}</p>
              <p>Sun will set at (local time): {sunset}</p>
              <p>The length of day on {print(input)}</p>
            </div>
          );
        }
      } else {
        return (
          <div>
            <p>{print(input)}</p>
          </div>
        );
      }
    }
  };
  /**
   * Format time to have HH hours, MM minutes and SS seconds.
   */
  const print = (output: any) => {
    return (
      formatDate(output.date) +
      ": " +
      output.hours +
      " hours, " +
      output.minutes +
      " minutes and " +
      output.seconds +
      " seconds."
    ).toString();
  };

  const elements = printAll(calcAllLengthOfDays());

  let items: any = [];
  if (elements instanceof Array) {
    for (const [index, value] of elements.entries()) {
      items.push(<li key={index}>{value}</li>);
    }
  } else {
    items = elements;
  }
  return <div>{items}</div>;
}
