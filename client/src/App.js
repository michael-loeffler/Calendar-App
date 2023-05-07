import React, { useMemo } from "react";
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

  return (
    <div className="mt-2" {...props}>
      <Calendar
        localizer={localizer}
        components={components}
        max={max}
        views={views}
        formats={formats}
        // showMultiDayTimes
        // events={events}
        // events={myEventsList}
        style={{ height: 800 }}
      />
    </div>
  )
}
 
export default App;