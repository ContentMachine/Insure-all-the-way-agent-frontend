import Close from "@/assets/svgIcons/Close";
import classes from "./MessageModalBody.module.css";

type MessageModalBodyTypes = {
  onClose: () => void;
};

const MessageModalBody = ({ onClose }: MessageModalBodyTypes) => {
  return (
    <div className={classes.container}>
      <Close onClick={onClose} />
      <h2>Pick an Message Template</h2>
    </div>
  );
};

export default MessageModalBody;
