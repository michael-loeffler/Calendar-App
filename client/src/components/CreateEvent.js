import React, { useEffect, useState } from 'react';
import { useMutation } from '@apollo/client'
import { ADD_EVENT, UPDATE_EVENT } from '../utils/mutations'
import Modal from 'react-modal';

Modal.setAppElement('#root');

const CreateEvent = ({dragStart, dragEnd, setDragStart, setDragEnd, showModal, toggleModal, eventDetailsEvent, setEventDetailsEvent, refetch, formType, setFormType}) => {
  const [isOpen, setIsOpen] = useState(showModal);
  const [eventData, setEventData] = useState({})
    
  useEffect(() => {
      setIsOpen(showModal);
  }, [showModal])

  const [addEvent] = useMutation(ADD_EVENT)
  
  useEffect(() => {
    setEventData(eventDetailsEvent)
  }, [eventDetailsEvent])

  useEffect(() => {
    setEventData({start: dragStart, end: dragEnd})
  }, [dragStart, dragEnd])
  
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEventData({ ...eventData, [name]: value});
  };

  const handleOpenModal = () => {
    setDragStart('');
    setDragEnd('');
    toggleModal();
  };

  const handleCloseModal = () => {
    setIsOpen(false);
  };
 
  const handleCreateEvent = async () => {
    try {
      await addEvent({ variables: eventData });   
      toggleModal();
      refetch();
      clearForm();
    } catch (error) {
      console.error(error);
    }
  };

  const [updateEvent] = useMutation (UPDATE_EVENT);

  const handleUpdateEvent = async () => {
    try {
      await updateEvent ({ variables: {eventId: eventDetailsEvent._id, ...eventData} });
      toggleModal();
      refetch();
      setFormType('');
      clearForm();
    } catch (error) {
      console.error(error);
    }
  }

  const clearForm = () => {
    setFormType('');
    setEventData({ title: '', start: '', end: '', description: '', location: '', allDay: false, color: '' });
    setEventDetailsEvent({ title: '', start: '', end: '', description: '', location: '', allDay: false, color: '' });
    setDragStart('');
    setDragEnd('');
  }

  return (
    <>
      <button
        className= "createBtn"
        style = {{ background: '#394867', color: 'white', borderRadius: '40px', padding: '14px', marginBottom: '10px', fontWeight: 'bold', hover: 'red'}} 
        onClick={handleOpenModal}
      >
        Create Event
      </button>
      <Modal
        isOpen={isOpen}
        onRequestClose={handleCloseModal}
        className="z-50 fixed inset-0 overflow-auto bg-opacity-40 bg-gray-900 flex justify-center items-center"
        overlayClassName="z-40 fixed inset-0 bg-gray-800 bg-opacity-25"
      >
        <div className="bg-white rounded-lg px-8 py-6">
          <div className="mt-1 flex justify-end">
          <button
              className="bg-red-400 hover:bg-gray-500 text-white font-semibold rounded-lg py-1 px-3"
              onClick={() => {
                toggleModal();
                clearForm();
              }}
            >
            ✗
          </button>
          </div>
          {formType === "Update" ? (
          <h2 className="text-lg font-semibold mb-4">Update Event</h2>)
           : ( <h2 className="text-lg font-semibold mb-4">Create Event</h2> )}
          <div className="flex flex-col gap-1">
            <label>Title:</label> 
            <input
              type="text"
              placeholder="Title"
              name="title"
              value={eventData.title}
              onChange={handleInputChange}
              className="border border-gray-400 rounded-lg py-2 px-4"
            />
            <label>Start Time:</label>
            <input
              type="datetime-local"
              placeholder="Start"
              name="start"
              value={eventData.start}
              onChange={handleInputChange}
              className="border border-gray-400 rounded-lg py-2 px-4"
            />
            <label>End Time:</label>
            <input
              type="datetime-local"
              placeholder="End"
              name="end"
              value={eventData.end}
              onChange={handleInputChange}
              className="border border-gray-400 rounded-lg py-2 px-4"
            />
            <label>Location:</label>
            <input
              type="text"
              placeholder="Location"
              name="location"
              value={eventData.location}
              onChange={handleInputChange}
              className="border border-gray-400 rounded-lg py-2 px-4"
            />
            <label>Description:</label>
            <input
              type="text"
              placeholder="Description"
              name="description"
              value={eventData.description}
              onChange={handleInputChange}
              className="border border-gray-400 rounded-lg py-2 px-4"
            />
          </div>
          <div className="form-group">
            <label>Color</label>
            <select name="color" value={eventData.color} onChange={handleInputChange}>
              <option value="">Select a color</option>
              <option value="lightblue">Light Blue</option>
              <option value="lightgreen">Light Green</option>
              <option value="lightpink">Light Pink</option>
              <option value="lightsalmon">Light Salmon</option>
              <option value="lightcoral">Light Coral</option>
              <option value="lightslategrey">Light Grey</option>
            </select>
          </div>
          <div className="mt-6 flex justify-end">
            {formType === "Update" ? (
            <button
              className="mr-4 bg-green-500 hover:bg-green-600 text-white font-semibold rounded-lg py-2 px-6"
              onClick={handleUpdateEvent}
              >
              Update
            </button>) : (
              <button
              className="mr-4 bg-green-500 hover:bg-green-600 text-white font-semibold rounded-lg py-2 px-6"
              onClick={handleCreateEvent}
            >
              Create
            </button>
            )}
          </div>
        </div>
      </Modal>
    </>
  );
};

export default CreateEvent;


