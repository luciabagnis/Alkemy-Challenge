import React, { useState, useContext, useEffect } from "react";
import axios from "axios";
import { AuthContext } from "../helpers/AuthContex";

export default function UserHome(props) {
  const [balance, setBalance] = useState(0);

  useEffect(() => {
    axios
      .get("http://localhost:3001/transaction/balance", {
        headers: {
          token: localStorage.getItem("token"),
        },
      })
      .then((response) => {
        setBalance(response.data.total_balance);
      });
  }, [useState(balance)]);

  return (
    <div className="main--user">
      <div className="user--welcome">
        <h1>Welcome, {props.name} </h1>
        <h2>
          Your current balance is{" "}
          <span className="number--span">${balance}</span>
        </h2>
      </div>
      <button className="operations">
        <a href=" /transaction/list">Check your operations</a>
      </button>
      <button className="transactions">
        <a href=" /transaction">Add new transaction</a>
      </button>
    </div>
  );
}
