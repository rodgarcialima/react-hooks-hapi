import React, { useContext } from "react";
import { Redirect } from "react-router-dom";

// Local
import { GlobalContext } from "App";
import { ACTION_LOGOUT } from "reducer/actions/auth";

export const Signout = () => {
  const { dispatch } = useContext(GlobalContext);

  const signout = () => {
    dispatch({ type: ACTION_LOGOUT });
    return <Redirect to="/login" />;
  };

  return <>{signout()}</>;
};

export default Signout;
