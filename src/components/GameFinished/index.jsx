import React from "react";

// Game Finish SVGs
import GameOver from "../../assets/game-over.svg";
import GameWon from "../../assets/game-won.svg";

// Styles
import style from "./style.module.css";

const GameFinish = (props) => {
  const finishType = props.finishType;
  return (
    <div onClick={props.onClick} className={style.game_finish_layout}>
      {finishType == "won" ? (
        <img src={GameWon} alt="Game Finished" />
      ) : finishType == "lost" ? (
        <img src={GameOver} alt="Game Finished" />
      ) : (
        ""
      )}
    </div>
  );
};

export default GameFinish;
