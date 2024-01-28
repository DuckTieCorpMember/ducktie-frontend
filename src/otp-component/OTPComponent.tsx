import { ChangeEvent, useCallback, useEffect, useRef, useState } from 'react';
import {CSSTransition} from 'react-transition-group';

import "./OTPComponent.css";
import LoadingComponent from '../utilities/LoadingComponent/LoadingComponent';
import SuccessComponent from '../utilities/SuccessComponent/SuccessComponent';

import { OTPStatus } from '../data';

function OTPComponent(props: any) {
    const inputWrapperRef = useRef<HTMLDivElement>(null)
    const otpCode = props.otpCode.toString().split("");
    const [inputCode, setInputCode] = useState(Array.from({ length: otpCode.length }, () => ''));
    const [checkState, setCheckState] = useState(OTPStatus.INPUT);

    const cardRef = useRef(null);

    const isValid = useCallback(() => {
      for(let i=0; i<otpCode.length; i++){
        if(otpCode[i] !== inputCode[i]){
          return false;
        }
      }

      return true;
    }, [inputCode, otpCode])

    useEffect(() => {
      if(isValid() && checkState === OTPStatus.INPUT){
        setCheckState(OTPStatus.CHECKING);  
        return;   
      }

      if(checkState === OTPStatus.CHECKING){
        const timeout = setTimeout(() => {
          setCheckState(OTPStatus.SUCCESS);
        }, 3000);
        return () => clearTimeout(timeout);
      }
    }, [inputCode, checkState, isValid])

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
    }, []);

    return (
      <div>
        <div className="dt-otp-component-main">
          <CSSTransition in={checkState === OTPStatus.INPUT || checkState === OTPStatus.SUCCESS} timeout={1000} classNames='flip' nodeRef={cardRef}>
            <div ref={cardRef} className='card'>
              <div className="card-back">
                <LoadingComponent text="Checking ..." hidden={checkState !== OTPStatus.CHECKING}></LoadingComponent>
              </div>              
              <div className="card-front">
              {checkState !== OTPStatus.SUCCESS ? (
                <div className="dt-otp-component-main-wrapper" style={checkState !== OTPStatus.INPUT ? { display: 'none' } : {}}>
                <div className="dt-otp-component-title">Enter the code ...</div>
                <div ref={inputWrapperRef} className="dt-otp-component-input-wrapper">
                    <div className="dt-otp-component-input-wrapper">
                    {
                      inputCode.map(function(value, index){
                        return <input className='dt-otp-component-input-input' onChange={(event) => onChange(event, index)} value={inputCode[index]} maxLength={1} onKeyDown={(event) => inputKeyDown(event, index)}></input>;
                      })
                    }
                    </div>
                </div>
                <button className='dt-otp-component-submit-button'>SUBMIT</button>
              </div>
              ) : (
                <SuccessComponent text="Approved!" hidden={checkState !== OTPStatus.SUCCESS}></SuccessComponent>
              )}
              </div>
            </div>
          </CSSTransition>
        </div>

      </div>
    );
  }
  
  export default OTPComponent;