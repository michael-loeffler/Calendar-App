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
      <button onClick={handleOpenModal}>Create Event</button>
      <Modal isOpen={isOpen} onRequestClose={handleCloseModal} className="event-modal">
        <h2>Create Event</h2>
        <div className="input-wrapper">
          <input
            type="text"
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <input
            type="datetime-local"
            placeholder="Start"
            value={start}
            onChange={(e) => setStart(e.target.value)}
          />
          <input
            type="datetime-local"
            placeholder="End"
            value={end}
            onChange={(e) => setEnd(e.target.value)}
          />
        </div>
        <div className="button-wrapper">
          <button className="create-btn" onClick={handleCreateEvent}>Create</button>
          <button className="cancel-btn" onClick={handleCloseModal}>Cancel</button>
        </div>
      </Modal>

      <style>
        {`
          .event-modal {
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            width: 300px;
            height: auto;
            z-index: 9999;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            padding: 20px;
            background-color: #fff;
            border-radius: 10px;
            box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.5);
            font-family: sans-serif;
          }
          
          .event-modal input {
            margin: 5px;
            padding: 5px;
            border: none;
            border-radius: 5px;
            box-shadow: 0px 0px 5px rgba(0, 0, 0, 0.2);
            width: 100%;
          }
          
          .input-wrapper {
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            width: 100%;
            margin-bottom: 10px;
          }
          
          .button-wrapper {
            display: flex;
            width: 100%;
            justify-content: flex-end;
          }
          
          .create-btn {
            padding: 5px 10px;
            border: none;
            border-radius: 5px;
            box-shadow: 0px 0px 5px rgba(0, 0, 0, 0.2);
            background-color: #4caf50;
            color: #fff;
            cursor: pointer;
            margin-right: 10px;
          }
          
          .cancel-btn {
            padding: 5px 10px;
            border: none;
            border-radius: 5px;
            background-color: #d3d3d3;
            color: #fff;
            font-size: 16px;
            cursor: pointer;
            margin-right: 10px;
          }
          
          .cancel-btn:hover {
            background-color: #b0b0b0;
          }
          
          .rbc-calendar {
            position: relative;
            z-index: 0;
          }
          
          
        `}
      </style>
    </>
  );
};

export default CreateEvent;