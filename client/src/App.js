import React, { useState, useMemo } from "react";
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { Calendar, Views, dayjsLocalizer } from 'react-big-calendar';
import dayjs from 'dayjs';
import timezone from 'dayjs/plugin/timezone';
import CreateEvent from './components/CreateEvent';
import seedEvents from './components/SeedEvents';
import './index.css';

dayjs.extend(timezone);
const localizer = dayjsLocalizer(dayjs);

const ColoredDateCellWrapper = ({ children }) =>
  React.cloneElement(React.Children.only(children), {
    style: {
      backgroundColor: 'lightblue',
      cursor: 'pointer',
    },
  });

function App({...props}) {
  const [events, setEvents] = useState(seedEvents);
  const [showCreateEventModal, setShowCreateEventModal] = useState(false);
  const [startDate, setStartDate] = useState(null);

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

  const handleSelectSlot = (slotInfo) => {
    setShowCreateEventModal(true);
    setStartDate(slotInfo.start);
  };

  const handleCreateEvent = (event) => {
    setEvents([...events, event]);
    setShowCreateEventModal(false);
    setStartDate(null);
  };

  const handleCloseCreateEventModal = () => {
    setShowCreateEventModal(false);
    setStartDate(null);
  };

  const handleSelectEvent = (event) => {
    console.log('selected event:', event);
  };

  return (
    <div className="mt-2" {...props}>
      <CreateEvent
        onCreateEvent={handleCreateEvent}
        isOpen={showCreateEventModal}
        onClose={handleCloseCreateEventModal}
        defaultStartDate={startDate}
      />
      <Calendar
        localizer={localizer}
        components={components}
        max={max}
        views={views}
        formats={formats}
        events={events}
        style={{ height: 800 }}
        selectable
        onSelectEvent={handleSelectEvent}
        onSelectSlot={handleSelectSlot}
      />
    </div>
  )
}
 
export default App;