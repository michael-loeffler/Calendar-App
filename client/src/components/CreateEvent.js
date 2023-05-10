import React, { useState } from 'react';
import { useMutation } from '@apollo/client'
import { ADD_EVENT } from '../utils/mutations'
import Modal from 'react-modal';

Modal.setAppElement('#root');

const CreateEvent = ({start, end, onCreateEvent}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [addEvent] = useMutation(ADD_EVENT)
  // const [title, setTitle] = useState('');
  // const [start, setStart] = useState('');
  // const [end, setEnd] = useState('');
  const [eventData, setEventData] = useState({title: '', date: '', startTime: start || '', endTime: end || '', description: '', location: ''})

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEventData({ ...eventData, [name]: value});
  };

  const handleOpenModal = () => {
    setIsOpen(true);
  };

  const handleCloseModal = () => {
    setIsOpen(false);
  };
 
  const handleCreateEvent = async () => {
    try {
    const response = await addEvent({ variables: eventData});
    console.log('response: ', response);
    setEventData({title: '', date: '', startTime: '', endTime: '', description: '', location: ''});
    setIsOpen(false);
    onCreateEvent(response);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <button
        className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded focus:outline-none focus:shadow-outline mb-2"
        onClick={handleOpenModal}
      >
        Create Event
      </button>
      <Modal
        isOpen={isOpen}
        onRequestClose={handleCloseModal}
        className="z-50 fixed inset-0 overflow-auto bg-opacity-80 bg-gray-900 flex justify-center items-center"
        overlayClassName="z-40 fixed inset-0 bg-gray-800 bg-opacity-75"
      >
        <div className="bg-white rounded-lg px-8 py-6">
          <h2 className="text-lg font-semibold mb-4">Create Event</h2>
          <div className="flex flex-col gap-4">
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
              name="startTime"
              value={eventData.startTime}
              onChange={handleInputChange}
              className="border border-gray-400 rounded-lg py-2 px-4"
            />
            <input
              type="datetime-local"
              placeholder="End"
              name="endTime"
              value={eventData.endTime}
              onChange={handleInputChange}
              className="border border-gray-400 rounded-lg py-2 px-4"
            />
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
              onClick={handleCloseModal}
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
