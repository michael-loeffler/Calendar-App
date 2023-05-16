import React, { useState, useEffect } from 'react';
import { useMutation } from '@apollo/client';
import { REMOVE_EVENT } from '../utils/mutations';
import Modal from 'react-modal';

Modal.setAppElement('#root');

const EventDetail = ({ selectedEvent, showDetails, passEventToUpdateForm, toggleDetails, formatDate, refetch, setFormType }) => {
  const [isOpen, setIsOpen] = useState(showDetails);

  useEffect(() => {
    setIsOpen(showDetails);
  }, [showDetails]);

  // This function is called when the user clicks on the delete button. The removeEvent mutation is called which looks for the event currently displayed by its _id, and then removes it from the database. After successful deletion, the database query is refetched and the modal is closed.
  const [removeEvent] = useMutation(REMOVE_EVENT);
  const handleRemoveEvent = async () => {
    try {
      await removeEvent({ variables: { eventId: selectedEvent._id } });
      refetch()
      toggleDetails(false)
    } catch (error) {
      console.log(error);
    }
  };

  // This function is called when a user clicks on the "Edit" button. The event that is current displayed sent to the calendar container file, which then reformats the dates and sends that event to the CreateEvent component. This function also resets the formType variable (the variable used to conditionally render the CreateEvents modal to either be for Create or Update actions)
  const handleEditClick = () => {
    passEventToUpdateForm(selectedEvent)
    setFormType('Update')
  };

  return (
    <>
      <Modal
        isOpen={isOpen}
        className='z-50 fixed inset-0 overflow-auto bg-opacity-40 bg-gray-900 flex justify-center items-center max-width-25 max-height-25'
        overlayClassName='z-40 fixed inset-0 bg-gray-800 bg-opacity-25'
      >
        <div className='bg-white rounded-lg px-3 py-1'>
          <div className='mt-1 flex justify-end'>
            <button id='exitBtn'
              className='bg-red-400 hover:bg-gray-500 text-white font-semibold rounded-lg py-1 px-3'
              onClick={toggleDetails}
            >
              ✗
              {/* The X button for the Create/Update modal */}
            </button>
          </div>
          <div className='flex flex-col gap-0.5'>
            <h3 className='text-wrap'>
              {selectedEvent.title}
            </h3>
            <label>Start Time:</label>
            <input
              type='datetime-local'
              name='end'
              value={formatDate(selectedEvent.start)}
              style={{ fontWeight: 'bold' }}
              readOnly
            >
            </input>
            <label>End Time:</label>
            <input
              type='datetime-local'
              name='end'
              value={formatDate(selectedEvent.end)}
              style={{ fontWeight: 'bold' }}
              readOnly
            />
            {/* Conditionally renders the location and description fields only if they are not empty, eliminating white space on EventDetails Modal*/}
            {selectedEvent.location !== '' ? (
              <p id='hide'> Location: <strong>{selectedEvent.location}</strong>
              </p>) : null}
            {selectedEvent.description !== '' ? (
              <p id='hide'> Description: <strong>{selectedEvent.description}</strong></p>) : null}
          </div>
          <div className='mt-1 flex justify-end'>
            <button
              className='mr-4 bg-blue-400 hover:bg-gray-500 text-white font-semibold rounded-lg py-2 px-4'
              onClick={handleEditClick}
            >
              🖉
              {/* Edit button used to trigger the passing of the event to the CreateEvent component and setting the component to instead be an UpdateEvent component*/}
            </button>
            <button
              className='bg-red-400 hover:bg-gray-500 text-white font-semibold rounded-lg py-2 px-4'
              onClick={handleRemoveEvent}
            >
              🗑️
              {/* Delete button used to trigger removeEvent mutation*/}
            </button>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default EventDetail;
