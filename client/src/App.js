import React from "react";
import { BrowserRouter, Route } from "react-router-dom";

import "./App.css";

import Navbar from "./components/navbar/Navbar";
import SignIn from "./pages/signin/Signin";
import SignUp from "./pages/signup/Signup";

function App() {
  return (
    <BrowserRouter>
      <div>
        <Navbar />
        <Route exact path="/" />
        <Route exact path="/signin" component={SignIn} />
        <Route exact path="/signup" component={SignUp} />
      </div>
    </BrowserRouter>
  );
}

export default App;
