import axios from "axios";
import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEllipsis } from "@fortawesome/free-solid-svg-icons";
import { useHistory } from "react-router-dom";

export default function Egress() {

  const [egressList, setEgressList] = useState([]);
  let history = useHistory();

  useEffect(() => {
    axios.get("http://localhost:3001/transaction/list/egress", {
      headers: {
        token: localStorage.getItem("token")
      }
    }).then((response) => {
      setEgressList(response.data);
    })
  }, [egressList.length])


  return (
    <div className="transaction--list" >

      {egressList.map((value, key) => {
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

      {egressList.length === 0 && (
        <p className="nothing">There is nothing here</p>
      )}
    </div>
  )
}