import "./App.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { AuthContext } from "./helpers/AuthContex";
import { useEffect, useState } from "react";
import axios from "axios";

import Navbar from "./components/Navbar";
import Home from "./components/Home";
import Registration from "./components/Registration";
import Login from "./components/Login";
import UserHome from "./components/UserHome";
import Transaction from "./components/Transaction";
import TransactionList from "./components/TransactionList";
import Income from "./components/Income";
import Egress from "./components/Egress";
import TransactionIndividual from "./components/TransactionIndividual";
import TransactionEdit from "./components/TransactionEdit";
import Footer from "./components/Footer";

function App() {
  const [authState, setAuthState] = useState({
    first_name: "",
    last_name: "",
    username: "",
    email: "",
    total_balance: "",
    id: 0,
    status: false,
  });

  return (
    <div className="App">
      <AuthContext.Provider value={{ authState, setAuthState }}>
        <Router>
          <Navbar />
          <Switch>
            <Route exact path="/">
              <Home />
            </Route>

            <Route exact path="/auth">
              <Registration />
            </Route>

            <Route exact path="/auth/login">
              <Login />
            </Route>

            <Route exact path="/home/user">
              <UserHome name={authState.first_name} />
            </Route>

            <Route exact path="/transaction">
              <Transaction />
            </Route>

            <Route exact path="/transaction/list">
              <TransactionList />
            </Route>

            <Route exact path="/transaction/list/income">
              <Income />
            </Route>

            <Route exact path="/transaction/list/egress">
              <Egress />
            </Route>

            <Route exact path="/transaction/:id">
              <TransactionIndividual />
            </Route>

            <Route exact path="/transaction/edit/:id">
              <TransactionEdit />
            </Route>
          </Switch>
          <Footer />
        </Router>
      </AuthContext.Provider>
    </div>
  );
}

export default App;
