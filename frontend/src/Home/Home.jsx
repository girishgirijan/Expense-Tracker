import styled from "styled-components";
import bg from "../img/bg.png";
import { MainLayout } from "../styles/Layouts";
import Orb from "../components/Orb/Orb";
import Nav from "../components/Nav/Nav";
import { useState, useMemo, useEffect } from "react";
import Dashboard from "../components/Dashboard/Dashboard";
import Incomes from "../components/Incomes/Incomes";
import Expenses from "../components/Expenses/Expenses";
import { useGlobalContext } from "../context/globalContext";
import { useNavigate } from "react-router-dom";

function Home() {
  const [active, setActive] = useState(1);
  const [currentUser, setCurrentUser] = useState(undefined);
  const navigate = useNavigate();

  const orbMemo = useMemo(() => {
    return <Orb />;
  }, []);

  const global = useGlobalContext();

  const displayData = () => {
    switch (active) {
      case 1:
        return <Dashboard currentUser={currentUser} />;
      case 2:
        return <Incomes  />;
      case 3:
        return <Expenses currentUser={currentUser} />;
      default:
        return <Dashboard currentUser={currentUser} />;
    }
  };

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
    <AppStyled bg={bg} className="App">
      {orbMemo}
      <MainLayout>
        <Nav active={active} setActive={setActive} currentUser={currentUser} />
        <main>{displayData()}</main>
      </MainLayout>
    </AppStyled>
  );
}

const AppStyled = styled.div`
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
`;

export default Home;
