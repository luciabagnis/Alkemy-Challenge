import React, { useState } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";

export default function Registration() {
  const [first_name, setFirstName] = useState("");
  const [last_name, setLastName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [password_confirmation, setPasswordConfirmation] = useState("");
  const [total_balance, setTotalBalance] = useState(0);

  let history = useHistory();

  const register = () => {
    axios
      .post("http://localhost:3001/auth", {
        first_name: first_name,
        last_name: last_name,
        username: username,
        email: email,
        password: password,
        password_confirmation: password_confirmation,
        total_balance: total_balance,
      })
      .then(history.push("/auth/login"));
  };

  return (
    <div className="form--container">
      <div className="form--frame">
        <div class="mb-3">
          <label for="exampleFormControlInput1" class="form-label">
            First Name
          </label>
          <input
            type="text"
            class="form-control"
            id="exampleFormControlInput1"
            placeholder="John"
            name="firstName"
            onChange={(event) => {
              setFirstName(event.target.value);
            }}
          />
        </div>
        <div class="mb-3">
          <label for="exampleFormControlInput1" class="form-label">
            Last Name
          </label>
          <input
            type="text"
            class="form-control"
            id="exampleFormControlInput1"
            placeholder="Doe"
            name="lastName"
            onChange={(event) => {
              setLastName(event.target.value);
            }}
          />
        </div>
        <div class="mb-3">
          <label for="exampleFormControlInput1" class="form-label">
            Username
          </label>
          <input
            type="text"
            class="form-control"
            id="exampleFormControlInput1"
            placeholder="Johndoe"
            name="username"
            onChange={(event) => {
              setUsername(event.target.value);
            }}
          />
        </div>
        <div class="mb-3">
          <label for="exampleFormControlInput1" class="form-label">
            E-Mail
          </label>
          <input
            type="text"
            class="form-control"
            id="exampleFormControlInput1"
            placeholder="example@gmail.com"
            name="email"
            onChange={(event) => {
              setEmail(event.target.value);
            }}
          />
        </div>
        <div class="mb-3">
          <label for="exampleFormControlInput1" class="form-label">
            Password
          </label>
          <input
            type="password"
            class="form-control"
            id="exampleFormControlInput1"
            name="password"
            onChange={(event) => {
              setPassword(event.target.value);
            }}
          />
        </div>
        <div class="mb-3">
          <label for="exampleFormControlInput1" class="form-label">
            Password
          </label>
          <input
            type="password"
            class="form-control"
            id="exampleFormControlInput1"
            name="passwordConfirmation"
            onChange={(event) => {
              setPasswordConfirmation(event.target.value);
            }}
          />
        </div>
        <div class="mb-3">
          <label for="exampleFormControlInput1" class="form-label">
            Please enter your balance
          </label>
          <input
            type="number"
            class="form-control"
            id="exampleFormControlInput1"
            name="balance"
            onChange={(event) => {
              setTotalBalance(event.target.value);
            }}
          />
        </div>
        <button className="transaction--button" onClick={register}>
          Submit
        </button>
      </div>
      <h6>
        Already have an account? <a href="/auth/login">Log In!</a>
      </h6>
    </div>
  );
}
