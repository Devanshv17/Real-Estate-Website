import React from 'react';
import { Pannellum } from "pannellum-react";

const ThreeDViewer = ({ image }) => (
  <div>
    <h1 className='text-center font-semibold text-2xl'>3d View of the Property</h1>
    <Pannellum
      width="444px"
      height="250px"
      image={image}
      pitch={10}
      yaw={180}
      hfov={110}
      autoLoad
      onLoad={() => {
          console.log("panorama loaded");
      }}
    />
  </div>
);

export default ThreeDViewer;
