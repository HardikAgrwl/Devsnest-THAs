import React from "react";
import Navbar from "./Navbar";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Home from "./components/Home";
import About from "./components/About";

const App = () => {
  return (
    <div>
      <Router>
        <Navbar />      
         {/* // it should be at the top, and you don't have to wrap up switch in it. */}
        <Switch className="home">
          <Route exact path="/">
            <Home />
          </Route>
          <Route exact path="/about">
            <About />
          </Route>
        </Switch>
      </Router>
    </div>
  );
};

export default App;
