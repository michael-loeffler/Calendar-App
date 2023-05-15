const { AuthenticationError } = require('apollo-server-express');
const { User, Event } = require('../models');
const { signToken } = require('../utils/auth');
const { GraphQLScalarType, Kind } = require('graphql');

const resolvers = {
  Query: {
    getEvents: async (parent, { email }) => {
      return User.findOne({ email }).populate('events');
    },
  },

  Mutation: {
    addUser: async (parent, args) => {
      const user = await User.create(args);
      const token = signToken(user);
      return { token, user };
    },
    loginUser: async (parent, { email, password }) => {
      const user = await User.findOne({ email });

      if (!user) {
        throw new AuthenticationError('Incorrect Login Credentials');
      }

      const correctPW = await user.isCorrectPassword(password);

      if (!correctPW) {
        throw new AuthenticationError('Incorrect Login Credentials');
      }

      const token = signToken(user);
      return { token, user };
    },
    addEvent: async (parent, args, context) => {
      if (context.user) {
        if (args.end > args.start) {
          const event = await Event.create(args);

          await User.findOneAndUpdate(
            { _id: context.user._id },
            { $addToSet: { events: event._id } }
          );

          return event;
        } else {
          throw new Error('End time must occur after Start Time')
        }
    }
      throw new AuthenticationError('You need to be logged in!');
    },
    removeEvent: async (parent, { eventId }, context) => {
      if (context.user) {
        const event = await Event.findOneAndDelete({
          _id: eventId,
        });

        await User.findOneAndUpdate(
          { _id: context.user._id },
          { $pull: { events: eventId } }
        );

        return event;
      }
      throw new AuthenticationError('You need to be logged in!');
    },
    updateEvent: async (parent, args, context) => {
      if (context.user) {
        if (args.title && args.start && args.end) {
          if (args.end > args.start) {
            return Event.findOneAndUpdate(
              { _id: args.eventId },
              {
                $set: { ...args },
              },
              { new: true }
            );
          } else {
            throw new Error('End time must occur after Start Time')
          }
        } else {
          throw new Error('Title, Start, and End are required fields')
        }
      }
      throw new AuthenticationError('You need to be logged in!');
    },
  },

  Date: new GraphQLScalarType({
    name: 'Date',
    description: 'Date custom scalar type',
    parseValue(value) {
      return new Date(value);
    },
    serialize(value) {
      return value.getTime();
    },
    parseLiteral(ast) {
      if (ast.kind === Kind.INT) {
        return new Date(ast.value);
      }
      return null;
    },
  }),
};

module.exports = resolvers;