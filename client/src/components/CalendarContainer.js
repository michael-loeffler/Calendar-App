import React, { useMemo, useState, useCallback } from "react";
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { Calendar, Views, dayjsLocalizer } from 'react-big-calendar';
import dayjs from 'dayjs';
import timezone from 'dayjs/plugin/timezone';
import CreateEvent from './CreateEvent';
// import EventDetails from './EventDetails';
// import seedEvents from './components/SeedEvents';
import '../index.css';
import { useQuery } from "@apollo/react-hooks";
import { QUERY_EVENTS } from '../utils/queries';
const email = 'michael@test.com'
dayjs.extend(timezone);
const localizer = dayjsLocalizer(dayjs);

const ColoredDateCellWrapper = ({ children }) =>
    React.cloneElement(React.Children.only(children), {
        style: {
            backgroundColor: 'lightblue',
            cursor: 'pointer',
        },
    });

function CalendarContainer({ ...props }) {
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

    const { data } = useQuery(QUERY_EVENTS, {
        variables: { email: email },
    });
    console.log(data);
    const [events, setEvents] = useState(data?.getEvents.events || []);
    const [start, setStart] = useState();
    const [end, setEnd] = useState();

    // const [events, setEvents] = useState();
    const [showModal, setShowModal] = useState(false);
    // const [startDate, setStartDate] = useState(null);

    const handleSelectSlot = useCallback(
        ({ start, end }) => {
            setStart(start);
            setEnd(end);
            setShowModal(true);

            // trigger NewEventForm modal and pre-populate start and end time
        }, [setStart, setEnd]
    );

    const handleSelectEvent = useCallback(
        (event) => window.alert(event.title),
        // trigger EventDetails modal (haven't discussed yet)
        []
    );

    const handleCreateEvent = (event) => {
        setEvents([...events, event]);
        setShowModal(false);
    };

    const handleClose = () => {
        setShowModal(false);
    };

    return (
        <div className="mt-2" {...props}>
            <CreateEvent
                onCreateEvent={handleCreateEvent}
                isOpen={showModal}
                onClose={handleClose}
                // defaultStartDate={startDate}
                start={start}
                end={end}
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

export default CalendarContainer;
