type ArrowBackType = {
  isActive?: boolean;
  onClick?: () => void;
};

const ArrowBack = ({ isActive, onClick }: ArrowBackType) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      height="24px"
      viewBox="0 -960 960 960"
      width="24px"
      fill={isActive ? "#fff" : "#5f6368"}
      onClick={onClick}
    >
      <path d="m313-440 224 224-57 56-320-320 320-320 57 56-224 224h487v80H313Z" />
    </svg>
  );
};

export default ArrowBack;
