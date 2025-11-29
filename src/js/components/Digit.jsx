import React from "react";

const Digit = (props) => {
  return (
    <div 
      className={`card fs-1 col m-2 ${props.active ? 'bg-success' : ''}`}
      style={{
        backgroundColor: props.active ? '#28a745' : undefined,
        transition: 'background-color 0.3s ease'
      }}
    >
      {props.number}
    </div>
  );
};

export default Digit;