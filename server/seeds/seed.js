const db = require('../config/connection');
const { Event } = require('../models');

const seedEvents = require('./SeedEvents.js');

db.once('open', async () => {
  await Event.deleteMany({});

  const events = await Event.insertMany(seedEvents);

  console.log('Events seeded!');
  process.exit(0);
});
