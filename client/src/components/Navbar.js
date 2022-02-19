import React, { useState, useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../helpers/AuthContex";
import axios from "axios";
import { useHistory } from "react-router-dom";

export default function Navbar() {
  const { authState, setAuthState } = useContext(AuthContext);

  let history = useHistory();

  console.log(console.log(authState.status));

  useEffect(() => {
    axios
      .get("http://localhost:3001/auth/auth", {
        headers: {
          token: localStorage.getItem("token"),
        },
      })
      .then((response) => {
        if (response.data.error) {
          setAuthState({ ...authState, status: false });
        } else {
          setAuthState({
            first_name: response.data.first_name,
            last_name: response.data.first_name,
            username: response.data.username,
            email: response.data.email,
            total_balance: response.data.total_balance,
            id: response.data.id,
            status: true,
          });
        }
      });
  }, []);

  const logout = () => {
    localStorage.removeItem("token");
    setAuthState({
      first_name: "",
      last_name: "",
      username: "",
      email: "",
      total_balance: "",
      id: 0,
      status: false,
    });
    history.push("/");
  };

  return (
    <div className="whole--nav">
      <nav
        class="navbar navbar-expand-lg navbar-dark"
        aria-label="Ninth navbar example"
      >
        <div class="container-xl">
          {!authState.status ? (
            <>
              <Link class="navbar-brand" to="/">
                My Budget
              </Link>
            </>
          ) : (
            <>
              <Link class="navbar-brand" to="/home/user">
                My Budget
              </Link>
            </>
          )}
          <button
            class="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarsExample07XL"
            aria-controls="navbarsExample07XL"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span class="navbar-toggler-icon"></span>
          </button>
          <div class="collapse navbar-collapse" id="navbarsExample07XL">
            <ul class="navbar-nav me-auto mb-2 mb-lg-0">
              {!authState.status ? (
                <>
                  <li class="nav-item">
                    <Link class="nav-link" to="/auth">
                      Register
                    </Link>
                  </li>
                  <li class="nav-item">
                    <Link class="nav-link" to="/auth/login">
                      Login
                    </Link>
                  </li>
                </>
              ) : (
                <>
                  <li class="nav-item">
                    <Link class="nav-link" to="/transaction">
                      Add Transaction
                    </Link>
                  </li>
                  <li class="nav-item">
                    <Link class="nav-link" to="/transaction/list">
                      Transaction List
                    </Link>
                  </li>
                  <li class="nav-item">
                    <Link class="nav-link" to="/transaction/list/income">
                      Income List
                    </Link>
                  </li>
                  <li class="nav-item">
                    <Link class="nav-link" to="/transaction/list/egress">
                      Egress List
                    </Link>
                  </li>
                  <li class="nav-item">
                    <Link class="nav-link" onClick={logout}>
                      Logout
                    </Link>
                  </li>
                </>
              )}
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
}
