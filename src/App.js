import "./App.css"
import React, { useState, useEffect} from 'react';
import {Helmet} from "react-helmet"
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import {HomePage} from './components/HomePage'
import {LoginPage} from './components/LoginPage'
import {ClearDataPage} from './components/ClearDataPage'
import {SubmitPage} from './components/SubmitPage'

// Check if the login-box element is not null
export const App = () => {
  return(
    <div>
    <Helmet>
      <meta charSet="utf-8"/>
      <title> Gimnaziul Casunca </title>
      <link rel="canonical" href="https://gimnaziucasunca.web.app/"/>
      <meta name="description" content="Gimnaziul Casunca"/>
    </Helmet>
    <Router>
      <Routes>
        <Route path="/" element = {<HomePage/>} />
        <Route path="/login" element = {<LoginPage/>} />
        <Route path="/about" element = {<ClearDataPage/>} />
        <Route path="/modify" element = {<SubmitPage/>} />
      </Routes>
    </Router>
    </div>
    );
}
export default App;
