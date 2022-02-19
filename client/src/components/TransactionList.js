import React, { useEffect, useState } from "react";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEllipsis } from "@fortawesome/free-solid-svg-icons";
import { useHistory } from "react-router-dom";
import { useParams } from "react-router-dom";
import Searchbar from "./Searchbar";

export default function TransactionList() {
  const [transactionList, setTransactionList] = useState([]);
  let history = useHistory();

  const [search, setSearch] = useState("");

  const dataToParent = (index) => {
    setSearch(index);
  };

  useEffect(() => {
    axios
      .get("http://localhost:3001/transaction/list", {
        headers: {
          token: localStorage.getItem("token"),
        },
      })
      .then((response) => {
        setTransactionList(response.data);
      });
  }, [transactionList.length]);

  const style = {
    height:
      transactionList.length === 0
        ? "110vh"
        : "" || search !== ""
        ? "auto"
        : "",
  };

  return (
    <div className="transaction--list" style={style}>
      <Searchbar dataToParent={dataToParent} />

      {transactionList
        .filter((value) => {
          if (search === "") {
            return value;
          } else if (
            value.concept.toLowerCase().includes(search) ||
            value.type.toLowerCase().includes(search) ||
            value.date.toLowerCase().includes(search)
          ) {
            return value;
          }
        })
        .map((value, key) => {
          const type = value.type.toLowerCase();

          return (
            <div className="transactions--cards">
              <div className="transactions--card">
                <div className="icon--readmore">
                  <FontAwesomeIcon
                    icon={faEllipsis}
                    onClick={() => {
                      history.push(`/transaction/${value.id}`);
                    }}
                  ></FontAwesomeIcon>
                </div>

                <h2 className="concept">{value.concept} </h2>
                <h3 className="date">{value.date}</h3>
                <h6 className="type">
                  Your {type} was: <span>${value.amount}</span>
                </h6>
                <p className="comment">{value.comment}</p>
              </div>
            </div>
          );
        })}

      {transactionList.length === 0 && (
        <p className="nothing">There is nothing here</p>
      )}
    </div>
  );
}
