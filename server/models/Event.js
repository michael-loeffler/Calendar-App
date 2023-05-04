const { Schema, model } = require('mongoose');

const eventSchema = new Schema({
  title: {
    type: String,
    required: true,
    trim: true,
  },
  date: {
    type: Date,
    required: true,
  },
  startTime: {
    type: Date,
    required: true,
  },
  endTime: {
    type: Date,
    required: true,
  },
  location: {
    type: String,
  },
  description: {
    type: String
  }
});

const Event = model('Event', eventSchema);

module.exports = Event;
