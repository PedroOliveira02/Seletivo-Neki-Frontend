import React from "react";
import * as C from "./styles";

const Button2 = ({ Text, onClick, Type = "button" }) => {
  return (
    <C.Button2 type={Type} onClick={onClick}>
      {Text}
    </C.Button2>
  );
};

export default Button2;