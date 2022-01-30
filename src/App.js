import React from "react";
import "./style.css";
import Die from "./Die";
import Confetti from "react-confetti";

export default function App() {
  const [numbers, setNumbers] = React.useState(() => {
    const newArr = [];
    for (let i = 0; i < 10; i++)
      newArr.push({ num: Math.trunc(Math.random() * 6), isSelected: false });
    return newArr;
  });
  const [isWinTheGame, setIsWinTheGame] = React.useState(false);

  React.useEffect(() => {
    setNumbers(() => {
      const newArr = [];
      for (let i = 0; i < 10; i++)
        newArr.push({ num: Math.trunc(Math.random() * 6), isSelected: false });
      return newArr;
    });
  }, []);

  function isWin() {
    let isMatch = true;
    numbers.reduce((prev, curr) => {
      if (!prev.isSelected || !curr.isSelected) isMatch = false;
      return curr;
    });
    return new Set(numbers.map((e) => e.num)).size === 1 && isMatch;
  }

  React.useEffect(() => {
    if (isWin()) document.querySelector(".roll-btn").textContent = "Reset Game";
    setIsWinTheGame(isWin());
  }, [numbers]);

  function select(id) {
    setNumbers((prevNumbers) =>
      prevNumbers.map((e, index) =>
        index === id ? { ...e, isSelected: !e.isSelected } : e
      )
    );
  }

  return (
    <main className="main-app">
      <div className="app-title">
        {isWinTheGame && (
          <Confetti
            height="370"
            width="360"
            style={{
              margin: "0 auto",
              transform: "translateY(51%)",
            }}
          />
        )}

        <h1 className="app-name">Tenzies</h1>
        <p className="app-info">
          Roll until all dice are the same. Click <br /> each die to freeze it
          at its current value <br /> between rolls.
        </p>
      </div>
      <div className="app-body">
        {numbers.map((e, index) => {
          return (
            <Die
              value={e.num}
              key={index + 1}
              isSelected={e.isSelected}
              select={() => select(index)}
            />
          );
        })}
      </div>
      <button
        className="roll-btn"
        onClick={(event) => {
          if (event.target.textContent === "Roll") {
            setNumbers((prevNumbers) => {
              return prevNumbers.map((e) => {
                return e.isSelected
                  ? e
                  : { ...e, num: Math.trunc(Math.random() * 6) };
              });
            });
          } else {
            setNumbers(() => {
              const newArr = [];
              for (let i = 0; i < 10; i++)
                newArr.push({
                  num: Math.trunc(Math.random() * 6),
                  isSelected: false,
                });
              return newArr;
            });
          }
          event.target.textContent = "Roll";
        }}
      >
        Roll
      </button>
    </main>
  );
}
