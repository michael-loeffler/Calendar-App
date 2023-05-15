import React, { useMemo, useState, useCallback, useEffect } from "react";
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { Calendar, Views, dayjsLocalizer } from 'react-big-calendar';
import dayjs from 'dayjs';
import timezone from 'dayjs/plugin/timezone';
import advancedFormat from 'dayjs/plugin/advancedFormat';
import utc from 'dayjs/plugin/utc';
import CreateEvent from './CreateEvent';
import EventDetails from './EventDetails';
// import seedEvents from './components/SeedEvents';
import '../index.css';
import { useQuery } from "@apollo/client";
import { QUERY_EVENTS } from '../utils/queries';
import Auth from '../utils/auth';
import withDragAndDrop from 'react-big-calendar/lib/addons/dragAndDrop';
import 'react-big-calendar/lib/addons/dragAndDrop/styles.css'
import { useMutation } from '@apollo/client'
import { UPDATE_EVENT } from '../utils/mutations'
import '../index'

const DragAndDropCalendar = withDragAndDrop(Calendar);

dayjs.extend(timezone);
dayjs.extend(advancedFormat);
dayjs.extend(utc);
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
    const eventPropGetter = useCallback(
        (event, start, end) => ({
          ...(event.color === "lightgreen" && {
            style: {
              backgroundColor: 'lightgreen',
              border: '2px solid darkgreen',
              color: 'white',
              fontWeight: 'bold',
              fontSize: '16px',
            },
          }),
          ...(event.color === "lightblue" && {
            style: {
              backgroundColor: 'lightblue',
              border: '2px solid darkblue',
              color: 'white',
              fontWeight: 'bold',
              fontSize: '16px',
            },
          }),
          ...(event.color === "lightpink" && {
            style: {
              backgroundColor: 'lightpink',
              border: '2px solid darkred',
              color: 'white',
              fontWeight: 'bold',
              fontSize: '16px',
            },
          }),
          ...(event.color === "lightsalmon" && {
            style: {
              backgroundColor: 'lightsalmon',
              border: '2px solid darkred',
              color: 'white',
              fontWeight: 'bold',
              fontSize: '16px',
            },
          }),
          ...(event.color === "lightcoral" && {
            style: {
              backgroundColor: 'lightcoral',
              border: '2px solid darkred',
              color: 'white',
              fontWeight: 'bold',
              fontSize: '16px',
            },
          }),
          ...(event.color === "lightslategrey" && {
            style: {
              backgroundColor: 'lightslategrey',
              border: '2px solid black',
              color: 'white',
              fontWeight: 'bold',
              fontSize: '16px',
            },
          }),
        }),
        []
      );
        
    let email = '';

    if (Auth.loggedIn()) {
        const user = Auth.getProfile()
        email = user.data.email;
    }

    const [events, setEvents] = useState([]);
    const { data, refetch } = useQuery(QUERY_EVENTS, {
        variables: { email: email },
    });

    useEffect(() => {
        if (data && data.getEvents) {
            setEvents(data.getEvents.events)
        }
    }, [data])

    const [dragStart, setDragStart] = useState();
    const [dragEnd, setDragEnd] = useState();
    const [showModal, setShowModal] = useState();
    const [selectedEvent, setSelectedEvent] = useState({});
    const [showDetails, setShowDetails] = useState();
    const [eventDetailsEvent, setEventDetailsEvent] = useState({});
    const [formType, setFormType] = useState(); 
    const formatDate = (date) => dayjs.utc(date).local().format().slice(0, 19)

    const handleSelectSlot = useCallback(
        ({ start, end }) => {
            start = formatDate(start);
            end = formatDate(end);
            console.log(end);
            setDragStart(start);
            setDragEnd(end);
            setShowModal(true);
        }, []
    );

    const [updateEvent] = useMutation(UPDATE_EVENT)
    const moveEvent = useCallback(
        async ({ event, start, end, isAllDay: droppedOnAllDaySlot = false }) => {
            const { allDay } = event;
            if (!allDay && droppedOnAllDaySlot) {
                event.allDay = true;
            }
            try {
                start = formatDate(start);
                end = formatDate(end);
                const response = await updateEvent({ variables: { eventId: event._id, ...event, start: start, end: end } });
                console.log('response: ', response);
                refetch();
            } catch (error) {
                console.error(error);
            }

        }, []
    );

    const resizeEvent = useCallback(
        async ({ event, start, end }) => {
            try {
                start = formatDate(start);
                end = formatDate(end);
                const response = await updateEvent({ variables: { eventId: event._id, ...event, start: start, end: end } });
                console.log('response: ', response);
                refetch();
            } catch (error) {
                console.error(error);
            }
        },
        []
    )

    const handleSelectEvent = useCallback(
        (event) => {
            setSelectedEvent(event)
            setShowDetails(true);
        }, []
    );

    const passEventToUpdateForm = (event) => {
        setEventDetailsEvent(event);
        setShowDetails(false);
        setShowModal(true);
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
                showModal={showModal}
                toggleModal={toggleModal}
                dragStart={dragStart}
                dragEnd={dragEnd}
                eventDetailsEvent={eventDetailsEvent}
                setEventDetailsEvent={setEventDetailsEvent}
                formatDate={formatDate}
                formType={formType}
                setFormType={setFormType}
            />
            <EventDetails
                //   onEventDetail={handleEventDetail}
                showDetails={showDetails}
                toggleDetails={toggleDetails}
                selectedEvent={selectedEvent}
                passEventToUpdateForm={passEventToUpdateForm}
                formatDate={formatDate}
                refetch={refetch}
                setFormType={setFormType}
            />
            <DragAndDropCalendar
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
                startAccessor={(event) => { return new Date(event.start) }}
                endAccessor={(event) => { return new Date(event.end) }}
                onEventDrop={moveEvent}
                onEventResize={resizeEvent}
                eventPropGetter={eventPropGetter}
            />
        </div>
    )
}



export default CalendarContainer;
