import styled from "styled-components";
import React, { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useGlobalContext } from "../../context/globalContext";
import Button from "../Button/Button";
import { plus } from "../../utils/icons";

const Form = ({currentUser}) => {
  
  const { addIncome, getIncomes, error, setError, message, setMessage } = useGlobalContext();
  const [inputState, setInputState] = useState({    
    title: "",
    amount: "",
    date: "",
    category: "",
    description: "",
  });

  const { title, amount, date, category, description } = inputState;

  const handleInput = (e) => {
    setInputState({ ...inputState, [e.target.name]: e.target.value });    
    setError("");
    setMessage("");
  };

  const handleSubmit = (e) => {
    e.preventDefault();    
    
    addIncome({
      user: currentUser._id,
      title: inputState.title,
      amount: inputState.amount,
      date: inputState.date,
      category: inputState.category,
      description: inputState.description
    });
    setInputState({
      title: "",
      amount: "",
      date: "",
      category: "",
      description: "",
    }); 
  };

  
  
  return (
    <FormStyled onSubmit={handleSubmit}>
      
      <div className="input-control">
        <input
          type="text"
          value={title}
          name="title"
          placeholder="Title"
          onChange={(e) => handleInput(e)}
        />
      </div>
      <div className="input-control">
        <input
          value={amount}
          type="text"
          name="amount"
          placeholder="Amount"
          onChange={(e) => handleInput(e)}
        />
      </div>
      <div className="input-control">
        <DatePicker
          id="date"
          placeholderText="Date"
          selected={date}
          dateFormat="dd/MM/yyyy"
          onChange={(date) => {
            setInputState({ ...inputState, date: date });
          }}
          wrapperClassName="datepicker"
        />
      </div>
      <div className=" input-control">
        <select
          required
          value={category}
          name="category"
          id="category"
          onChange={(e) => handleInput(e)}
        >
          <option value="" disabled>
            Select Option
          </option>
          <option value="salary">Salary</option>
          <option value="freelancing">Freelancing</option>
          <option value="investments">Investiments</option>
          <option value="stocks">Stocks</option>
          <option value="bitcoin">Bitcoin</option>
          <option value="bank">Bank Transfer</option>
          <option value="youtube">Youtube</option>
          <option value="other">Other</option>
        </select>
      </div>
      <div className="input-control">
        <textarea
          name="description"
          value={description}
          placeholder="Description"
          id="description"
          cols="30"
          rows="4"
          onChange={(e) => handleInput(e)}          
        ></textarea>
      </div>
      <div className="submit-btn">
        <Button
          name="Add Income"
          icon={plus}
          bPad={".8rem 1.6rem"}
          bRad={"10px"}
          bg={"var(--color-accent"}
          color={"#fff"}
        />
      </div>
      {error && <p className="error">{error}</p>}
      {message && <p className="success">{message}</p>}
    </FormStyled>
  );
};

const FormStyled = styled.form`
  display: flex;
  flex-direction: column;
  gap: 2rem;
  input,
  textarea,
  select {
    font-family: inherit;
    font-size: 1rem;
    outline: none;
    border: none;
    padding: 0.5rem 1rem;
    border-radius: 5px;
    border: 2px solid #fff;
    background: transparent;
    resize: none;
    box-shadow: 0px 1px 15px rgba(0, 0, 0, 0.06);
    color: rgba(34, 34, 96, 0.9);
    &::placeholder {
      color: rgba(34, 34, 96, 0.4);
    }
  }
  .input-control {
    input, select, textarea {
      width: 100%;
    }
    
  }  
  .datepicker {
    width: 100%;
    }
  
  .submit-btn {
    button {
      box-shadow: 0px 1px 15px rgba(0, 0, 0, 0.06);
      &:hover {
        background: var(--color-green) !important;
      }
    }
  }
`;

export default Form;
