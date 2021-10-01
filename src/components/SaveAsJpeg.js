import { exportComponentAsJPEG, exportComponentAsPDF, exportComponentAsPNG } from 'react-component-export-image';
import React, { useRef } from 'react';
import WorkBench from '../pages/WorkBench';

const ComponentToPrint = React.forwardRef((props, ref) => (
  <div ref={ref}><WorkBench/></div>
));

const MyComponent = () => {
  // debugger
  const componentRef = useRef();

  return (
    <div>
      <ComponentToPrint ref={componentRef} />
      <button onClick={() => exportComponentAsJPEG(componentRef)}>
        Export As JPEG
      </button>
      {/* <button onClick={() => exportComponentAsPDF(componentRef)}>
        Export As PDF
      </button>
      <button onClick={() => exportComponentAsPNG(componentRef)}>
        Export As PNG
      </button> */}
      
    </div>
  );
};

export default MyComponent;