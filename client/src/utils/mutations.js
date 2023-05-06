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
  mutation signup ($firstName: String!, $lastName: String!, $email: String!, $password: String!) {
    signup(firstName: $firstName, lastNAme: $lastName, email: $email, password: $password) {
      token
      user {
      _id
      email
      }
    }
  }
`;

export const ADD_EVENT = gql`
  mutation addEvent ($title: String!, $date: Date!, $startTime: Date!, $endTime: Date!, $location: String, $description: String) {
    addEvent( title: $title, date: $date, startTime: $startTime, endTime: $endTime, location: $location, description: $description) {
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


