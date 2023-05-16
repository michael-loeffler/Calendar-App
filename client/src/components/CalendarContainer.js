import React, { useMemo, useState, useCallback, useEffect } from 'react';
import { Calendar, Views, dayjsLocalizer } from 'react-big-calendar';
import withDragAndDrop from 'react-big-calendar/lib/addons/dragAndDrop';
import Modal from 'react-modal';

import 'react-big-calendar/lib/css/react-big-calendar.css';
import 'react-big-calendar/lib/addons/dragAndDrop/styles.css';
import '../index.css';

import dayjs from 'dayjs';
import timezone from 'dayjs/plugin/timezone';
import advancedFormat from 'dayjs/plugin/advancedFormat';
import utc from 'dayjs/plugin/utc';

import CreateEvent from './CreateEvent';
import EventDetails from './EventDetails';
import Auth from '../utils/auth';

import { useQuery } from '@apollo/client';
import { QUERY_EVENTS } from '../utils/queries';
import { useMutation } from '@apollo/client'
import { UPDATE_EVENT } from '../utils/mutations'

Modal.setAppElement('#root');

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

// ----- MAIN CONTAINER COMPONENT ----- //
function CalendarContainer({ ...props }) {
    const { components, views, formats } = useMemo(
        () => ({
            components: {
                timeSlotWrapper: ColoredDateCellWrapper,
            },
            views: Object.keys(Views).map((k) => Views[k]),
            // all date display formatting across app
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
        // this is the function we use to change the color of events
        (event) => ({
            ...(event.color === 'lightgreen' && {
                style: {
                    backgroundColor: 'lightgreen',
                    border: '2px solid darkgreen',
                    color: 'white',
                    fontWeight: 'bold',
                    fontSize: '16px',
                },
            }),
            ...(event.color === 'lightblue' && {
                style: {
                    backgroundColor: 'lightblue',
                    border: '2px solid darkblue',
                    color: 'white',
                    fontWeight: 'bold',
                    fontSize: '16px',
                },
            }),
            ...(event.color === 'lightpink' && {
                style: {
                    backgroundColor: 'lightpink',
                    border: '2px solid darkred',
                    color: 'white',
                    fontWeight: 'bold',
                    fontSize: '16px',
                },
            }),
            ...(event.color === 'lightsalmon' && {
                style: {
                    backgroundColor: 'lightsalmon',
                    border: '2px solid darkred',
                    color: 'white',
                    fontWeight: 'bold',
                    fontSize: '16px',
                },
            }),
            ...(event.color === 'lightcoral' && {
                style: {
                    backgroundColor: 'lightcoral',
                    border: '2px solid darkred',
                    color: 'white',
                    fontWeight: 'bold',
                    fontSize: '16px',
                },
            }),
            ...(event.color === 'lightslategrey' && {
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

    // This section pulls the logged in user's email address from their token
    let email = '';
    const loggedIn = Auth.loggedIn();
    if (loggedIn) {
        const user = Auth.getProfile();
        email = user.data.email;
    }

    // This section is where we set the main events prop for the calendar by using the data stored in the database. This is accessed through a query.
    const [events, setEvents] = useState([]);
    const { data, refetch } = useQuery(QUERY_EVENTS, {
        variables: { email: email },
    });

    useEffect(() => {
        if (data && data.getEvents) {
            setEvents(data.getEvents.events)
        }
    }, [data]);

    // Initialization of all state variables
    const [dragStart, setDragStart] = useState();
    const [dragEnd, setDragEnd] = useState();
    const [showModal, setShowModal] = useState();
    const [selectedEvent, setSelectedEvent] = useState({});
    const [showDetails, setShowDetails] = useState();
    const [eventDetailsEvent, setEventDetailsEvent] = useState({});
    const [formType, setFormType] = useState();
    const [errorLogin, setErrorLogin] = useState(true);

    // This function gets the accurate time for the user's local timezone and slices off the timezone offset from the date string
    const formatDate = (date) => dayjs.utc(date).local().format().slice(0, 19);

    // This function pulls the start and end time when a user uses the drag feature to trigger the create event modal. Dates are reformatted before they are sent to the Modal so that they prepopulate properly.
    const handleSelectSlot = useCallback(
        ({ start, end }) => {
            start = formatDate(start);
            end = formatDate(end);
            setDragStart(start);
            setDragEnd(end);
            setShowModal(true);
        }, []
    );

    const [updateEvent] = useMutation(UPDATE_EVENT);

    // This function is called when a user picks up an event and moves it. The event itself, and its new start and end time are accessed and then the updateEvent mutation is called to update the entry in the database.
    const moveEvent = useCallback(
        async ({ event, start, end, isAllDay: droppedOnAllDaySlot = false }) => {
            const { allDay } = event;
            if (!allDay && droppedOnAllDaySlot) {
                event.allDay = true; // future code in place for changing the allDay key when an event is dragged onto an allDay slot
            }
            try {
                start = formatDate(start);
                end = formatDate(end);
                await updateEvent({ variables: { eventId: event._id, ...event, start: start, end: end } });
                refetch(); // refetch is called so that the database is queried again to get the freshest data
            } catch (error) {
                console.error(error);
            }
        }, [updateEvent, refetch]
    );

    // This function is called when a user resizes an event. The event itself, and its new start and end time are accessed and then the updateEvent mutation is called to update the entry in the database.
    const resizeEvent = useCallback(
        async ({ event, start, end }) => {
            try {
                start = formatDate(start);
                end = formatDate(end);
                await updateEvent({ variables: { eventId: event._id, ...event, start: start, end: end } });
                refetch(); // refetch is called so that the database is queried again to get the freshest data
            } catch (error) {
                console.error(error);
            }
        }, [updateEvent, refetch]
    );

    // This is the function that is called when a user clicks on an event. It stores the event that was clicked on and then toggles on the EventDetails modal
    const handleSelectEvent = useCallback(
        (event) => {
            setSelectedEvent(event);
            setShowDetails(true);
        }, []
    );

    // This function is passed as a prop into the EventDetails component. When a user clicks on the "Edit" button, the event that is displayed on the EventDetails modal is sent to this function, which then reformats the dates and sends that event to the CreateEvent component. It also closes the EventDetails modal and opens the CreateEvent modal.
    const passEventToUpdateForm = (event) => {
        let { start, end } = event;
        start = formatDate(start);
        end = formatDate(end);
        event = { ...event, start: start, end: end };
        setEventDetailsEvent(event);
        setShowDetails(false);
        setShowModal(true);
    };

    // Toggle functions used to open and close the modals
    const toggleModal = () => {
        setShowModal(!showModal)
    };
    const toggleDetails = () => {
        setShowDetails(!showDetails)
    };

    const toggleLoginError = () => {
        setErrorLogin(!errorLogin)
    } 

    return (
        <>
            {loggedIn ? (
                <div className='mt-2' {...props}>
                    <CreateEvent
                        showModal={showModal}
                        toggleModal={toggleModal}
                        dragStart={dragStart}
                        dragEnd={dragEnd}
                        setDragStart={setDragStart}
                        setDragEnd={setDragEnd}
                        eventDetailsEvent={eventDetailsEvent}
                        setEventDetailsEvent={setEventDetailsEvent}
                        formType={formType}
                        setFormType={setFormType}
                        refetch={refetch}
                    />
                    <EventDetails
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
            ) : (
                <Modal
                 isOpen={errorLogin}
                 className="z-50 fixed inset-0 overflow-auto bg-opacity-40 bg-gray-900 flex justify-center items-center max-width-25 max-height-25"
                 overlayClassName="z-40 fixed inset-0 bg-gray-800 bg-opacity-25"
                >
                  <div className="bg-white rounded-lg px-8 py-6"
                  >
                    <div className="mt-1 flex justify-end">
                    <button
                      className="bg-red-400 hover:bg-gray-500 text-white font-semibold rounded-lg py-1 px-3"
                        onClick={() => {
                          toggleLoginError();
                        }}
                    >
                    ✗
                    </button>
                    </div>
                    <h2 className="text-xlg font-semibold mb-4 mt-2"
                    style = {{ color: '#1B9C85' }}
                    >Please log in or sign up to view your Calendar 📅</h2>
                    <div className="flex flex-col gap-2">
                    </div>
                  </div>
               </Modal>
            )
            }
        </>
    )
}



export default CalendarContainer;
