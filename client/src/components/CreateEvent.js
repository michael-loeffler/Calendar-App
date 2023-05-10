import React, { useState } from 'react';
// import Modal from 'react-modal';
// import dayjs from 'dayjs';
// import DatePicker from 'react-date-picker';

import { useMutation } from '@apollo/client';
import { ADD_EVENT } from '../utils/mutations';
import { QUERY_EVENTS } from '../utils/queries';
import Auth from '../utils/auth';


// Modal.setAppElement('#root');

const CreateEventForm = () => {
  const [eventText, setEventText] = useState('');
  const [characterCount, setCharacterCount] = useState(0);
  // const [isOpen, setIsOpen] = useState(false);
  // const [title, setTitle] = useState('');
  // const [descriptionText, setDescriptionText] = useState('');
  // const [characterCount, setCharacterCount] = useState(0);
  // const [location, setLocation] = useState('');
  // const [start, setStart] = useState('');
  // const [end, setEnd] = useState('');

  // const handleOpenModal = () => {
  //   setIsOpen(true);
  // };

  // const handleCloseModal = () => {
  //   setIsOpen(false);
  // };

  const [addEvent, { error }] = useMutation(ADD_EVENT, {
    update(cache, { data: {addEvent} }) {
      try {
        const { events } = cache.readQuery({ query:
        QUERY_EVENTS});

        cache.writeQuery({
            query: QUERY_EVENTS,
            data: { events: [addEvent, ...events] },
        });
      } catch (e) {
        console.error(e);
      }
    },
  });

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    try {
      const { data } = await addEvent({
        variables: { ...eventText},
      });

      setEventText('');
    } catch (err) {
      console.error(err);
    }
  };
  
  const handleChange = (event) => {
    const { name, value } = event.target;

    if (name === 'eventText' && value.length <= 280) {
      setEventText(value);
      setCharacterCount(value.length);
    }
  };

  // const handleCreateEvent = () => {
  //   onCreateEvent({
  //     title,
  //     start: dayjs(start).toDate(),
  //     end: dayjs(end).toDate(),
  //     descriptionText,
  //     location
  //   });
  //   setIsOpen(false);
  // };

  return (

    <div>
      <h3> Create a new event!</h3> 

      {Auth.loggedIn() ? (
      <>
        <p
          className={`m-0 ${
            characterCount === 280 || error ? 'text-danger' : ''
          }`}
        >
          Character Count: {characterCount}/280
          </p>          
          <form
          className="flex-row justify-center justify-space-between-md align-center"
          onSubmit={handleFormSubmit}
        >
          <div className="col-12 col-lg-9">
            <textarea
              name="eventText"
              placeholder="Here's a new event..."
              value={eventText}
              className="form-input w-100"
              style={{ lineHeight: '1.5', resize: 'vertical' }}
              onChange={handleChange}
            ></textarea>
          </div>

          <div className="col-12 col-lg-3">
            <button className="btn btn-primary btn-block py-3" type="submit">
              Add Event
            </button>
          </div>
          {error && (
            <div className="col-12 my-3 bg-danger text-white p-3">
              {error.message}
            </div>
          )}
        </form>
      </>
    ) : (
      <p>
        You need to be logged in to create an event. Please{' '}
        {/* <Link to="/login">login</Link> or <Link to="/signup">signup.</Link> */}
      </p>
    )}
  </div>
);
};

export default CreateEventForm;
        
//     <>
//       <button
//         className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded focus:outline-none focus:shadow-outline mb-2"
//         onClick={handleOpenModal}
//       >
//         Create Event
//       </button>
//       <Modal
//         isOpen={isOpen}
//         onRequestClose={handleCloseModal}
//         className="z-50 fixed inset-0 overflow-auto bg-opacity-80 bg-gray-900 flex justify-center items-center"
//         overlayClassName="z-40 fixed inset-0 bg-gray-800 bg-opacity-75"
//       >
//         <div className="bg-white rounded-lg px-8 py-6">
//           <h2 className="text-lg font-semibold mb-4">Create Event</h2>
//           <div className="flex flex-col gap-4">
//             <input
//               type="text"
//               placeholder="Title"
//               value={title}
//               onChange={(e) => setTitle(e.target.value)}
//               className="border border-gray-400 rounded-lg py-2 px-4"
//             />
//             <input
//               type="datetime-local"
//               placeholder="Start"
//               value={start}
//               onChange={(e) => setStart(e.target.value)}
//               className="border border-gray-400 rounded-lg py-2 px-4"
//             />
//             <input
//               type="datetime-local"
//               placeholder="End"
//               value={end}
//               onChange={(e) => setEnd(e.target.value)}
//               className="border border-gray-400 rounded-lg py-2 px-4"
//             />
//           </div>
//           <div className="mt-6 flex justify-end">
//             <button
//               className="mr-4 bg-green-500 hover:bg-green-600 text-white font-semibold rounded-lg py-2 px-6"
//               onClick={handleCreateEvent}
//             >
//               Create
//             </button>
//             <button
//               className="bg-gray-400 hover:bg-gray-500 text-white font-semibold rounded-lg py-2 px-6"
//               onClick={handleCloseModal}
//             >
//               Cancel
//             </button>
//           </div>
//         </div>
//       </Modal>
//     </>
//   );
// };

// export default CreateEvent;