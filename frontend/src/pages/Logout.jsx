import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "../context/userContext";
import { useNavigate } from "react-router-dom";
import LoadingAnimation from "../components/Loader";

const Logout = () => {
  const { setCurrentUser } = useContext(UserContext);
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setCurrentUser(null);
    setTimeout(() => {
      navigate("/login");
    }, 500);
  }, []);

  if (loading) {
    return <LoadingAnimation />;
  }

  return null;
};

export default Logout;
