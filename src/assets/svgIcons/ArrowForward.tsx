import React from "react";

type ArrowForwardType = {
  isActive?: boolean;
};

const ArrowForward = ({ isActive }: ArrowForwardType) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      height="50px"
      viewBox="0 -960 960 960"
      width="24px"
      fill={isActive ? "#fff" : "#5f6368"}
    >
      <path d="M647-440H160v-80h487L423-744l57-56 320 320-320 320-57-56 224-224Z" />
    </svg>
  );
};

export default ArrowForward;
