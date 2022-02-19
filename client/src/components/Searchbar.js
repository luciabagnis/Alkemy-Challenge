import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";

export default function Searchbar({ dataToParent }) {
  return (
    <div className="searchbar">
      <input
        id="name"
        name="search"
        placeholder="Search by title, type, date"
        //SEND THE DATA OF THE INPUT TO THE PARENT
        onChange={(event) => {
          const info = event.target.value;
          dataToParent(info);
        }}
      ></input>
    </div>
  );
}
