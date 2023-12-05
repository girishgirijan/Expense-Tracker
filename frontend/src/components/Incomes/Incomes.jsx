import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { InnerLayout } from "../../styles/Layouts";
import { useGlobalContext } from "../../context/globalContext";
import Form from "../Form/Form";
import IncomeItem from "./IncomeItem";

const Incomes = () => {
  const { addIncome, getIncomes, incomes, deleteIncome, totalIncome } = useGlobalContext();
  const [currentUser, setCurrentUser] = useState(undefined);

  useEffect(() => {
    getIncomes();
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
      setCurrentUser(await JSON.parse(localStorage.getItem("expense-tracker-user")));
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <IncomesStyled>
      <InnerLayout>
        <h2>My Incomes</h2>
        <h2 className="total-income">Total Income: <span>${totalIncome()}</span></h2>
        <div className="income-content">
          <div className="form-container">
            <Form currentUser={currentUser} />
          </div>
          <div className="incomes">
            {incomes &&
              incomes.map((income) => {
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
                    deleteItem={deleteIncome}
                  />
                );
              })}
          </div>
        </div>
      </InnerLayout>
    </IncomesStyled>
  );
};
const IncomesStyled = styled.div`
  display: flex;    
  .total-income {
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
  .income-content {
    display: flex;    
    gap: 2rem;
    .form-container{
        flex: .75;
    }
    .incomes {
      flex: 1;
      overflow: auto;
      height: 100%;
    }
    @media (max-width: 1024px) {
        flex-direction: column;
    }
  }
  
`;
export default Incomes;
