import { useCallback, useEffect, useState } from "react";

import "./CreateTableComponent.css";

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

    useEffect(() => {
        if(dataSet.length>0){
            setWidth(Object.keys(dataSet[0]).length*200+50);
            setHeight((dataSet.length+1)*50+50);
        }
    }, [dataSet]);

    return (
      <div>
        <div className="table-creator-container" style={{height: height, width: width}}>
            {dataSet.length === 0 ? (
                <button className="button button-success add-table-button" onClick={generateNewTable}>+</button>
            ) : (
                <div className="table-creator-main-wrapper">
                {/* // DONE: create header row for each column                     */}
                <div className="table-header-row">
                    {
                        Object.keys(dataSet[0]).map((key, index) => {
                            // decide what is active editor or cell
                            return <div className="table-header-cell-container" key={index}>
                                <div className="table-header-cell-item">{key}</div>
                            </div>
                        })
                    }
                </div>
            
                {/* //create rows */}
                    {/* //decide what is actice edior or cell */}
                <div className="table-creator-rows-container">
                    {
                        dataSet.map((data, index) => {
                            return <div key={index} className="table-creator-row">
                                {
                                    Object.keys(dataSet[index]).map((key, jIndex) => {
                                        return <div className="table-creator-cell" key={jIndex}>
                                            <div>{data[key]}</div>
                                        </div>
                                    })
                                }
                            </div>
                        })
                    }
                </div>
                {/* //render button on the left */}

                {/* //render button on the right */}
                </div>
            )}
        </div>
      </div>
    );
  }
  
  export default CreateTableComponent;