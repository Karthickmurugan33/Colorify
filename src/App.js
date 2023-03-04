import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import Color from "./Page/Color";
import Sign from "./Page/Sign";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
function App() {

  return (
    <BrowserRouter>
      <Route path={"/"} exact>
        <Sign />
      </Route>
      <Route path={"/home"}>
        <Color />
      </Route>
    </BrowserRouter>
  );
}

export default App;
