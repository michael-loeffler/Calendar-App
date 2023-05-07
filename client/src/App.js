import React, { useMemo } from "react";
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { Calendar, Views, dayjsLocalizer } from 'react-big-calendar';
import dayjs from 'dayjs';
import timezone from 'dayjs/plugin/timezone';

dayjs.extend(timezone);
const localizer = dayjsLocalizer(dayjs);

const localizer = dayjsLocalizer(dayjs)

function App() {

  return (
    <div className="height600">
      <Calendar
        // components={components}
        // defaultDate={defaultDate}
        // events={events}
        localizer={localizer}
        showMultiDayTimes
        step={60}
        // views={views}
        // events={myEventsList}
        startAccessor="start"
        endAccessor="end"
        // style={{ height: 500 }}
      />
    </div>
  )
  

}
 
export default App;