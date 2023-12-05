import styled from "styled-components";
import bg from "../img/bg.png";
import { MainLayout } from "../styles/Layouts";
import Orb from "../components/Orb/Orb";
import { useState, useMemo } from "react";
import { useGlobalContext } from "../context/globalContext";
import { Link, useNavigate } from "react-router-dom";
import Button from "../components/Button/Button";
import { newUser } from "../utils/icons";
function Register() {
  const { registerUser, error, setError, message, setMessage } =
    useGlobalContext();

  const orbMemo = useMemo(() => {
    return <Orb />;
  }, []);

  const [values, setValues] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const navigate = useNavigate();
  const handleChange = (event) => {
    setValues({ ...values, [event.target.name]: event.target.value });
  };

  const handleSubmit = async (event) => {
    
    try {
      event.preventDefault();
      if (handleValidation()) {
        const { name, email, password } = values;
        registerUser(name, email, password);
        setValues({
          name: "",
          email: "",
          password: "",
          confirmPassword: "",
        });
        setError("")
      }
    } catch (error) {
      console.error(error.response.data);
    }
  };

  const handleValidation = () => {
    const { name, email, password, confirmPassword } = values;
    if (
      name === "" ||
      email === "" ||
      password === "" ||
      confirmPassword === ""
    ) {
      setError("Please fill all fields!");
      return false;
    } else if (password !== confirmPassword) {
      setError("Password and Confirm password should be same!!");
      return false;
    }
    return true;
  };
  return (
    <RegisterStyled>
      {orbMemo}

      <FormContainer>
        <h2>REGISTER</h2>
        <form  onSubmit={(event) => handleSubmit(event)}>
          <input
            type="text"
            name="name"
            placeholder="Name"
            value={values.name}
            onChange={(e) => handleChange(e)}
          />

          <input
            type="email"
            placeholder="Email"
            name="email"
            value={values.email}
            onChange={(e) => handleChange(e)}
          />

          <input
            type="password"
            placeholder="Password"
            name="password"
            value={values.password}
            onChange={(e) => handleChange(e)}
          />

          <input
            type="password"
            placeholder="Confirm Password"
            name="confirmPassword"
            value={values.confirmPassword}
            onChange={(e) => handleChange(e)}
          />
          <Button
            name="Register"
            icon={newUser}
            bPad={".8rem 1.6rem"}
            bRad={"10px"}
            bg={"var(--color-accent"}
            color={"#fff"}
          />
          <span>
            Already have an account? <Link to="/login">Login</Link>
          </span>
        </form>
        {error && <p className="error">{error}</p>}
        {message && <p className="success">{message}</p>}
      </FormContainer>
    </RegisterStyled>
  );
}

const RegisterStyled = styled.div`
  height: 100vh;
  background-image: url(${(props) => props.bg});
  position: relative;
  main {
    flex: 1;
    background: rgba(252, 246, 249, 0.78);
    border: 3px solid #ffffff;
    backdrop-filter: blur(4.5px);
    border-radius: 32px;
    overflow-x: hidden;
    &::-webkit-scrollbar {
      width: 0;
    }    
    }
  }

`;

const FormContainer = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 1rem;
  align-items: center;
  .brand {
    display: flex;
    align-items: center;
    gap: 1rem;
    justify-content: center;
    img {
      height: 5rem;
    }
    h1 {
      color: white;
      text-transform: uppercase;
    }
  }

  form {
    display: flex;
    flex-direction: column;
    gap: 2rem;
    background: rgba(252, 246, 249, 0.78);
    border: 3px solid #ffffff;
    backdrop-filter: blur(4.5px);
    border-radius: 0.5rem;
    padding: 3rem 5rem;
  }
  input {
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
      width: 100%;
      &::placeholder {
        color: rgba(34, 34, 96, 0.4);
      }
      button {
        box-shadow: 0px 1px 15px rgba(0, 0, 0, 0.06);
        &:hover {
          background: var(--color-green) !important;
        }
      }
  span {
    color: white;
    text-transform: uppercase;
    
    a {
      color: #1565c0;
      text-decoration: none;
      font-weight: bold;
    }
  }
`;

export default Register;
