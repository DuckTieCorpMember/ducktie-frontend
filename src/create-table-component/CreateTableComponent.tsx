import { useCallback, useState } from "react";

import "./CreateTableComponent.css";

const columnTypes = [
    "Number",
    "String"
]

function CreateTableComponent() {
    const [height, setHeight] = useState(100);
    const [width, setWidth] = useState(170);

    const [dataSet, setDataSet] = useState<any[]>([])

    const generateNewTable = useCallback((event: React.MouseEvent<HTMLElement>) => {
        (event.target as HTMLElement).hidden = true;

        setDataSet([{
            "Header 1": ""   
        }]);

        // generateStoredTable();
    }, [])

    const generateNewRow = () => {
        return (
            <button className="button button-success add-table-button" onClick={generateNewTable}>+</button>
        )
    }

    const generateStoredTable = () => {
        // console.log("Table generator");
        return (<div>Stored</div>)
    }

    return (
      <div>
        <div className="table-creator-container" style={{height: height, width: width}}>
            {dataSet.length === 0 ? (
                generateNewRow()
            ) : (
                generateStoredTable()
            )}
        </div>
      </div>
    );
  }
  
  export default CreateTableComponent;