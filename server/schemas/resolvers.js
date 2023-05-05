const { AuthenticationError } = require('apollo-server-express');
const { User, Event } = require('../models');
const { signToken } = require('../utils/auth');

const resolvers = {
    Query: {
        getEvents: async (parent, { email }) => {
            return User.findOne({ email: email }).populate('events');
        },
    },

    Mutation: {

    }
}

module.exports = resolvers;