import React, { useState, useContext } from "react";
import { Link, useHistory } from "react-router-dom";
import { Form, Message, Button } from "semantic-ui-react";
import axios from "axios";
import { Context as UserContext } from "../../context/userContext";

import AuthForm from "../../components/authForm/AuthForm";

import "./Signup.css";
import "../signin/Signin.css";

const SignUp = () => {
  const { fetchUser } = useContext(UserContext);

  const [displayName, setDisplayName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  const history = useHistory();

  const formSubmit = async (body) => {
    try {
      setErrorMsg("");
      console.log("Starting");
      const token = await axios.post("/api/v1/signup", body);
      console.log("token", token);
      fetchUser(token);
      // alert("Form Submitted");
    } catch (err) {
      setErrorMsg(err.message);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (password !== confirmPassword) {
      alert("passwords don't match");
      return;
    }

    try {
      const userForm = {
        name: displayName,
        phone: phone,
        email: email,
        password: password,
      };
      formSubmit(userForm);

      setDisplayName("");
      setEmail("");
      setPhone("");
      setPassword("");
      setConfirmPassword("");

      history.push("/");
    } catch (error) {
      setErrorMsg(error.message);
    }
  };

  return (
    <div className="sign-up">
      <h2 className="title display">Sign Up</h2>
      <Form error={!!errorMsg} className="sign-up-form" onSubmit={handleSubmit}>
        <AuthForm
          type="text"
          name="displayName"
          value={displayName}
          onChange={(e) => setDisplayName(e.target.value)}
          label="Full Name"
          required
        />
        <AuthForm
          type="email"
          name="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          label="Email"
          required
        />
        <AuthForm
          type="text"
          name="Phone"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          label="Phone Number"
          required
        />
        <AuthForm
          type="password"
          name="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          label="Password"
          required
        />
        <AuthForm
          type="password"
          name="confirmPassword"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          label="Confirm Password"
          required
        />
        <Message error header="Oops!" content={errorMsg} />
        <Button className="teal darken-2" type="submit">
          Register
        </Button>
      </Form>
      <h5 className="forgot">
        By registering, you agree all the Terms & Conditions and Privacy Policy{" "}
      </h5>
      <div style={{ display: "flex" }}>
        <h4 style={{ color: "#607d8b" }}>Already have an account?</h4>
        <Link style={{ marginLeft: "2%" }} to="/signin">
          <h4>Login</h4>
        </Link>
      </div>
    </div>
  );
};

export default SignUp;
