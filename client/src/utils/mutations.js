import { gql } from '@apollo/client'; 

export const LOGIN_USER = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        _id
        email
      }
    }
  }
`;

export const ADD_USER = gql`
  mutation signup($firstName: String!, $lastName: String!, $email: String!, $password: String!) {
    signup(firstName: $firstName, lastName: $lastName, email: $email, password: $password) {
      token
      user {
      _id
      email
      }
    }
  }
`;

export const ADD_EVENT = gql`
  mutation addEvent($title: String!, $start: Date!, $end: Date!, $location: String, $description: String, $allDay: Boolean) {
    addEvent(title: $title, start: $start, end: $end, location: $location, description: $description, allDay: $allDay) {
      _id
      title
      start
      end
      location
      description
      allDay
    }
  }
`;

export const REMOVE_EVENT = gql`
  mutation removeEvent($eventId: ID!) {
  removeEvent(eventId: $eventId) {
    _id
     title
     start
     end
     location
     description
     allDay 
    }
  } 
`;

export const UPDATE_EVENT = gql`
  mutation updateEvent($title: String!, $start: Date!, $end: Date!, $location: String, $description: String, $allDay: Boolean) {
    updateEvent(title: $title, start: $start, end: $end, location: $location, description: $description, allDay: $allDay) {
      _id
      title
      start
      end
      location
      description
      allDay
    }
  }
`;