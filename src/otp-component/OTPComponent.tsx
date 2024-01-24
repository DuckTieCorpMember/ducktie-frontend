import React, { ChangeEvent, useCallback, useEffect, useRef, useState } from 'react';
import "./OTPComponent.css";
import LoadingComponent from '../utilities/LoadingComponent/LoadingComponent';

function OTPComponent(props: any) {
    const inputWrapperRef = useRef<HTMLDivElement>(null)
    const otpCode = props.otpCode.toString().split("");
    const [inputCode, setInputCode] = useState(["","","",""]);
    const [isSuccess, setIsSuccess] = useState(false);
    const isValid = useCallback(() => {
      for(let i=0; i<otpCode.length; i++){
        if(otpCode[i] !== inputCode[i]){
          return false;
        }
      }

      return true;
    }, [inputCode, otpCode])

    useEffect(() => {
      if(isValid()){
        setIsSuccess(true);
      }
    }, [inputCode, isValid])

    const inputKeyDown = useCallback( async (event: any, id: number) => {
      console.log("KeyDown", event);
      let newInput = [...inputCode];

      if(event.ctrlKey && event.key === "v"){
        const clipboard = (await navigator.clipboard.readText()).split("");
        console.log("ClipBoard:",clipboard);
        if(clipboard.length !== otpCode.length){
          return;
        }
        for(let i=0; i<clipboard.length; i++){
          newInput[i] = clipboard[i];
          setInputCode(newInput);
        }
        return;
      }

      if(/^[0-9]$/i.test(event.key)){
        newInput[id] = event.key;
        if(id < inputCode.length-1){
          (document.querySelectorAll(".dt-otp-component-input-input")[id+1] as HTMLInputElement)?.focus();
        }
        setInputCode(newInput);
        return;
      }

      if(event.code === "Backspace" || event.code === "Delete"){
        newInput[id] = "";
        setInputCode(newInput);

        return;
      }
    }, [inputCode, otpCode]);

    const onChange = useCallback((event: ChangeEvent, id: number) => {
      // console.log("change", event, id);
    }, []);

    return (
      <div className="dt-otp-component-main">
        <LoadingComponent hidden={!isSuccess}></LoadingComponent>
        <div className="dt-otp-component-main-wrapper" style={isSuccess ? { display: 'none' } : {}}>
          <div className="dt-otp-component-title">Enter the code ...</div>
          <div ref={inputWrapperRef} className="dt-otp-component-input-wrapper">
              <div className="dt-otp-component-input-wrapper">
                  <input className='dt-otp-component-input-input' onChange={(event) => onChange(event, 0)} value={inputCode[0]} maxLength={1} onKeyDown={(event) => inputKeyDown(event, 0)}></input>
                  <input className='dt-otp-component-input-input' onChange={(event) => onChange(event, 1)} value={inputCode[1]} maxLength={1} onKeyDown={(event) => inputKeyDown(event, 1)}></input>
                  <input className='dt-otp-component-input-input' onChange={(event) => onChange(event, 2)} value={inputCode[2]} maxLength={1} onKeyDown={(event) => inputKeyDown(event, 2)}></input>
                  <input className='dt-otp-component-input-input' onChange={(event) => onChange(event, 3)} value={inputCode[3]} maxLength={1} onKeyDown={(event) => inputKeyDown(event, 3)}></input>
              </div>
          </div>
          <button className='dt-otp-component-submit-button'>SUBMIT</button>
        </div>
      </div>
    );
  }
  
  export default OTPComponent;

  // 1234