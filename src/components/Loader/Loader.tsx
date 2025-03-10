import classes from "./Loader.module.css";
import { CircularProgress } from "@mui/material";

type LoaderTypes = { className?: string };

const Loader = ({ className }: LoaderTypes) => {
  return (
    <div className={`${classes.container} ${className}`}>
      <CircularProgress
        size={"2rem"}
        color="inherit"
        style={{ color: "#e5c300" }}
      />
    </div>
  );
};

export default Loader;
