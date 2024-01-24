import "./LoadingComponent.css";

function LoadingComponent(props: any) {
  const isHidden = props.hidden;
    return (
      <div className="dt-loading-component" hidden={isHidden}>
        <div className="dt-loading-component-text">
          {props.text}
        </div>
      </div>
    );
  }
  
  export default LoadingComponent;
  