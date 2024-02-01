import { useCallback, useState } from "react";

import "./CreateTableComponent.css";

function CreateTableComponent() {
    const [height, setHeight] = useState(100);
    const [width, setWidth] = useState(170);

    const isStoreEmpty = useCallback(() => {
        return true;
    },[])

    const generateNewRow = () => {
        return (<div className="table-creator-container" style={{height: height, width: width}}></div>)
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