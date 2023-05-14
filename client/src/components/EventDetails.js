import React, { useCallback, useState, useEffect } from 'react'
import Modal from 'react-modal'
import { useMutation } from "@apollo/client"
import { REMOVE_EVENT, UPDATE_EVENT } from "../utils/mutations"

Modal.setAppElement('#root');

const EventDetail = ({selectedEvent, showDetails, passEventToUpdateForm, onClose, toggleDetails, formatDate, refetch, setFormType}) => {
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
    setFormType("Update")
  };

  return (
    <> 
      <Modal
        isOpen={isOpen}
        onRequestClose={onClose}
        className="z-50 fixed inset-0 overflow-auto bg-opacity-80 bg-gray-900 flex justify-center items-center"
        overlayClassName="z-40 fixed inset-0 bg-gray-800 bg-opacity-75"
      >
      <div className="bg-white rounded-lg px-4 py-3">
        <div className="mt-1 flex justify-end">
        <button id="exitBtn"
          className="bg-red-400 hover:bg-gray-500 text-white font-semibold rounded-lg py-1 px-3"
          onClick={toggleDetails}
        >
          ✗
        </button> 
        </div>
          <div className="flex flex-col gap-1">
            <h1>
              {selectedEvent.title}
            </h1>
              <input
              type="datetime-local"
              name="end"
              value={formatDate(selectedEvent.start)}
              readOnly
              >
              </input>
            <input
              type="datetime-local"
              name="end"
              value={formatDate(selectedEvent.end)}
              readOnly
            />
            <p>
              {selectedEvent.location}
            </p>
            <p>
              {selectedEvent.description}
            </p>
          </div>
          <div className="form-group">
            <label>Color</label>
            <select name="color" value={selectedEvent.color}>
              <option value="">Select a color</option>
              <option value="lightblue">Light Blue</option>
              <option value="lightgreen">Light Green</option>
              <option value="lightpink">Light Pink</option>
              <option value="lightyellow">Light Yellow</option>
              <option value="lightcoral">Light Coral</option>
            </select>
          </div>
          <div className="mt-1 flex justify-end">
            <button
              className="mr-4 bg-gray-400 hover:bg-blue-500 text-white font-semibold rounded-lg py-2 px-4"
              onClick={handleEditClick}
            > 
              🖉
           </button>  
           <button
             className="bg-gray-400 hover:bg-red-500 text-white font-semibold rounded-lg py-2 px-4"
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