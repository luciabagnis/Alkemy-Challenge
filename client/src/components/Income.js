import axios from "axios";
import React, {useState, useEffect} from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEllipsis } from "@fortawesome/free-solid-svg-icons";
import { useHistory } from "react-router-dom";

export default function Income(){

    const [incomeList, setIncomeList] = useState([]);
    let history = useHistory();

    useEffect(() => {
        axios.get("http://localhost:3001/transaction/list/income",{
            headers: {
                token: localStorage.getItem("token")
            }
        }).then((response) => {
            setIncomeList(response.data);
        })
    }, [incomeList.length])


    return(
        <div className="transaction--list" >
  
        {incomeList.map((value, key) => {  
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
  
        {incomeList.length === 0 && (
          <p className="nothing">There is nothing here</p>
        )}
      </div>
    )
}