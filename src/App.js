import './App.css';
import React, { useEffect, useState } from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from './pages/home'
import SigninPage from './pages/signin'
import SignupPage from './pages/signup';
import EditPage from './pages/edit';
import Details from './components/Details';
import CreateEvent from './components/CreateEvent';
import UserEvents from './components/UserEvents';
import MyEvents from './components/MyEvents';
import EventReservationsRequests from './components/EventReservationsRequests';
import EventReservations from './components/EventReservations';
import EventType from './components/EventType';
import UserReservations from './components/UserReservations';

function App() {
  return (
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path="/signin" element={<SigninPage />} />
      <Route path="/signup" element={<SignupPage />} />
      <Route path='/lectures/:lectureId'  element={<EditPage />} />
      <Route path='/requests/:lectureId' element={<EventReservationsRequests />} />
      <Route path='/reservations/:lectureId' element={<EventReservations />} />
      <Route path='/details/:lectureId' element={<Details/>} />
      <Route path='/create/:eventType' element={<CreateEvent/>} />
      <Route path='/userEvents' element={<UserEvents />} />
      <Route path='/myevents' element={<MyEvents />} />
      <Route path='/create' element={<EventType />} />
      <Route path='/reservations' element={<UserReservations/>}/>
    </Routes>
  );
}

export default App;
