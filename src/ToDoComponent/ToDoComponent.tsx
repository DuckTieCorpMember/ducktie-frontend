import { useCallback, useState } from "react";
import "./ToDoComponent.css";
import { Task, formatDate } from "../type";
import ProgressBar from "../utlities/ProgressBar/ProgressBar";

function ToDoComponent() {
  const [height, setHeight] = useState(100);
  const [width, setWidth] = useState(170);
  const [dataSet, setDataSet] = useState<Task[]>([]);

  const generateData = useCallback(() => {
    setDataSet(  [
      {
        taskName: "Task Name 1",
        progress: 22,
        deadlineDate: new Date("02/02/2024"),
        taskNote: "A little note for the upcoming event",
        location: {
          relative:{
            x: 5,
            y: 2
          }
        }
      }
    ])
    setHeight(150);
    setWidth(600);
  }, []);
  
  return (
    <div>
        <div className="table-creator-container" style={{height: height, width: width}}>
        {dataSet.length === 0 ? (
          <button className="button button-success add-table-button" onClick={generateData}>+</button>
        ):(
          <table>
              <colgroup>
                <col/>
                <col width="200px"/>
                <col/>
                <col/>
                <col/>
              </colgroup>
            <tbody>
            <tr>
              <th>Task Name</th>
              <th>Progress</th>
              <th>Deadline date</th>
              <th>Task Note</th>
              <th>Locatioon</th>
            </tr>
            {
              dataSet.map((rowData:Task|any, rowKey) => {
                console.log("ROW: ", rowKey);
                return (<tr key={rowKey}>
                {
                  Object.keys(rowData).map((field, cellKey) => {
                    console.log(rowData, field);
                    if(field === "deadlineDate"){
                      return <td>{formatDate(rowData.deadlineDate)}</td>
                    } else if(field === "location"){
                      return <td>{JSON.stringify(rowData.location)}</td>
                    } else if(field === "progress"){
                      return (<td>
                        <ProgressBar dimensions={{
                            width: 200,
                            height: 30
                        }}></ProgressBar>
                      </td>)
                    } else {
                      return (<td key={cellKey}>{rowData[field]}</td>)
                    }
                  })
                }</tr>)
              })
            }
            </tbody>
          </table>
        )}
        </div>
    </div>
  );
}

export default ToDoComponent;
