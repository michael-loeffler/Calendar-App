import { gql } from '@apollo/client'; 

export const LOGIN_USER = gql`
  mutation loginUser($email: String!, $password: String!) {
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
  mutation addUser($firstName: String!, $lastName: String!, $email: String!, $password: String!) {
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
  mutation addEvent($title: String!, $start: Date!, $end: Date!, $location: String, $description: String, $allDay: Boolean, $color: String) {
    addEvent(title: $title, start: $start, end: $end, location: $location, description: $description, allDay: $allDay, color: $color) {
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
     color
    }
  } 
`;

export const UPDATE_EVENT = gql`
  mutation updateEvent($title: String!, $start: Date!, $end: Date!, $location: String, $description: String, $allDay: Boolean, $color: String) {
    updateEvent(title: $title, start: $start, end: $end, location: $location, description: $description, allDay: $allDay, color: $color) {
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
`;
