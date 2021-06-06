

import React from "react";
import ReactDOM from "react-dom";
import Triangle from "./Triangle";
import "./style.css"
const App = props => {
  return <Triangle width='300px' height='600px'/>;
}

ReactDOM.render(<App />, document.getElementById("root"));
