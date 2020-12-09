import React from "react";

// Styles
import style from "./style.module.css";

// Star SVG
import StarIcon from "../../assets/star.svg";

// util
import utils from "../../utils.jsx";

const DisplayStar = (props) => {
  return (
    <div>
      {utils.range(1, props.displayCount).map((starId) => (
        <img className={style.star} src={StarIcon} alt="star" />
      ))}
    </div>
  );
};

export default DisplayStar;
