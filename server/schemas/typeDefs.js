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
  }

  type Auth {
    token: ID!
    user: User
  }

  type Query {
    getEvents(email: String!): User
  }

  type Mutation {
    signup(firstName: String!, lastName: String!, email: String!, password: String!): Auth
    login(email: String!, password: String!): Auth
    addEvent(title: String!, start: Date!, end: Date!, location: String, description: String, allDay: Boolean): Event
    removeEvent(eventId: ID!): Event
    updateEvent(eventId: ID!, title: String, start: Date, end: Date, location: String, description: String, allDay: Boolean): Event
  }
`;

module.exports = typeDefs;