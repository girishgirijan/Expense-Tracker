import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useGlobalContext } from "../../context/globalContext";
import { InnerLayout } from "../../styles/Layouts";
import Form from "../Form/Form";
import IncomeItem from "../Incomes/IncomeItem";
import ExpenseForm from "./ExpenseForm";

const Expenses = () => {
  const [currentUser, setCurrentUser] = useState(undefined);
  const { addIncome, expenses, getExpenses, deleteExpense, totalExpenses } =
    useGlobalContext();

  useEffect(() => {
    getExpenses();
  }, []);

  useEffect(() => {
    if (!localStorage.getItem("expense-tracker-user")) {
      navigate("/login");
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

  return (
    <ExpenseStyled>
      <InnerLayout>
        <h2>My Expenses</h2>
        <h2 className="total-expense">
          Total Expense: <span>${totalExpenses()}</span>
        </h2>
        <div className="expense-content">
          <div className="form-container">
            <ExpenseForm currentUser={currentUser} />
          </div>
          <div className="expenses">
            {expenses &&
              expenses.map((income) => {
                const {
                  _id,
                  title,
                  amount,
                  date,
                  category,
                  description,
                  type,
                } = income;

                return (
                  <IncomeItem
                    key={_id}
                    id={_id}
                    title={title}
                    description={description}
                    amount={amount}
                    date={date}
                    type={type}
                    category={category}
                    indicatorColor="var(--color-green)"
                    deleteItem={deleteExpense}
                  />
                );
              })}
          </div>
        </div>
      </InnerLayout>
    </ExpenseStyled>
  );
};

const ExpenseStyled = styled.div`
  display: flex;
  .total-expense {
    display: flex;
    justify-content: center;
    align-items: center;
    background: #fcf6f9;
    border: 2px solid #ffffff;
    box-shadow: 0px 1px 15px rgba(0, 0, 0, 0.06);
    border-radius: 10px;
    padding: 1rem;
    margin: 1rem 0;
    font-size: 1.5rem;
    gap: 0.5rem;
    span {
      font-size: 1.5rem;
      font-weight: 800;
      color: var(--color-green);
    }
  }
  .expense-content {
    display: flex;
    gap: 2rem;
    .form-container {
      flex: 0.75;
    }
    .expenses {
      flex: 1;
      overflow: auto;
      height: 100%;
    }
    @media (max-width: 1024px) {
      flex-direction: column;
    }
  }
`;

export default Expenses;
