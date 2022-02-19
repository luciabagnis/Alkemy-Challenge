import axios from "axios";
import React, { useState, useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";

export default function TransactionEdit() {
  const [concept, setConcept] = useState("");
  const [date, setDate] = useState(Date.now());
  const [comment, setComment] = useState("");

  let { id } = useParams();
  let history = useHistory();

  const edit = (id) => {
    axios
      .put(
        `http://localhost:3001/transaction/edit/${id}`,
        {
          concept: concept,
          date: date.toString(),
          comment: comment,
        },
        {
          headers: {
            token: localStorage.getItem("token"),
          },
        }
      )
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
            placeholder="Change Title"
            class="form-control"
            id="exampleFormControlInput1"
            onChange={(event) => {
              setConcept(event.target.value);
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
            placeholder="Change Date"
          ></input>
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
            placeholder="Change additional comment"
            onChange={(event) => {
              setComment(event.target.value);
            }}
          ></textarea>
        </div>
        <button
          type="submit"
          className="transaction--button"
          onClick={() => {
            edit(id);
          }}
        >
          Edit
        </button>
      </div>
    </div>
  );
}
