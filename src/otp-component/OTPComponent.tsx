import React, { ChangeEvent, useCallback, useState } from 'react';
import "./OTPComponent.css";

function OTPComponent(props: any) {
    const otpCode = props.otpCode;
    const [inputCode, setInputCode] = useState(["0","0","0","0"]);

    const checkInput = useCallback((input: string) => {
      return input === otpCode
    }, [])

    const inputKeyDown = useCallback((event: any, id: number) => {
      console.log("KeyDown", event);
      let newInput = [...inputCode];
      if(/^[0-9]$/i.test(event.key)){
        newInput[id] = event.key;

        setInputCode(newInput);
      }

      if(event.code === "Backspace" || event.code === "Delete"){
        newInput[id] = "";
        setInputCode(newInput);
      }
    }, []);

    const onChange = useCallback((event: ChangeEvent, id: number) => {
      // console.log("change", event, id);
    }, []);

    return (
      <div className="otp-component-main">
        <div className="otp-component-title">Enter the code ...</div>
        <div className="otp-component-input-wrapper">
            <div className="otp-component-input-wrapper">
                <input className='otp-component-input-input' onChange={(event) => onChange(event, 0)} value={inputCode[0]} maxLength={1} onKeyDown={(event) => inputKeyDown(event, 0)}></input>
                <input className='otp-component-input-input' onChange={(event) => onChange(event, 1)} value={inputCode[1]} maxLength={1} onKeyDown={(event) => inputKeyDown(event, 1)}></input>
                <input className='otp-component-input-input' onChange={(event) => onChange(event, 2)} value={inputCode[2]} maxLength={1} onKeyDown={(event) => inputKeyDown(event, 2)}></input>
                <input className='otp-component-input-input' onChange={(event) => onChange(event, 3)} value={inputCode[3]} maxLength={1} onKeyDown={(event) => inputKeyDown(event, 3)}></input>
            </div>
        </div>
        <button className='otp-component-submit-button'>SUBMIT</button>
      </div>
    );
  }
  
  export default OTPComponent;