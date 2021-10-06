import {
  exportComponentAsJPEG,
} from "react-component-export-image";
import React, { useRef } from "react";
import WorkBench from "../pages/WorkBench";
import { useDispatch } from "react-redux";
import {toolbarActions} from '../store/toolbarSlice'
const ComponentToPrint = React.forwardRef((props, ref) => (
  <div ref={ref}>
    <WorkBench />
  </div>
));

const MyComponent = () => {
  const componentRef = useRef();
  const dispatch = useDispatch()
  function captureImage(){
    dispatch(toolbarActions.resetLayoutShow())
    setTimeout(function(){exportComponentAsJPEG(componentRef)}, 300)
  }

  return (
    <div>
      <ComponentToPrint ref={componentRef} />
      <button className="btn btn-white" style={{position: "absolute", left: 820}} onClick={()=> captureImage()}>
        Export As JPEG
      </button>
    </div>
  );
};

export default MyComponent;
