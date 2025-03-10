import React from "react";

type PlayTypes = {
  color?: string;
};

const Play = ({ color }: PlayTypes) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      height="30px"
      viewBox="0 -960 960 960"
      width="30px"
      fill={color || "#5f6368"}
    >
      <path d="M320-200v-560l440 280-440 280Zm80-280Zm0 134 210-134-210-134v268Z" />
    </svg>
  );
};

export default Play;
