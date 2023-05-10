import React, { useMemo, useState } from "react";
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { Calendar, Views, dayjsLocalizer } from 'react-big-calendar';
import dayjs from 'dayjs';
import timezone from 'dayjs/plugin/timezone';
import CreateEvent from './components/CreateEvent';
import seedEvents from './components/SeedEvents';
import './index.css';
import { ApolloProvider, ApolloClient, InMemoryCache, createHttpLink } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';

dayjs.extend(timezone);
const localizer = dayjsLocalizer(dayjs);

const ColoredDateCellWrapper = ({ children }) =>
  React.cloneElement(React.Children.only(children), {
    style: {
      backgroundColor: 'lightblue',
      cursor: 'pointer',
    },
  });

  // Construct our main GraphQL API endpoint
const httpLink = createHttpLink({
  uri: '/graphql',
});
// Construct request middleware that will attach the JWT token to every request as an `authorization` header
const authLink = setContext((_, { headers }) => {
  // get the authentication token from local storage if it exists
  const token = localStorage.getItem('id_token');
  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    },
  };
});
const client = new ApolloClient({
  // Set up our client to execute the `authLink` middleware prior to making the request to our GraphQL API
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
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

  // const handleSelectSlot = useCallback(
  //   ({ start, end }) => {
  //     const title = window.prompt('New Event name')
  //     if (title) {
  //       setEvents((prev) => [...prev, { start, end, title }])
  //     }
  //     // trigger NewEventForm modal and pre-populate start and end time
  //   },
  //   [setEvents]
  // )

  // const handleSelectEvent = useCallback(
  //   (event) => window.alert(event.title),
  //   // trigger EventDetails modal (haven't discussed yet)
  //   []
  // )

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
    <ApolloProvider client={client}>
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
    </ApolloProvider>
  )
}
 
export default App;
