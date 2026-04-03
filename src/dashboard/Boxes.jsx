import React from "react";
import Box from "./boxes/Box";

const Boxes = () => {
  return (
    <div className="p-6 bg-slate-50 min-h-screen">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 items-center">
        <Box />
      </div>
    </div>
  );
};

export default Boxes;
