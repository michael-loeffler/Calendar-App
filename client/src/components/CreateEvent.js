import React, { useState, useEffect } from 'react';
import { useMutation } from '@apollo/client';
import { ADD_EVENT, UPDATE_EVENT } from '../utils/mutations';
import Modal from 'react-modal';

Modal.setAppElement('#root');

const CreateEvent = ({showModal, toggleModal, dragStart, dragEnd, setDragStart, setDragEnd, eventDetailsEvent, setEventDetailsEvent, formType, setFormType, refetch }) => {
  // initialization of state variables
  const [isOpen, setIsOpen] = useState(showModal);
  const [eventData, setEventData] = useState({});
  const [errorOpen, setErrorOpen] = useState(false)
  const [dateError, setDateError] = useState(false);
    
  useEffect(() => {
      setIsOpen(showModal);
  }, [showModal]);

  // whenever eventDetailsEvent changes, its value is set as eventData. This is what makes the prepopulation possible.
  useEffect(() => {
    setEventData(eventDetailsEvent)
  }, [eventDetailsEvent]);
  
  // whenever dragStart and dragEnd change, their values are set as eventData. This is what makes the prepopulation possible.
  useEffect(() => {
    setEventData({start: dragStart, end: dragEnd, title: '', location: '', description: ''})
  }, [dragStart, dragEnd]);
  
  // responsible for accepting the user's input into the form and setting its value to eventData object
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEventData({ ...eventData, [name]: value});
  };
  
  const handleOpenModal = () => {
    setDragStart('');
    setDragEnd('');
    toggleModal();
  };
  
  // This function is called when the user clicks on the create button. The function checks to make sure the start time begins before the end time, and if not, toggles on the error modal for date errors. If we get past that check, the addEvent mutation is called which checks to make sure all required fields have data entered in them. If not, an error is thrown and the error modal is toggled on. 

  // After successful creates, the modal is closed, the database query is refetched, and the form is cleared.
  const [addEvent] = useMutation(ADD_EVENT);
  const handleCreateEvent = async () => {
    try {
      if (eventData.end < eventData.start) {
        setDateError(true); // this is the variable used to conditionally render the correct error message
        toggleError();
      }
      await addEvent({ variables: eventData });   
      toggleModal();
      refetch();
      clearForm();
    } catch (error) {
      console.error(error);
      toggleError();
    }
  };

  // This function is called when the user clicks on the update button. The function checks to make sure the start time begins before the end time, and if not, toggles on the error modal for date errors. If we get past that check, the updateEvent mutation is called which checks to make sure all required fields have data entered in them (these checks take place in server/schemas/resolvers). If not, an error is thrown and the error modal is toggled on.
  
  // After successful updates, the modal is closed, the database query is refetched, the formType variable (used to conditionally render this file to either be a Create Event or Update Event modal) is reset, and the form is cleared.
  const [updateEvent] = useMutation (UPDATE_EVENT);
  const handleUpdateEvent = async () => {
    try {
      if (eventData.end < eventData.start) {
        setDateError(true);
        toggleError();
      }
      await updateEvent ({ variables: {eventId: eventDetailsEvent._id, ...eventData} });
      toggleModal();
      refetch();
      setFormType('');
      clearForm();
    } catch (error) {
      console.error(error);
      toggleError();
    }
  };

  // This function resets all state variables that could possibly impact a subsequent call of this modal. This ensures no undesired data persistence occurs as a user moves from one action to another
  const clearForm = () => {
    setFormType('');
    setEventData({ title: '', start: '', end: '', description: '', location: '', allDay: false, color: '' });
    setEventDetailsEvent({ title: '', start: '', end: '', description: '', location: '', allDay: false, color: '' });
    setDragStart('');
    setDragEnd('');
  };

  // Toggle function used to open and close the Error modal
  const toggleError = () => {
    setErrorOpen(!errorOpen)
  }

  return (
    <>
      <button
        className= 'createBtn'
        style = {{ background: '#394867', color: 'white', borderRadius: '40px', padding: '14px', marginBottom: '10px', fontWeight: 'bold', hover: 'red'}} 
        onClick={handleOpenModal}
      >
        Create Event
        {/* The button in the upper left hand corner of the page */}
      </button>
      <Modal
        isOpen={isOpen}
        className='z-50 fixed inset-0 overflow-auto bg-opacity-40 bg-gray-900 flex justify-center items-center'
        overlayClassName='z-40 fixed inset-0 bg-gray-800 bg-opacity-25'
      >
        <div className='bg-white rounded-lg px-8 py-6'>
          <div className='mt-1 flex justify-end'>
          <button
              className='bg-red-400 hover:bg-gray-500 text-white font-semibold rounded-lg py-1 px-3'
              onClick={() => {
                toggleModal();
                clearForm();
              }}
            >
            ✗
             {/* The X button for the Create/Update modal */}
          </button>
          </div>
           {/* Conditionally renders the Title of the Modal depending on what action the user is taking*/}
          {formType === 'Update' ? (
          <h2 className='text-lg font-semibold mb-4'>Update Event</h2>)
           : ( <h2 className='text-lg font-semibold mb-4'>Create Event</h2> )}
          <div className='flex flex-col gap-1'>
            <label>Title:</label> 
            <input
              type='text'
              placeholder='Title'
              name='title'
              value={eventData.title}
              onChange={handleInputChange}
              className='border border-gray-400 rounded-lg py-2 px-4'
            />
            <label>Start Time:</label>
            <input
              type='datetime-local'
              placeholder='Start'
              name='start'
              value={eventData.start}
              onChange={handleInputChange}
              className='border border-gray-400 rounded-lg py-2 px-4'
            />
            <label>End Time:</label>
            <input
              type='datetime-local'
              placeholder='End'
              name='end'
              value={eventData.end}
              onChange={handleInputChange}
              className='border border-gray-400 rounded-lg py-2 px-4'
            />
            <label>Location:</label>
            <input
              type='text'
              placeholder='Location'
              name='location'
              value={eventData.location}
              onChange={handleInputChange}
              className='border border-gray-400 rounded-lg py-2 px-4'
            />
            <label>Description:</label>
            <input
              type='text'
              placeholder='Description'
              name='description'
              value={eventData.description}
              onChange={handleInputChange}
              className='border border-gray-400 rounded-lg py-2 px-4'
            />
          </div>
          <div className='form-group'>
            <label>Color</label>
            <select name='color' value={eventData.color} onChange={handleInputChange}>
              <option value=''>Select a color</option>
              <option value='lightblue'>Light Blue</option>
              <option value='lightgreen'>Light Green</option>
              <option value='lightpink'>Light Pink</option>
              <option value='lightsalmon'>Light Salmon</option>
              <option value='lightcoral'>Light Coral</option>
              <option value='lightslategrey'>Light Grey</option>
            </select>
          </div>
          <div className='mt-6 flex justify-end'>
            {/* Conditionally renders the button at the bottom of the Modal to either say Update or Create based on the action that the user is taking. Also, updates the function associated with the onClick event for the button, directing the information to the correct sequence of actions */}
            {formType === 'Update' ? (
            <button
              className='mr-4 bg-green-500 hover:bg-green-600 text-white font-semibold rounded-lg py-2 px-6'
              onClick={handleUpdateEvent}
              >
              Update
            </button>) : (
              <button
              className='mr-4 bg-green-500 hover:bg-green-600 text-white font-semibold rounded-lg py-2 px-6'
              onClick={handleCreateEvent}
            >
              Create
            </button>
            )}
          </div>
        </div>
      </Modal>
      {/* Error Message Modal */}
      <Modal
        isOpen={errorOpen}
        className='z-50 fixed inset-0 overflow-auto bg-opacity-65 bg-gray-900 flex justify-center items-center'
        overlayClassName='z-40 fixed inset-0 bg-gray-800 bg-opacity-25'
      >
        <div className='bg-white rounded-lg px-8 py-6'>
          <div className='mt-1 flex justify-end'>
          <button
              className='bg-red-400 hover:bg-gray-500 text-white font-semibold rounded-lg py-1 px-3'
              onClick={() => {
                setDateError(false);
                toggleError();
              }}
            >
            ✗
          </button>
          </div>
          <h2 className='text-lg font-semibold mb-4 text-danger'>Something went wrong!</h2>
          <div className='flex flex-col gap-1'>
          {/* Conditionally renders the error message based on the type of error  */}
          {dateError ? (<p><strong>Start Time</strong> must be before <strong>End Time</strong>. Please close this message and try again.</p>) : 
          (<p><strong>Title</strong>, <strong>Start Time</strong>, and <strong>End Time</strong> are all required fields. Please close this message and try again.</p>)}
          </div>
        </div>
      </Modal>
    </>
  );
};

export default CreateEvent;


