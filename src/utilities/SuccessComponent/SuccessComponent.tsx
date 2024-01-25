import "./SuccessComponent.css";

function SuccessComponent(props: any) {
  const isHidden = props.hidden;
    return (
      <div className="dt-success-component" style={isHidden ? { display: 'none' } : {}}>
        <div className="dt-success-component-text">
          {props.text}
        </div>
      </div>
    );
  }
  
  export default SuccessComponent;
  