import React, { useState } from 'react';
import Modal from 'react-modal';
import dayjs from 'dayjs';

Modal.setAppElement('#root');

const CreateEvent = ({ onCreateEvent }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [title, setTitle] = useState('');
  const [start, setStart] = useState('');
  const [end, setEnd] = useState('');

  const handleOpenModal = () => {
    setIsOpen(true);
  };

  const handleCloseModal = () => {
    setIsOpen(false);
  };

  const handleCreateEvent = () => {
    onCreateEvent({
      title,
      start: dayjs(start).toDate(),
      end: dayjs(end).toDate(),
    });
    setIsOpen(false);
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
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="border border-gray-400 rounded-lg py-2 px-4"
            />
            <input
              type="datetime-local"
              placeholder="Start"
              value={start}
              onChange={(e) => setStart(e.target.value)}
              className="border border-gray-400 rounded-lg py-2 px-4"
            />
            <input
              type="datetime-local"
              placeholder="End"
              value={end}
              onChange={(e) => setEnd(e.target.value)}
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