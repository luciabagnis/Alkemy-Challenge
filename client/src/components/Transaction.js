import React, { useState } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";

export default function Transaction() {
  const [concept, setConcept] = useState("");
  const [amount, setAmount] = useState("");
  const [date, setDate] = useState(Date.now());
  const [type, setType] = useState("");
  const [comment, setComment] = useState("");

  const [transactions, setTransactions] = useState([]);

  let history = useHistory();

  const addTransaction = () => {
    axios
      .post(
        "http://localhost:3001/transaction",
        {
          concept: concept,
          amount: amount,
          date: date.toString(),
          type: type,
          comment: comment,
        },
        {
          headers: {
            token: localStorage.getItem("token"),
          },
        }
      )
      .then(() => {
        setTransactions([
          ...transactions,
          {
            concept: concept,
            amount: amount,
            date: date.toString(),
            type: type,
            comment: comment,
          },
        ]);
      })
      .then(history.push("/transaction/list"));
  };

  return (
    <div className="transaction--form">
      <div className="transaction--frame">
        <div class="mb-3">
          <label for="exampleFormControlInput1" class="form-label">
            Title
          </label>
          <input
            type="text"
            name="concept"
            placeholder="July's Salary"
            class="form-control"
            id="exampleFormControlInput1"
            onChange={(event) => {
              setConcept(event.target.value);
            }}
          ></input>
        </div>
        <div class="mb-3">
          <label for="exampleFormControlInput1" class="form-label">
            Amount
          </label>
          <input
            type="number"
            name="amount"
            placeholder="500,50"
            class="form-control"
            id="exampleFormControlInput1"
            onChange={(event) => {
              setAmount(event.target.value);
            }}
          ></input>
        </div>
        <div class="mb-3">
          <label for="exampleFormControlInput1" class="form-label">
            Date
          </label>
          <input
            type="date"
            name="date"
            class="form-control"
            id="exampleFormControlInput1"
            onChange={(event) => {
              setDate(event.target.value);
            }}
          ></input>
        </div>
        <div class="mb-3">
          <label for="exampleFormControlInput1" class="form-label">
            Type
          </label>
          <select
            value={type}
            name="type"
            class="form-control"
            id="exampleFormControlInput1"
            onChange={(event) => {
              setType(event.target.value);
            }}
          >
            <option value="">---select type of transaction</option>
            <option value="Income">Income</option>
            <option value="Egress">Egress</option>
          </select>
        </div>
        <div class="mb-3">
          <label for="exampleFormControlInput1" class="form-label">
            Extra comment
          </label>
          <textarea
            name="comment"
            rows="5"
            cols="60"
            class="form-control"
            id="exampleFormControlInput1"
            placeholder="Add any aditional comments"
            onChange={(event) => {
              setComment(event.target.value);
            }}
          ></textarea>
        </div>
        <button
          type="submit"
          onClick={addTransaction}
          className="transaction--button"
        >
          Submit
        </button>
      </div>
    </div>
  );
}
