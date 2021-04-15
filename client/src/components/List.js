import React from "react";

const List = (props) => {
  console.log(props)
  return (
    <ul>
      {props.time.map((el, index) => (
        <button key={index} onClick={() => props.handleClick(index)}>
          Client: {el.client} Date: {el.date}
        </button>
      ))}
    </ul>
  );
};

export { List };
