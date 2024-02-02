import { useCallback, useState } from "react";

import "./CreateTableComponent.css";

const columnTypes = [
    "Number",
    "String"
]

function CreateTableComponent() {
    const [height, setHeight] = useState(100);
    const [width, setWidth] = useState(170);

    const [data, setData] = useState([
        {
            "":"" 
        }
    ]);
    const [columns, setColumns] = useState([
        {
            name: "",
            colType: columnTypes[2]
        }
    ]);

    const isStoreEmpty = useCallback(() => {
        return true;
    },[])

    const generateNewTable = useCallback((event: React.MouseEvent<HTMLElement>) => {
        const button = (event.target as HTMLElement);
        const container = button.parentElement;

        button.hidden = true;

        console.log("table generation", container);
    }, [])

    const generateNewRow = () => {
        return (
            <div className="table-creator-container" style={{height: height, width: width}}>
                <button className="button button-success add-table-button" onClick={generateNewTable}>+</button>
            </div>
        )
    }

    const generateStoredTable = () => {
        return (<div>Stored</div>)
    }

    return (
      <div>
        {isStoreEmpty() ? (
            generateNewRow()
        ) : (
            generateStoredTable()
        )}
      </div>
    );
  }
  
  export default CreateTableComponent;