import Close from "@/assets/svgIcons/Close";
import Button from "../Button/Button";
import classes from "./SuccessModalBody.module.css";
import Image from "next/image";

type SuccessModalBodyType = {
  title: string;
  caption: string;
  buttontext?: string;
  onClick?: () => void;
  onClose: () => void;
};

const SuccessModalBody = ({
  title,
  caption,
  buttontext,
  onClick,
  onClose,
}: SuccessModalBodyType) => {
  return (
    <div className={classes.container}>
      <Close onClick={onClose} />
      <Image
        src="https://res.cloudinary.com/dfilepe0f/image/upload/v1740068648/Animation_-_1740068142351_1_dvggym.gif"
        width={200}
        height={200}
        alt="Success"
      />
      <h2>{title || "Success!"}</h2>
      {caption && <p>{caption}</p>}
      <Button
        type="secondary"
        onClick={() => {
          if (!onClick) {
            onClose();
          } else {
            onClick();
          }
        }}
      >
        {buttontext || "Okay"}
      </Button>
    </div>
  );
};

export default SuccessModalBody;
