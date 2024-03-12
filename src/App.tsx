import React, { useState } from 'react';
import './App.css';

import Service from './data';

import OTPComponent from './otp-component/OTPComponent';
import CreateTableComponent from './create-table-component/CreateTableComponent';
import ProgressBar from './utlities/ProgressBar/ProgressBar';
import ToDoComponent from './ToDoComponent/ToDoComponent';

const service = new Service();

function App() {
  const [progressBarDims, setProgressBarDims] = useState({
    width: 250,
    height: 50,
  })

  return (
    <div className="main">
      <OTPComponent otpCode={service.getOTP()}></OTPComponent>
      <br/>
      <div style={progressBarDims}>
        <ProgressBar dimensions={progressBarDims}></ProgressBar>
      </div> 
      <br/>
      <ToDoComponent></ToDoComponent>     
      <br/>
      <CreateTableComponent></CreateTableComponent>
    </div>
  );
}

export default App;
