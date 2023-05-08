import React, { useMemo, useState } from "react";
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { Calendar, Views, dayjsLocalizer } from 'react-big-calendar';
import dayjs from 'dayjs';
import timezone from 'dayjs/plugin/timezone';

dayjs.extend(timezone);
const localizer = dayjsLocalizer(dayjs);

const ColoredDateCellWrapper = ({ children }) =>
  React.cloneElement(React.Children.only(children), {
    style: {
      backgroundColor: 'lightblue',
    },
  });

function App({...props}) {
  const { components, max, views, formats } = useMemo(
    () => ({
      components: {
        timeSlotWrapper: ColoredDateCellWrapper,
      },
      max: dayjs().endOf('day').subtract(1, 'hours').toDate(),
      views: Object.keys(Views).map((k) => Views[k]),
      formats: {
        dateFormat: (date, culture, localizer) =>
        localizer.format(date, 'D', culture),
      },
    }),
    []
  );
  const [myEvents, setEvents] = useState([])
  const handleSelectSlot = useCallback(
    ({ start, end }) => {
      const title = window.prompt('New Event name')
      if (title) {
        setEvents((prev) => [...prev, { start, end, title }])
      }
      // trigger NewEventForm modal and pre-populate start and end time
    },
    [setEvents]
  )

  const handleSelectEvent = useCallback(
    (event) => window.alert(event.title),
    // trigger EventDetails modal (haven't discussed yet)
    []
  )

  return (
    <div className="mt-2" {...props}>
      <Calendar
        localizer={localizer}
        components={components}
        max={max}
        views={views}
        formats={formats}
        events={myEvents}
        selectable
        onSelectSlot={handleSelectSlot}
        onSelectEvent={handleSelectEvent}
        // defaultView={Views.WEEK}
        // showMultiDayTimes
        // events={events}
        style={{ height: 800 }}
      />
    </div>
  )
}
 
export default App;