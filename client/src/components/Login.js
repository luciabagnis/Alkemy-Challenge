import React, { useState, useContext } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";
import { AuthContext } from "../helpers/AuthContex";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { setAuthState } = useContext(AuthContext);

  let history = useHistory();

  const login = () => {
    const data = { email: email, password: password };
    axios
      .post("http://localhost:3001/auth/login", data)
      .then((response) => {
        if (response.data.error) {
          alert(response.data.error);
        } else {
          localStorage.setItem("token", response.data.token);
          setAuthState({
            first_name: response.data.first_name,
            last_name: response.data.last_name,
            username: response.data.username,
            email: response.data.email,
            total_balance: response.data.total_balance,
            id: response.data.id,
            status: true,
          });
        }
      })
      .then(history.push("/home/user"));
  };

  return (
    <div className="login--container">
      <div className="form--frame">
        <div class="mb-3">
          <label for="exampleFormControlInput" class="form-label">
            E-mail
          </label>
          <input
            type="text"
            class="form-control"
            id="exampleFormControlInput"
            placeholder="johndoe@gmail.com"
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
            name="lastName"
            onChange={(event) => {
              setPassword(event.target.value);
            }}
          />
        </div>
        <button type="submit" className="form--button" onClick={login}>
          Login
        </button>
      </div>
    </div>
  );
}
