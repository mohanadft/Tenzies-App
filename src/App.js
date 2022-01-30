import React from "react";
import "./style.css";

export default function App() {
  const [numbers, setNumbers] = React.useState([]);

  React.useEffect(() => {
    setNumbers(() => {
      const newArr = [];
      for (let i = 0; i < 10; i++)
        newArr.push({ num: Math.trunc(Math.random() * 10), selected: false });
      return newArr;
    });
  }, []);

  function isWin() {
    let isMatch = true;
    numbers.reduce((prev, curr) => {
      if (prev.num !== curr.num) {
        isMatch = false;
      }
      return curr;
    });
    return isMatch;
  }

  return (
    <main className="main-app">
      <div className="app-title">
        <h1 className="app-name">Tenzies</h1>
        <p className="app-info">
          Roll until all dice are the same. Click <br /> each die to freeze it
          at its current value <br /> between rolls.
        </p>
      </div>
      <div className="app-body">
        {numbers.map((e, index) => (
          <span
            className="num"
            key={index + 1}
            style={{
              backgroundColor: e.selected ? "#59e391" : "#fff",
            }}
            onClick={(event) => {
              event.target.classList.toggle("active");

              setNumbers((prevNumbers) =>
                prevNumbers.map((el, index2) =>
                  index === index2 ? { ...el, selected: !e.selected } : el
                )
              );
              if (isWin()) {
                console.log("You win!");
                document.querySelector(".roll-btn").textContent = "Reset Game";
              }
            }}
          >
            {e.num}
          </span>
        ))}
      </div>
      <button
        className="roll-btn"
        onClick={(event) => {
          if (event.target.textContent === "Roll") {
            setNumbers((prevNumbers) => {
              return prevNumbers.map((e) => {
                return e.selected
                  ? e
                  : { ...e, num: Math.trunc(Math.random() * 10) };
              });
            });
          } else {
            setNumbers(() => {
              const newArr = [];
              for (let i = 0; i < 10; i++)
                newArr.push({
                  num: Math.trunc(Math.random() * 10),
                  selected: false,
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
