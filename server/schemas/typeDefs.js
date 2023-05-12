const { gql } = require('apollo-server-express');

const typeDefs = gql`
  scalar Date

  type User {
    _id: ID!
    firstName: String!
    lastName: String!
    email: String!
    password: String!
    events: [Event]
  }

  type Event {
    _id: ID!
    title: String!
    start: Date!
    end: Date!
    location: String
    description: String
    allDay: Boolean
    color: String
  }

  type Auth {
    token: ID!
    user: User
  }

  type Query {
    getEvents(email: String!): User
  }

  type Mutation {
    addUser(firstName: String!, lastName: String!, email: String!, password: String!): Auth
    loginUser(email: String!, password: String!): Auth
    addEvent(title: String!, start: Date!, end: Date!, location: String, description: String, allDay: Boolean, color: String): Event
    removeEvent(eventId: ID!): Event
    updateEvent(eventId: ID!, title: String, start: Date, end: Date, location: String, description: String, allDay: Boolean, color: String): Event
  }
`;

module.exports = typeDefs;