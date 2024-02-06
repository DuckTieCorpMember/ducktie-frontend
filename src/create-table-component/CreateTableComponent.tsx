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
            Header1: "Row 1 H1",
            Header2: "Row 1 H2"   
        },{
            Header1: "Row 2 H1",
            Header2: "Row 2 H2"
        }]);
    }, [])

    return (
      <div>
        <div className="table-creator-container" style={{height: height, width: width}}>
            {dataSet.length === 0 ? (
                <button className="button button-success add-table-button" onClick={generateNewTable}>+</button>
            ) : (
                <div className="table-header-row">
                    {
                        Object.keys(dataSet[0]).map((key, index) => {
                            return <div className="table-header-cell-container" key={index}>
                                <div className="table-header-cell-item">{key}</div>
                            </div>
                        })
                    }
                </div>
                //create header row for each column
                    //decide what is active editor or cell
            
                //create rows
                    //decide what is actice edior or cell
                
                //render button on the left

                //render button on the right
            )}
        </div>
      </div>
    );
  }
  
  export default CreateTableComponent;