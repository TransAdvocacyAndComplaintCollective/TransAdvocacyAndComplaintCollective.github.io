import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import ical from "cal-parser";
import { useState,useEffect } from "react";
const localizer = momentLocalizer(moment);

export const Calendar_local = (props) => {
  const [myEventsList, setMyEventsList] = useState(null);
  useEffect(() => {
    console.log("Calendar_local");
    console.log("props", props);
    const parsed = ical.parseString()
    setMyEventsList(parsed);
  });
  return (
    <div>
      <Calendar
        localizer={localizer}
        events={myEventsList}
        startAccessor="start"
        endAccessor="end"
        style={{ height: 500 }}
      />
    </div>
  );
};
