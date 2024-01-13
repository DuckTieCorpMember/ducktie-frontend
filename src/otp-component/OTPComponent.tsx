import React, { useCallback, useState } from 'react';
import "./OTPComponent.css";

function OTPComponent(props: any) {
    const otpCode = props.otpCode;
    const [inputCode, setInputCode] = useState([0,0,0,0]);

    const checkInput = useCallback((input: string) => {
        return input === otpCode
    }, [])

    const inputKeyDown = useCallback((event: any, id: number) => {
        console.log(event);
    }, []);

    return (
      <div className="otp-component-main">
          <div className="otp-component-input-wrapper">
              <div className="otp-component-input-input-wrapper">
                  <input className='otp-component-input-input' maxLength={1} onKeyDown={(event) => inputKeyDown(event, 0)}></input>
              </div>
          </div>
      </div>
    );
  }
  
  export default OTPComponent;