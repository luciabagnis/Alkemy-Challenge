import React from "react";
import cards from "../assets/cards.png";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function Home() {
  return (
    <div className="main--section">
      <img src={cards}></img>
      <h1>MyBudget</h1>
      <p>
        Keep track of your expenses and your income. Get Started!{" "}
        <a href="/auth">
          <FontAwesomeIcon icon={faArrowRight} />
        </a>
      </p>
    </div>
  );
}
