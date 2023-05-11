import React, { useCallback, useState, useEffect } from 'react'
import Modal from 'react-modal'
import { useMutation } from "@apollo/client"
import { REMOVE_EVENT, UPDATE_EVENT } from "../utils/mutations"

Modal.setAppElement('#root');

const EventDetail = ({onEventDetail, showModal, onClose, toggleModal}) => {
  const [isOpen, setIsOpen] = useState(showModal);

  useEffect(() => {
    setIsOpen(showModal);
  }, [showModal])

  const [updateEvent] = useMutation (UPDATE_EVENT)
  // const [removeEvent]= useMutation (REMOVE_EVENT)

  const [eventData, setEventData] = useState({ title: '', start: '', end: '', description: '', location: '', allDay: false, color: ''});

  useEffect(() => {
    setEventData({...eventData})
  }, [])
  console.log(eventData);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEventData({ ...eventData, [name]: value});
  };

  const handleEventDetail = async () => {
    try {
    const response = await updateEvent({ variables: eventData});
    console.log('response: ', response);
    setEventData({ title: '', start: '', end: '', description: '', location: '', allDay: false, color: '' });
    setIsOpen(false);
    onEventDetail(response.data.updateEvent);
    // const response = await removeEvent({ variables: _id: eventId});
    } catch (error) {
      console.log(error);
    }
  };


  return (
    <> 
      <div>
      onClick={toggleModal}
      </div>
      <Modal
        isOpen={isOpen}
        onRequestClose={onClose}
        className="z-50 fixed inset-0 overflow-auto bg-opacity-80 bg-gray-900 flex justify-center items-center"
        overlayClassName="z-40 fixed inset-0 bg-gray-800 bg-opacity-75"
      >
      <div className="bg-white rounded-lg px-8 py-6">
          <h2 className="text-lg font-semibold mb-4">Edit Event</h2>
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
              className="bg-blue-400 hover:bg-gray-500 text-white font-semibold rounded-lg py-2 px-6"
              onClick={handleEventDetail}
            > 
              Edit
           </button>
           <button
             className="bg-red-400 hover:bg-gray-500 text-white font-semibold rounded-lg py-2 px-6"
             onClick={handleEventDetail}
            >
              Delete
           </button>
          </div> 
        </div>
        <button
          className="bg-red-400 hover:bg-gray-500 text-white font-semibold rounded-lg py-2 px-6"
          onClick={toggleModal}
        >
          ✗
        </button>
    </Modal>
  </>
  );
};

export default EventDetail;