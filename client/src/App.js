import React from 'react';
import './App.css';
import { Provider } from './global'
import Header from './components/Header'
import TotalIncomeExpense from './components/TotalIncomeExpense'
import AddTransactions from './components/AddTransactions'
import Transfers from './components/Transfers'
import Accounts from './components/Accounts'
import Nav from "./components/Nav"
import SavingTransactions from './components/SavingTransactions'
import ChequingTransactions from './components/ChequingTransactions'
import SubmitTransfer from "./components/SubmitTransfer"
import { BrowserRouter as Router, Route } from 'react-router-dom'
import { SubmitTransaction } from './components/SubmitTransaction';

const App = () => {
  return (
    <Provider>
      <Router>
        <Header />
        <Nav />
        <Route exact path="/">
          <div className="frontPage">
            <TotalIncomeExpense />
            <Accounts />
          </div>
        </Route>

        <Route exact path="/add">
          <AddTransactions />
        </Route>

        <Route exact path="/transfers">
          <Transfers />
        </Route>

        <Route exact path="/savings">
          <SavingTransactions />
        </Route>

        <Route exact path="/chequings">
          <ChequingTransactions />
        </Route>

        <Route exact path="/transfer/success">
          <SubmitTransfer />
        </Route>

        <Route exact path="/transaction/success">
          <SubmitTransaction />
        </Route>

      </Router>
    </Provider>

  )
}

export default App;
