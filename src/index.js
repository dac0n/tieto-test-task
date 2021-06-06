

import React from "react";
import ReactDOM from "react-dom";
import Triangle from "./Triangle";
import "./style.css"
const App = props => {
  return <Triangle width='500px' height='500px'/>;
}

ReactDOM.render(<App />, document.getElementById("root"));
