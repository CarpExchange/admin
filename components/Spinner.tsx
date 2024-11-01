import { LoaderCircle } from "lucide-react";
import React from "react";

type Props = {
  color?: string;
}

const Spinner = ({color = "#1A6EFF"} : Props) => {
  return (
    <div className="h-[150px] flex justify-center items-center">
      <LoaderCircle color={color} size={26} />{" "}
    </div>
  );
};

export default Spinner;
