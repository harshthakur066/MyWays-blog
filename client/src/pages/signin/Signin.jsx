import React, { useState, useContext } from "react";
import { Link, useHistory } from "react-router-dom";
import { Form, Message, Button } from "semantic-ui-react";
import axios from "axios";
import { Context as UserContext } from "../../context/userContext";

import AuthForm from "../../components/authForm/AuthForm";

import "./Signin.css";

const SignIn = () => {
  const { fetchUser } = useContext(UserContext);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  const history = useHistory();

  const formSubmit = async (body) => {
    try {
      setErrorMsg("");
      console.log("Starting");
      const token = await axios.post("/api/v1/signin", body);
      console.log("token", token);
      fetchUser(token);
      // alert("Form Submitted");
    } catch (err) {
      setErrorMsg(err.message);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      // To do
      const userForm = {
        email: email,
        password: password,
      };
      formSubmit(userForm);

      setEmail("");
      setPassword("");
      history.push("/");
    } catch (error) {
      setErrorMsg(error.message);
    }
  };

  return (
    <div className="sign-in">
      <h2 className="title display">Login</h2>

      <Form error={!!errorMsg} onSubmit={handleSubmit}>
        <AuthForm
          name="email"
          type="email"
          handleChange={(e) => setEmail(e.target.value)}
          value={email}
          label="Email"
          required
        />
        <AuthForm
          name="password"
          type="password"
          value={password}
          handleChange={(e) => setPassword(e.target.value)}
          label="Password"
          required
        />
        <Message error header="Oops!" content={errorMsg} />
        <div className="buttons">
          <Button className="teal darken-2" type="submit">
            Login
          </Button>
        </div>
      </Form>
      <h5 className="forgot">Forgot your password?</h5>
      <div style={{ display: "flex" }}>
        <h4 style={{ color: "#607d8b" }}>Don't have an account yet?</h4>
        <Link style={{ marginLeft: "2%" }} to="/signup">
          <h4>Register</h4>
        </Link>
      </div>
    </div>
  );
};

export default SignIn;
