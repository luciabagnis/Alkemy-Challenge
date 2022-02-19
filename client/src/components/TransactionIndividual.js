import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashCan, faEdit } from "@fortawesome/free-solid-svg-icons";
import { useHistory } from "react-router-dom";

export default function TransactionIndividual() {
  let history = useHistory();
  let { id } = useParams();
  const [transactionPost, setTransactioPost] = useState({});

  useEffect(() => {
    axios
      .get(`http://localhost:3001/transaction/${id}`, {
        headers: {
          token: localStorage.getItem("token"),
        },
      })
      .then((response) => {
        setTransactioPost(response.data);
      });
  }, [transactionPost.length]);

  const deleteT = (id) => {
    axios
      .delete(`http://localhost:3001/transaction/${id}`, {
        headers: {
          token: localStorage.getItem("token"),
        },
      })
      .then(history.push("/transaction/list"));
  };

  return (
    <div className="container--transaction">
      <div className="individual--transaction">
        <div className="icons">
          <div className="icon--trash">
            <FontAwesomeIcon
              icon={faTrashCan}
              onClick={() => {
                deleteT(transactionPost.id);
              }}
            ></FontAwesomeIcon>
          </div>
          <div className="icon--edit">
            <FontAwesomeIcon
              icon={faEdit}
              onClick={() => {
                history.push(`/transaction/edit/${transactionPost.id}`);
              }}
            ></FontAwesomeIcon>
          </div>
        </div>
        <h1 className="individual--concept">{transactionPost.concept} </h1>
        <h3 className="date">{transactionPost.date}</h3>
        <h6 className="type">
          Your {transactionPost.type} was:{" "}
          <span>${transactionPost.amount}</span>
        </h6>
        <p className="comment">{transactionPost.comment}</p>
      </div>
    </div>
  );
}
