import {
  exportComponentAsJPEG,
} from "react-component-export-image";
import React, { useRef } from "react";
import WorkBench from "../pages/WorkBench";

const ComponentToPrint = React.forwardRef((props, ref) => (
  <div ref={ref}>
    <WorkBench />
  </div>
));

const MyComponent = () => {
  const componentRef = useRef();

  return (
    <div>
      <ComponentToPrint ref={componentRef} />
      <button className="btn btn-white" onClick={() => exportComponentAsJPEG(componentRef)}>
        Export As JPEG
      </button>
    </div>
  );
};

export default MyComponent;
