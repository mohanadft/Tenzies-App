import React from "react";

export default function Die(props) {
  const style = {
    backgroundColor: props.isSelected ? "#59e391" : "#fff",
  };
  return (
    <span className="num" style={style} onClick={props.select}>
      {props.value}
    </span>
  );
}
