import React from 'react';
import './App.css';

import Service from './data';

import OTPComponent from './otp-component/OTPComponent';
import CreateTableComponent from './create-table-component/CreateTableComponent';

const service = new Service();

function App() {
  return (
    <div className="main">
      <OTPComponent otpCode={service.getOTP()}></OTPComponent>
      <hr/>
      <CreateTableComponent></CreateTableComponent>
    </div>
  );
}

export default App;
