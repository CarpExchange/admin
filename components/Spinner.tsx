import { LoaderCircle } from "lucide-react";
import React from "react";

const Spinner = () => {
  return (
    <div className="h-[150px] flex justify-center items-center">
      <LoaderCircle color="#1A6EFF" size={26} />{" "}
    </div>
  );
};

export default Spinner;
