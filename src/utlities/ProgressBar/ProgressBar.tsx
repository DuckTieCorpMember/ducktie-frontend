import { useCallback, useEffect, useState } from "react";
import "./ProgressBar.css";

function ProgressBar(props:any) {
  const maxWidth = props.dimensions.width;
  const minWidth = 20;

  const [initialX, setInitialX] = useState(0);
  const [isResizing, setIsResizing] = useState(false);
  const [currentPercentage, setCurrentPercentage] = useState(0);
  const [currentWidth, setCurrentWidth] = useState(0);
  
  const handleMouseDown = useCallback((e:React.MouseEvent) => {
    setIsResizing(true);
    // console.log("Mouse Down");
    e.stopPropagation();
  }, []);

  const handleMouseUp = useCallback((e:React.MouseEvent) => {
    if(isResizing){
      const newWidth = e.clientX-initialX;
      setCurrentWidth(newWidth);
    }

    setIsResizing(false);
    // console.log("Mouse Up");
    const currProgress = Math.ceil((100 * (currentWidth-minWidth+4))/(maxWidth-minWidth+4));
    if(currentPercentage !== currProgress){
      if(currentWidth < minWidth){
        setCurrentPercentage(0);
      } else if(currentWidth > maxWidth-10) {
        setCurrentPercentage(100);
      }else{
        setCurrentPercentage(currProgress);
      }
    }
  }, [currentPercentage, currentWidth, initialX, isResizing, maxWidth]);

  const handleMouseMove = useCallback((e:any) => {
    if (!isResizing) return;

    const newWidth = e.clientX-initialX;
    setCurrentWidth(newWidth);
  },[initialX, isResizing]);

  useEffect(()=>{
    const element = document.getElementsByClassName('progress-bar-text')[0];
    if (element) {
      const rect = element.getBoundingClientRect();
      const newX = rect.left-maxWidth/2+minWidth+2;
      // console.log(rect.left, newX);
      if(newX !== initialX)
        setInitialX(newX);
    }
  },[maxWidth, initialX]);

  return (
    <div className="progress-bar-container"
      onMouseMove={handleMouseMove}
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}>
        <div className="progress-bar-bar" style={{
          minWidth: minWidth,
          maxWidth: maxWidth,
          left: initialX,
          width: currentWidth,
          height: props.dimensions.height-10,
        }}
        >
        </div>
        <div className="progress-bar-text unselectable">{currentPercentage}%</div>
    </div>
  );
}

export default ProgressBar;
