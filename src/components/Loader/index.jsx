import React,  from "react";
import { makeStyles } from "@material-ui/core/styles";
import Backdrop from "@material-ui/core/Backdrop";
import Lottie from "react-lottie";
import * as loading from "../../assets/64770-skuls-warrior.json";

const defaultOptions = {
  loop: true,
  autoplay: true,
  animationData: loading.default,
  rendererSettings: {
    preserveAspectRatio: "xMidYMid slice",
  },
};

const useStyles = makeStyles({
  root: {
    flexGrow: 1,
  },
});

export default function Loader() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Backdrop className={classes.backdrop} open invisible>
        <Lottie options={defaultOptions} height={300} width={300} />
      </Backdrop>
    </div>
  );
}
