import React from 'react';
import './App.css';

import Service from './data';

import OTPComponent from './otp-component/OTPComponent';

const service = new Service();

function App() {
  return (
    <div className="main">
      <OTPComponent otpCode={service.getOTP()}></OTPComponent>
    </div>
  );
}

export default App;
