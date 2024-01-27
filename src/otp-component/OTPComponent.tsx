import { ChangeEvent, useCallback, useEffect, useRef, useState } from 'react';
import {CSSTransition} from 'react-transition-group';

import "./OTPComponent.css";
import LoadingComponent from '../utilities/LoadingComponent/LoadingComponent';
import SuccessComponent from '../utilities/SuccessComponent/SuccessComponent';

import { OTPStatus } from '../data';

function OTPComponent(props: any) {
    const inputWrapperRef = useRef<HTMLDivElement>(null)
    const otpCode = props.otpCode.toString().split("");
    const [inputCode, setInputCode] = useState(["","","",""]);
    const [checkState, setCheckState] = useState(OTPStatus.INPUT);

    const [showFront, setShowFront] = useState(true);
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
        }, 2000);
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
      // console.log("change", event, id);
    }, []);

    return (
      <div>
        <div className="dt-otp-component-main">
          <LoadingComponent text="Checking ..." hidden={checkState !== OTPStatus.CHECKING}></LoadingComponent>
          <SuccessComponent text="Approved!" hidden={checkState !== OTPStatus.SUCCESS}></SuccessComponent>
          <div className="dt-otp-component-main-wrapper" style={checkState !== OTPStatus.INPUT ? { display: 'none' } : {}}>
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

        <div className="flippable-card-container">
          <CSSTransition in={showFront} timeout={300} classNames='flip' nodeRef={cardRef}>
            <div ref={cardRef} className='card' onClick={() => {
              setShowFront(!showFront);
            }}>
              <div className="card-back">Back</div>
              <div className="card-front">Front</div>
            </div>
          </CSSTransition>
        </div>

      </div>
    );
  }
  
  export default OTPComponent;

  // 1234