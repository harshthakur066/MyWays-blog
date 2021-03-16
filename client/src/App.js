import React from "react";
import axios from "axios";
import { BrowserRouter, Route } from "react-router-dom";

import "./App.css";

import Navbar from "./components/navbar/Navbar";
import SignIn from "./pages/signin/Signin";
import SignUp from "./pages/signup/Signup";

axios.defaults.baseURL = "https://localhost:5000";

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
