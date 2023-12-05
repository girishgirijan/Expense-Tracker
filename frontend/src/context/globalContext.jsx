import React, { useContext, useState, useEffect } from "react";
import axios from "axios";

const BASE_URL = "http://localhost:5000/api/v1";

const GlobalContext = React.createContext();

export const GlobalProvider = ({ children }) => {
  const [incomes, setIncomes] = useState([]);
  const [expenses, setExpenses] = useState([]);
  const [error, setError] = useState(null);
  const [message, setMessage] = useState(null);
  const [currentUser, setCurrentUser] = useState("");

  useEffect(() => {
    if (!localStorage.getItem("expense-tracker-user")) {
      return false;
    } else {
      fetechCurrentUser();
      
    }
  }, []);
  const fetechCurrentUser = async () => {
    try {
      setCurrentUser(
        await JSON.parse(localStorage.getItem("expense-tracker-user"))
      );
    } catch (err) {
      console.log(err);
    }
  };
  

  //Register
  const registerUser = async (name, email, password) => {
    const response = await axios
      .post(`${BASE_URL}/registerUser`, {
        name,
        email,
        password,
      })
      .catch((error) => {
        setError(error.response.data.message);
        setMessage("");
      });
    setMessage(response.data.message);
  };

  //Add income
  const addIncome = async (income) => {
    const response = await axios
      .post(`${BASE_URL}/addIncome`, income)
      .catch((error) => {
        setError(error.response.data.message);
      });
    setMessage(response.data.message);
    getIncomes();
  };

  //Get all incomes
  const getIncomes = async () => {
    const response = await axios.get(`${BASE_URL}/getIncomes/${currentUser._id}`);
    setIncomes(response.data);
  };

  //Delete a specific income
  const deleteIncome = async (id) => {
    const res = await axios.delete(`${BASE_URL}/deleteIncome/${id}`);
    getIncomes();
  };

  //Total income
  const totalIncome = () => {
    let totalIncome = 0;
    incomes.forEach((income) => {
      totalIncome = totalIncome + income.amount;
    });
    return totalIncome;
  };

  //Add expense
  const addExpense = async (expense) => {
    const response = await axios
      .post(`${BASE_URL}/addExpense`, expense)
      .catch((err) => {
        setError(err.response.data.message);
      });
    setMessage(response.data.message);
    getExpenses();
  };

  //Get all expenses
  const getExpenses = async () => {
    const response = await axios.get(`${BASE_URL}/getExpenses/${currentUser._id}`);
    setExpenses(response.data);
  };

  //Delete specific expense
  const deleteExpense = async (id) => {
    const res = await axios.delete(`${BASE_URL}/deleteExpense/${id}`);
    getExpenses();
  };

  //Total Expenses
  const totalExpenses = () => {
    let totalExpense = 0;
    expenses.forEach((expense) => {
      totalExpense = totalExpense + expense.amount;
    });
    return totalExpense;
  };

  //Balance
  const totalBalance = () => {
    return totalIncome() - totalExpenses();
  };

  //Transactions history
  const transactionHistory = () => {
    const history = [...incomes, ...expenses];
    history.sort((a, b) => {
      return new Date(b.createdAt) - new Date(a.createdAt);
    });
    return history.slice(0, 3);
  };

  return (
    <GlobalContext.Provider
      value={{
        addIncome,
        getIncomes,
        deleteIncome,
        error,
        setError,
        message,
        setMessage,
        incomes,
        totalIncome,
        addExpense,
        getExpenses,
        deleteExpense,
        totalExpenses,
        totalBalance,
        transactionHistory,
        expenses,
        registerUser,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

export const useGlobalContext = () => {
  return useContext(GlobalContext);
};
