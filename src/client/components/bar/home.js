import React from "react";

import { useNavigate } from "react-router-dom";

const Home = ({ history }) => {
  const navigate = useNavigate();

  const goHome = () => {
    navigate("/app");
  };

  return (
    <button className="goHome" onClick={goHome}>
      Home
    </button>
  );
};

export default Home;
