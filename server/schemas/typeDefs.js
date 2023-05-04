const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type User {
    _id: ID
    firstName: String!
    lastName: String!
    email: String!
    password: String!
    events: [Event]
  }

  type Event {
    _id: ID
    title: String!
    date: Date!
    startTime: Date!
    endTime: Date!
    location: String
    description: String
  }

  type Auth {
    token: ID!
    user: User
  }

  type Query {
  
  }

  type Mutation {
  
  }
`;

module.exports = typeDefs;