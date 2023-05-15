import React, { useState, useEffect } from 'react';
import { useMutation } from '@apollo/client';
import { REMOVE_EVENT } from '../utils/mutations';
import Modal from 'react-modal';

Modal.setAppElement('#root');

const EventDetail = ({selectedEvent, showDetails, passEventToUpdateForm, toggleDetails, formatDate, refetch, setFormType}) => {
  const [isOpen, setIsOpen] = useState(showDetails);

  useEffect(() => {
    setIsOpen(showDetails);
  }, [showDetails])

  const [removeEvent]= useMutation (REMOVE_EVENT);

  const handleRemoveEvent = async () => {
    try {
      await removeEvent({ variables: {eventId: selectedEvent._id}});
      refetch()
      toggleDetails(false)
    } catch (error) {
      console.log(error);
    }
  };

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
              style= {{fontWeight: 'bold'}}
              readOnly
            >
            </input>
            <label>End Time:</label>
            <input
              type='datetime-local'
              name='end'
              value={formatDate(selectedEvent.end)}
              style= {{fontWeight: 'bold'}}
              readOnly
            />
            {selectedEvent.location !== '' ? (
            <p id ='hide'> Location: <strong>{selectedEvent.location}</strong> 
            </p> ) : null }
            {selectedEvent.description !== '' ? (
            <p id ='hide'> Description: <strong>{selectedEvent.description}</strong></p>) : null}
          </div>
          <div className='mt-1 flex justify-end'>
            <button
              className='mr-4 bg-blue-400 hover:bg-gray-500 text-white font-semibold rounded-lg py-2 px-4'
              onClick={handleEditClick}
            > 
              🖉
           </button>  
           <button
             className='bg-red-400 hover:bg-gray-500 text-white font-semibold rounded-lg py-2 px-4'
             onClick={handleRemoveEvent}
            >
              🗑️
           </button>
          </div> 
      </div>
    </Modal>
  </>
  );
};

export default EventDetail;