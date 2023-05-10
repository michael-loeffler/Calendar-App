const { Schema, model } = require('mongoose');

const eventSchema = new Schema({
  title: {
    type: String,
    required: true,
    trim: true,
  },
  start: {
    type: Date,
    required: true,
  },
  end: {
    type: Date,
    required: true,
  },
  location: {
    type: String,
  },
  description: {
    type: String
  },
  allDay: {
    type: Boolean
  }
});

const Event = model('Event', eventSchema);

module.exports = Event;
