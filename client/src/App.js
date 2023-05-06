import logo from './logo.svg';
import './App.css';
import React, { useEffect, useState } from "react";

import { Calendar, Views, dayjsLocalizer } from 'react-big-calendar'
import dayjs from 'dayjs'

const localizer = dayjsLocalizer(dayjs)

function App() {

  return (
    <div className="height600">
      <Calendar
        // components={components}
        // defaultDate={defaultDate}
        // events={events}
        localizer={localizer}
        showMultiDayTimes
        step={60}
        // views={views}
        // events={myEventsList}
        startAccessor="start"
        endAccessor="end"
        // style={{ height: 500 }}
      />
    </div>
  )
  

}
 
export default App;