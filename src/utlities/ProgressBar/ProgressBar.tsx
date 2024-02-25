import { useState } from "react";
import "./ProgressBar.css";

function ProgressBar(props:any) {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [filledPercentage, setFilledPercentage] = useState(0);

  const handleDrag = (e: any) => {
    const { left, top, width, height } = e.target.getBoundingClientRect();
    const x = e.clientX - left;
    const y = e.clientY - top;

    // Calculate percentage filled
    const percentageX = (x / width) * 100;
    const percentageY = (y / height) * 100;
    const filled = Math.min(100, Math.max(0, (percentageX + percentageY) / 2));
    setFilledPercentage(filled);

    // Update position (ensure it stays in bounds)
    setPosition({
      x: Math.min(width, Math.max(0, x)),
      y: Math.min(height, Math.max(0, y))
    });
  };

  return (
    <div className="progress-bar-container">
        <div className="progress-bar-bar" style={{
          width: props.dimensions.width-10,
          height: props.dimensions.height-30
        }}>
        </div>
        <div className="progress-bar-text">25%</div>
    </div>
  );
}

export default ProgressBar;
