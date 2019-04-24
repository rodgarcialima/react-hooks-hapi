import React, { useContext } from "react";
import Gravatar from "react-gravatar";

// Local
import { GlobalContext } from "App";

export const Header = () => {
  const { auth } = useContext(GlobalContext);

  const renderProfile = () => {
    return (
      <div className="flex">
        <Gravatar
          className="rounded-full self-center mr-2 cursor-pointer"
          email={auth.user.email}
          size={40}
        />
      </div>
    );
  };

  return (
    <div className="flex flex-grow bg-theme-header justify-between">
      <div className="self-center ml-4 text-white">Search...</div>
      {renderProfile()}
    </div>
  );
};

export default Header;
