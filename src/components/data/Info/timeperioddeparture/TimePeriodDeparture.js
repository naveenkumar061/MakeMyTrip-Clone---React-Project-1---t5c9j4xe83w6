// Exporting an array of time periods for departure categorization
export const timePeriodDeparture = [
  {
    label: "Before 6 AM",
    value: "Early Morning Departures",
    img: "morning_inactive.webp",
    minTime: "00:00",
    maxTime: "06:00",
  },
  {
    label: "6 AM - 12 PM",
    value: "Morning Departures",
    img: "noon_inactive.png",
    minTime: "06:00",
    maxTime: "12:00",
  },
  {
    label: "12 PM - 6 PM",
    value: "Afternoon Departures",
    img: "evening_inactive.png",
    minTime: "12:00",
    maxTime: "18:00",
  },
  {
    label: "After 6 PM",
    value: "Late Departures",
    img: "night_inactive.png",
    minTime: "18:00",
    maxTime: "23:59",
  },
];
