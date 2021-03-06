/// <reference types="react-scripts" />

declare module '@wojtekmaj/react-daterange-picker';
declare module 'react-chartjs-2';

interface SunlightTimes {
    sunrise: Date;
    sunriseEnd: Date;
    goldenHourEnd: Date;
    solarNoon: Date;
    goldenHour: Date;
    sunsetStart: Date;
    sunset: Date;
    dusk: Date;
    nauticalDusk: Date;
    night: Date;
    nadir: Date;
    nightEnd: Date;
    nauticalDawn: Date;
    dawn: Date;
  }
  
  interface SunPosition {
    altitude: number;
    azimuth: number;
  }
  
  interface MoonPosition {
    altitude: number;
    azimuth: number;
    distance: number;
    parallacticAngle: number;
  }
  
  interface MoonIllumination {
    fraction: number;
    phase: number;
    angle: number;
  }
  
  interface MoonTimes {
    rise: Date;
    set: Date;
    alwaysUp: boolean;
    alwaysDown: boolean;
  }
  
  declare module 'suncalc' {
    function getTimes(date: Date, latitude: number, longitude: number): SunlightTimes;
    function getPosition(timeAndDate: Date, latitude: number, longitude: number): SunPosition;
    function getMoonPosition(timeAndDate: Date, latitude: number, longitude: number): MoonPosition;
    function getMoonIllumination(timeAndDate: Date): MoonIllumination;
    function getMoonTimes(date: Date, latitude: number, longitude: number, inUTC?: boolean): MoonTimes;
  }