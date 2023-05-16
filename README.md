# HourGlass
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

## Description

HourGlass is an interactive full-stack MERN application that allows users to organize their daily tasks and events. Upon visiting our deployed application Users will be prompted to register using their email address. From there they are presented with the ability to create events in a multifaceted way, one by clicking a 'Create Event' button and two by dragging from one date to another. When creating an event, the user is asked to provide required pieces of information such as: the title of the event, the date/time that the event begins and the date/time that the event ends. In addition to the required pieces of information, users are also able to add the location of the event, a description of the event, as well as the background color for when the event appears on the calendar. Upon adding events to the calendar, the user will be able to view those events in various views, including: Month, Week, Work Week, Daily, and Agenda. If a User would like to update their events all they need to do is click on the event and either update the detail or delete the event entirely. 

Our team set out to showcase our proficiency in working with React, Express, Node, and Mongoose by building a comprehensive MERN calendar application using React-Big-Calendar. The primary objective was to create a seamless and user-friendly calendar app that could effectively manage schedules, appointments, and events. Throughout the project, we honed our skills in utilizing the MVP framework to build a dynamic full-stack application with a polished front-end and robust back-end.

Some of the key learning points include:

* Understanding mutations and props in React for passing data between components
* Utilizing TailwindCSS to style and design the user interface for a cohesive and modern look
* Implementing React-Big-Calendar for a fully functional and customizable calendar component
* Building a MERN stack application with MongoDB, Express, React, and Node.js

## Table of Contents
        
- [User Story](#user-story)
- [Acceptance Criteria](#acceptance-criteria)
- [Installation](#installation-if-you-would-like-to-clone-the-repo-and-work-from-the-backend-otherwise-simply-visit-the-deployed-application)
- [Link to Deployed Application](#link-to-deployed-application)
- [Credits](#credits)
- [License](#license)
- [Contributing](#contributing)
- [Questions for the Team?](#questions-for-the-team)
- [Initial Wireframe from brainstorming session](#initial-wireframe-from-brainstorming-session)

## User Story
```
AS A busy individual
I WANT one calendar tool to store all of my commitments/events/reminders
SO THAT I can stay organized and effective in my daily life

```
## Acceptance Criteria
```
GIVEN a calendar tool
WHEN I arrive at the homepage
THEN I am prompted to signup or log in
WHEN I use the signup form
THEN I am asked to provide my name, email address, and password to create a new account, and logged into the site
WHEN I use the login form
THEN I am input my email and password and am logged into the site
WHEN I am logged in and view the homepage
THEN I see a monthly calendar view with the current date highlighted 
WHEN I click on the “new event” button
THEN I am asked to provide a title (required), start (req), end (req), location (optional), description (opt), allDay (opt), color (opt)
WHEN I have entered the above information and click “Create”
THEN my event appears on my calendar view
WHEN I click on an event
THEN I am shown more details, and buttons to either update or delete the event
WHEN I click on the delete button on an event
THEN the event is removed from my calendar
WHEN I click on the update button on an event
THEN the create event pop-up appears, preloaded with the current data for that event
WHEN I click on a day or drag to select a timeslot
THEN the “New Event” modal appears
WHEN I click on the “Today” button
THEN the calendar snaps to the current day and time
```
 
## Installation (if you would like to clone the repo and work from the backend; otherwise simply [visit the deployed application](https://sleepy-sierra-54387.herokuapp.com/)) 
1. Install Node.js
    - [Download Version 16 of Node.js](https://nodejs.org/download/release/v16.18.0/node-v16.18.0-x64.msi)
2. Clone this repo
   ```sh
   git clone https://github.com/michael-loeffler/Calendar-App
   ```
3. Install the dependencies included in the package.json
   ```sh
   npm i
   ```
4. Start the server by using the following command in the command-line
   ```sh
   npm run develop
   ```
5. Open the site on your local host (e.g., http://localhost:3001/)

## Link to deployed application
[https://sleepy-sierra-54387.herokuapp.com/](https://sleepy-sierra-54387.herokuapp.com/)

## Credits
Portions of this application were borrowed from EDX Coding Bootcamp in-class activities and homework challenges:
- SignupForm, LoginForm, and Navbar -- Homework Challenge #21
- Client-side and Server-side auth.js files -- Homework Challenge #21
- ApolloClient and Server setup/configuration

Node packages used:
  - Bcrypt
  - Apollo
  - GraphQL
  - Express
  - Jsonwebtoken
  - Mongoose
  - React
  - Jwt-decode
  - Dayjs

## License
    
Covered under the MIT License. For more details and to view the license in full, please visit the [MIT License Webpage](https://choosealicense.com/licenses/mit/).

## Contributing
    
If you have a suggestion for improvement, please fork the repo and create a pull request. You can also open an issue and tag it for "enhancement".
1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/featureName`)
3. Commit your Changes (`git commit -m 'adds featureName'`)
4. Push to the Branch (`git push origin feature/featureName`)
5. Open a Pull Request

## Questions for the Team?

* Cameron Dassow: Please visit my [GitHub profile: cameronjoshua](https://github.com/cameronjoshua) or [email me with questions](mailto:cameronda145@gmail.com)
* Michael Loeffler: Please visit my [GitHub profile: michael-loeffler](https://github.com/michael-loeffler) or [email me with questions](mailto:michaeloeffler23@gmail.com)
* Adam Michell: Please visit my [GitHub profile: variegatedhuman](https://github.com/Variegatedhuman) or [email me with questions](mailto:agmspu@gmail.com)
* Maria Rodriguez: Please visit my [GitHub profile: dltorrise](https://github.com/https://github.com/mariadolores06e) or [email me with questions](mailto:mrodriguez.psychology@gmail.com)

## Initial Wireframe from brainstorming session
[Wireframe of Project 3](https://docs.google.com/presentation/d/1feiebIIicAXNLAH9tOJjR_aN7jJm15KslnMn_zxsYLM/edit#slide=id.g2216435a615_4_15)

# Getting Started with Create React App
This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

