import { gql } from '@apollo/client'; 

export const QUERY_USER = gql`
  query user($email: String!) {
    user( email: $email) {
      _id
      firstName
      lastName
      email
      password
      events {
        _id
        title
        date
        startTime
        endTime
      }
    }
  }
`;

export const QUERY_EVENTS = gql`
  query getEvents {
    events {
      _id
      title
      date
      startTime
      endTime
      location
      description
    }
  }
`;
