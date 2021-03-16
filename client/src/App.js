import React from "react";
import { BrowserRouter, Route } from "react-router-dom";
import axios from "axios";

import BlogDetail from "./pages/blog/BlogDetail";
import BlogList from "./pages/blog/BlogList";
import SignIn from "./pages/signin/Signin";
import SignUp from "./pages/signup/Signup";
import BlogPost from "./pages/blog/BlogPost";
import BlogNew from "./pages/blog/BlogNew";
import Header from "./components/navbar/Header";

axios.defaults.baseURL = "https://myways-blog.herokuapp.com/";

function App() {
  return (
    <BrowserRouter>
      <div>
        <Header />
        <Route exact path="/" component={BlogList} />
        <Route exact path="/signin" component={SignIn} />
        <Route exact path="/signup" component={SignUp} />
        <Route exact path="/blog/detail/:id" component={BlogDetail} />
        <Route exact path="/blog/post" component={BlogPost} />
        <Route exact path="/blog/new" component={BlogNew} />
      </div>
    </BrowserRouter>
  );
}

export default App;
