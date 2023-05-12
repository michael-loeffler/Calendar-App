import React, { useMemo, useState, useCallback, useEffect } from "react";
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { Calendar, Views, dayjsLocalizer } from 'react-big-calendar';
import dayjs from 'dayjs';
import timezone from 'dayjs/plugin/timezone';
import advancedFormat from 'dayjs/plugin/advancedFormat'
import CreateEvent from './CreateEvent';
import EventDetails from './EventDetails';
// import seedEvents from './components/SeedEvents';
import '../index.css';
import { useQuery } from "@apollo/client";
import { QUERY_EVENTS } from '../utils/queries';
const email = 'michael@test.com'
dayjs.extend(timezone);
dayjs.extend(advancedFormat);
const localizer = dayjsLocalizer(dayjs);

const ColoredDateCellWrapper = ({ children }) =>
    React.cloneElement(React.Children.only(children), {
        style: {
            backgroundColor: 'white',
        },
    });

function CalendarContainer({ ...props }) {
    const { components, views, formats } = useMemo(
        () => ({
            components: {
                timeSlotWrapper: ColoredDateCellWrapper,
            },
            views: Object.keys(Views).map((k) => Views[k]),
            formats: {
                dateFormat: (date, culture, localizer) =>
                    localizer.format(date, 'D', culture),
                dayFormat: (date, culture, localizer) =>
                    localizer.format(date, 'ddd M/DD', culture),
                dayHeaderFormat: (date, culture, localizer) =>
                    localizer.format(date, 'dddd, MMMM Do', culture),
                dayRangeHeaderFormat: ({ start, end }, culture, localizer) =>
                    localizer.format(start, 'MMMM Do', culture) +
                    ' - ' +
                    localizer.format(end, 'Do', culture),
                eventTimeRangeFormat: ({ start, end }, culture, localizer) =>
                    localizer.format(start, 'h:mm a', culture) +
                    ' - ' +
                    localizer.format(end, 'h:mm a', culture),
                selectRangeFormat: ({ start, end }, culture, localizer) =>
                    localizer.format(start, 'h:mm a', culture) +
                    ' - ' +
                    localizer.format(end, 'h:mm a', culture),
                timeGutterFormat: (date, culture, localizer) =>
                    localizer.format(date, 'h:mm a', culture),
            },
        }),
        []
    );

    const [events, setEvents] = useState([]);
    const { data } = useQuery(QUERY_EVENTS, {
        variables: { email: email },
    });

    useEffect(() => {
        if (data && data.getEvents) {
            setEvents(data.getEvents.events)
        }
    }, [data])

    const [start, setStart] = useState();
    const [end, setEnd] = useState();
    const [showModal, setShowModal] = useState();
    const [selectedEvent, setSelectedEvent] = useState();
    const [showDetails, setShowDetails] =useState();
    const [eventUpdate, setEventUpdate] = useState();

    const handleSelectSlot = useCallback(
        ({ start, end }) => {
                const formatDate = (date) => {
                  const dateAndTime = date.toISOString().split('T');
                  const time = dateAndTime[1].split(':');
                  if (time[0] <= 14) {
                    time[0] = `0${(time[0] - 5).toString()}`;
                  } else if (time[0] === 'late night case') {
                    // need to figure out threshold and also how to adjust date as well
                  } else {
                    time[0] = (time[0] - 5).toString();
                  }
                  return dateAndTime[0]+'T'+time[0]+':'+time[1];
                }
            start = formatDate(start);
            end = formatDate(end);
            setStart(start);
            setEnd(end);
            setShowModal(true);
            // trigger NewEventForm modal and pre-populate start and end time
        }, []
    );

    const handleSelectEvent = useCallback(
         ({event}) => {
            setSelectedEvent(event)
            setShowDetails(true);
        }, [] 
    );

    const handleCreateEvent = (event) => {
        // setEvents([...events, event]);
        setShowModal(false);
    };

    const handleUpdateEvent = (event) => {
        setEventUpdate(event);
        setShowDetails(false);
        setShowModal(true);
    };

    const handleClose = () => {
        setShowModal(false);
    };

    const toggleModal = () => {
        setShowModal(!showModal)
    };   

    const toggleDetails = () => {
        setShowDetails(!showDetails)
    };  

        return (
          <div className="mt-2" {...props}>
            <CreateEvent
                onCreateEvent={handleCreateEvent}
                showModal={showModal}
                onClose={handleClose}
                toggleModal={toggleModal}
                start={start}
                end={end}
                eventUpdate={eventUpdate}
            />
            <EventDetails
            //   onEventDetail={handleEventDetail}
              showDetails={showDetails}
              toggleDetails={toggleDetails}
              selectedEvent={selectedEvent}
              handleUpdateEvent={handleUpdateEvent}
            />
            {/* {loading ? (
                <div>Loading...</div>
            ) : ( */}
                <Calendar
                    localizer={localizer}
                    components={components}
                    views={views}
                    formats={formats}
                    events={events}
                    style={{ height: 800 }}
                    selectable
                    onSelectEvent={handleSelectEvent}
                    onSelectSlot={handleSelectSlot}
                    step={15}
                    timeslots={4}
                />
          </div>
    )
}

export default CalendarContainer;
