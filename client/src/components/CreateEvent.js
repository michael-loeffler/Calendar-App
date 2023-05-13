import React, { useEffect, useState } from 'react';
import { useMutation } from '@apollo/client'
import { ADD_EVENT } from '../utils/mutations'
import Modal from 'react-modal';

Modal.setAppElement('#root');

const CreateEvent = ({dragStart, dragEnd, onCreateEvent, showModal, onClose, toggleModal, eventUpdate, setEventUpdate, formatDate}) => {
  const [isOpen, setIsOpen] = useState(showModal);
  
   let {title, start, end, description, location, allDay, color} = { ...eventUpdate};

   start = formatDate(start);
   end = formatDate(end);
   eventUpdate = {...eventUpdate, start: start, end: end};

  useEffect(() => {
      setIsOpen(showModal);
  }, [showModal])

  const [addEvent] = useMutation(ADD_EVENT)
  
  const [eventData, setEventData] = useState({title: title || '', start: start || dragStart || '', end: end || dragEnd || '', description: description || '', location: location || '', allDay: allDay || false, color: color || ''});

  useEffect(() => {
    setEventData({...eventData, start: dragStart, end: dragEnd, ...eventUpdate})
  }, [dragStart, dragEnd, eventUpdate])

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEventData({ ...eventData, [name]: value});
  };

  const handleCreateEvent = async () => {
    try {
      const response = await addEvent({ variables: eventData });   
      console.log('response: ', response);
      setEventData({ title: '', start: '', end: '', description: '', location: '', allDay: false, color: '' });
      setIsOpen(false);
      onCreateEvent();
    } catch (error) {
      console.error(error);
    }
  };

  const clearForm = () => {
    setEventData({ title: '', start: '', end: '', description: '', location: '', allDay: false, color: '' });
    setEventUpdate({ title: '', start: '', end: '', description: '', location: '', allDay: false, color: '' });
  }

  return (
    <>
      <button
        className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded focus:outline-none focus:shadow-outline mb-2"
        onClick={toggleModal}
      >
        Create Event
      </button>
      <Modal
        isOpen={isOpen}
        onRequestClose={onClose}
        className="z-50 fixed inset-0 overflow-auto bg-opacity-80 bg-gray-900 flex justify-center items-center"
        overlayClassName="z-40 fixed inset-0 bg-gray-800 bg-opacity-75"
      >
        <div className="bg-white rounded-lg px-8 py-6">
          <h2 className="text-lg font-semibold mb-4">Create Event</h2>
          <div className="flex flex-col gap-4">
            <label>Title:</label> 
            <input
              type="text"
              placeholder="Title"
              name="title"
              value={eventData.title}
              onChange={handleInputChange}
              className="border border-gray-400 rounded-lg py-2 px-4"
            />
            <input
              type="datetime-local"
              placeholder="Start"
              name="start"
              value={eventData.start}
              onChange={handleInputChange}
              className="border border-gray-400 rounded-lg py-2 px-4"
            />
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
              placeholder="location"
              name="location"
              value={eventData.location}
              onChange={handleInputChange}
              className="border border-gray-400 rounded-lg py-2 px-4"
            />
            <label>Description:</label>
            <input
              type="text"
              placeholder="description"
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
              <option value="lightyellow">Light Yellow</option>
              <option value="lightcoral">Light Coral</option>
            </select>
          </div>
          <div className="mt-6 flex justify-end">
            <button
              className="mr-4 bg-green-500 hover:bg-green-600 text-white font-semibold rounded-lg py-2 px-6"
              onClick={handleCreateEvent}
            >
              Create
            </button>
            <button
              className="bg-gray-400 hover:bg-gray-500 text-white font-semibold rounded-lg py-2 px-6"
              onClick={() => {
                toggleModal();
                clearForm();
              }}
            >
              Cancel
            </button>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default CreateEvent;
