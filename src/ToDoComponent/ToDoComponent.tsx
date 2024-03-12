import { useCallback, useState } from "react";
import "./ToDoComponent.css";
import { todoList } from "../type";

function ToDoComponent() {
  const [height, setHeight] = useState(100);
  const [width, setWidth] = useState(170);

  const generateData = useCallback(() => {
    todoList
  }, []);
  
  return (
    <div>
        <div className="table-creator-container" style={{height: height, width: width}}>
        {todoList.length === 0 ? (
          <button className="button button-success add-table-button" onClick={generateData}>+</button>
        ):(
          <div></div>
        )}
        </div>
    </div>
  );
}

export default ToDoComponent;
