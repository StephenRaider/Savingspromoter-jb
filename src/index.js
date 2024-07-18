import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import MoneyLogo from './Money.png';  // Import the image

const App = () => {
  const [page, setPage] = useState('login');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [totalSavings, setTotalSavings] = useState(0);
  const [savingsGoal, setSavingsGoal] = useState('');
  const [expenses, setExpenses] = useState([]);

  const handleLogin = () => {
    setIsLoggedIn(true);
    setPage('home');
  };

  const addSaving = (amount) => {
    setTotalSavings(totalSavings + parseFloat(amount));
  };

  const addExpense = (expense) => {
    setExpenses([...expenses, expense]);
  };

  const getExpenseStats = () => {
    if (expenses.length === 0) return { highest: 0, lowest: 0, average: 0 };
    const amounts = expenses.map(exp => parseFloat(exp.amount));
    const highest = Math.max(...amounts);
    const lowest = Math.min(...amounts);
    const average = (amounts.reduce((a, b) => a + b, 0) / amounts.length).toFixed(2);
    return { highest, lowest, average };
  };

  const expenseStats = getExpenseStats();

  return (
    <div className="app-container">
      {!isLoggedIn ? (
        <div className="login-container">
          <h2>Login</h2>
          <button className="login-button" onClick={handleLogin}>Login</button>
        </div>
      ) : (
        <>
          <nav className="navbar">
            <ul className="nav-list">
              <li className="nav-item" onClick={() => setPage('home')}>Home</li>
              <li className="nav-item" onClick={() => setPage('addGoal')}>Add Savings Goal</li>
              <li className="nav-item" onClick={() => setPage('addSavings')}>Add Savings</li>
              <li className="nav-item" onClick={() => setPage('expenses')}>Expenses Calculator</li>
            </ul>
          </nav>
          {page === 'home' && (
            <div className="home-container">
              <h1>Welcome</h1>
              <img src={MoneyLogo} alt="logo" className="logo" />
              <h2 className="amount-saved">Amount Saved: {totalSavings}</h2>
              <p className="encouragement">Good work, keep it up!</p>
            </div>
          )}
          {page === 'addGoal' && (
            <div className="goal-container">
              <h2>Add Savings Goal</h2>
              <input
                type="text"
                placeholder="Enter your savings goal"
                value={savingsGoal}
                onChange={(e) => setSavingsGoal(e.target.value)}
                className="input-field"
              />
              <p>Your Savings Goal: {savingsGoal}</p>
            </div>
          )}
          {page === 'addSavings' && (
            <div className="savings-container">
              <h2>Add Savings</h2>
              <input
                type="number"
                placeholder="Enter amount to save"
                onBlur={(e) => addSaving(e.target.value)}
                className="input-field"
              />
              <p>Total Savings: {totalSavings}</p>
            </div>
          )}
          {page === 'expenses' && (
            <div className="expenses-container">
              <h2>Expenses Calculator</h2>
              <input
                type="text"
                placeholder="Expense Type"
                id="expenseType"
                className="input-field"
              />
              <input
                type="number"
                placeholder="Amount"
                id="expenseAmount"
                className="input-field"
              />
              <button
                className="add-expense-button"
                onClick={() => {
                  const type = document.getElementById('expenseType').value;
                  const amount = document.getElementById('expenseAmount').value;
                  addExpense({ type, amount });
                  document.getElementById('expenseType').value = '';
                  document.getElementById('expenseAmount').value = '';
                }}
              >
                Add Expense
              </button>
              <div className="expense-summary">
                <h3>Expense Summary</h3>
                <p>Highest Expense: {expenseStats.highest}</p>
                <p>Lowest Expense: {expenseStats.lowest}</p>
                <p>Average Monthly Expense: {expenseStats.average}</p>
              </div>
              <ul>
                {expenses.map((expense, index) => (
                  <li key={index}>{expense.type}: {expense.amount}</li>
                ))}
              </ul>
            </div>
          )}
        </>
      )}
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));

