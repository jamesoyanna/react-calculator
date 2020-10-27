import React, { useState } from "react";
import Input from "./Input/Input";
import {
  trimStr,
  isOperator,
  overrideOperator,
  formatNumberWithDecimals,
  unFormatNumberWithCommas,
  peekInput,
} from "./util";
import Buttons from "./Buttons/Buttons";
import "./App.scss";

function App() {
  const [input, setInput] = useState("0");

  const handleClick = (userInput) => {
    if (input === "Syntax Error") return;

    let concatedInput = `${input}${userInput}`;
    if (!isValidateInput(concatedInput)) return;

    /** Override subsequent operator if it is not minus */
    if (
      userInput !== "-" &&
      isOperator(userInput) &&
      isOperator(input.slice(-1))
    ) {
      concatedInput = overrideOperator(input, userInput);
    }
    concatedInput = trimInputLength(concatedInput);

    setInput((input) => {
      const res =
        input === "0" && !isOperator(peekInput(concatedInput))
          ? userInput
          : concatedInput;
      return formatNumberWithDecimals(res);
    });
  };

  const isValidateInput = (concatedInput) => {
    if (/\.\d*\.+/g.test(concatedInput)) return false; // To prevent multiple dots
    if (
      isOperator(peekInput(concatedInput)) &&
      peekInput(concatedInput) === peekInput(input)
    )
      return false; // To prevent adjacent duplicate operators
    return true;
  };

  const trimInputLength = (input) => {
    if (input.length > 15) return trimStr(input, 15);
    return input;
  };

  const handleEqual = () => {
    let res = "";
    try {
      res = eval(unFormatNumberWithCommas(input)).toString();
    } catch (e) {
      res = "Syntax Error";
    }
    setInput(formatNumberWithDecimals(res));
  };

  return (
    <div className="cal-container">
      <Input input={input} />
      <Buttons {...{ handleClick, handleEqual, input, setInput }} />
    </div>
  );
}

export default App;
