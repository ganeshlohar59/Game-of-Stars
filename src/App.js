import React, { useEffect } from "react";
import { useState } from "react";
import style from "./App.module.css";

// Components
import PlayNumber from "./components/PlayNumber";
import DisplayStar from "./components/DisplayStar";
import GameFinish from "./components/GameFinished";

// utils
import utils from "./utils.jsx";

const App = (props) => {
  const [stars, setStars] = useState(utils.random(1, 9));
  const [availableNums, setAvailableNums] = useState(utils.range(1, 9));
  const [candidateNums, setCandidateNums] = useState([]);
  const [secondsLeft, setSecondsLeft] = useState(10);

  useEffect(() => {
    if (secondsLeft > 0 && availableNums.length > 0) {
      const timerId = setTimeout(() => {
        setSecondsLeft(secondsLeft - 1);
      }, 1000);
      return () => clearTimeout(timerId);
    }
  });

  // Function to get number status
  const getNumberStatus = (number) => {
    if (!availableNums.includes(number)) return "used";
    if (candidateNums.includes(number))
      return areCandidatesWrong ? "wrong" : "candidate";
    return "available";
  };

  const areCandidatesWrong = utils.sum(candidateNums) > stars;
  const gameStatus =
    availableNums.length === 0 ? "won" : secondsLeft === 0 ? "lost" : "active";

  const onNumberClick = (number, currentStatus) => {
    // handle number click here
    if (gameStatus !== "active" || currentStatus == "used") return;

    // Candidate Nums
    const newCandidateNums =
      currentStatus === "available"
        ? candidateNums.concat(number)
        : candidateNums.filter((cn) => cn !== number);

    if (utils.sum(newCandidateNums) !== stars)
      setCandidateNums(newCandidateNums);
    else {
      const newAvailableNums = availableNums.filter(
        (n) => !newCandidateNums.includes(n)
      );
      setStars(utils.randomSumIn(newAvailableNums, 9));
      setAvailableNums(newAvailableNums);
      setCandidateNums([]);
    }
  };

  return (
    <div className={style.wrapper}>
      <h1 className={style.heading}>Remaining Time {secondsLeft}</h1>

      {/* Game Container */}
      <div className={style.game_container}>
        {/* Star Container */}
        <div className={style.game_info_container}>
          {gameStatus !== "active" ? (
            <GameFinish finishType={gameStatus} onClick={props.startNewGame} />
          ) : (
            <div className={style.star_container}>
              <DisplayStar displayCount={stars} />
            </div>
          )}
        </div>

        {/* Numbers Container */}
        <div className={style.numbers_container}>
          {utils.range(1, 9).map((number) => (
            <PlayNumber
              key={number}
              number={number}
              status={getNumberStatus(number)}
              onClick={onNumberClick}
            />
          ))}
        </div>
      </div>

      <h4>Pick one or more numbers that sum to the number of stars</h4>
    </div>
  );
};

// Container Component
const Game = (props) => {
  const [gameKey, setGameKey] = useState(0);
  return (
    <App
      key={gameKey}
      startNewGame={() => {
        setGameKey(gameKey + 1);
      }}
    />
  );
};

export default Game;
