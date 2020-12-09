import React from "react";

import style from "./style.module.css";

const PlayButton = (props) => {
  return (
    <button
      style={{ backgroundColor: colors[props.status] }}
      onClick={() => props.onClick(props.number, props.status)}
      className={style.play_number_button}
    >
      {props.number}
    </button>
  );
};

// Colors
const colors = {
  available: "#EDF3FB",
  used: "#93FFCB",
  wrong: "#FFCDCD",
  candidate: "#CCBAFF"
};

export default PlayButton;
