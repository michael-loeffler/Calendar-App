import { gql } from '@apollo/client'; 

export const QUERY_EVENTS = gql`
  query getEvents($email: String!) {
    getEvents(email: $email) {
      events {
        _id
        title
        start
        end
        location
        description
        allDay
        color
      }
    }
  }
`;
