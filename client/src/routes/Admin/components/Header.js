import React, { useState, useContext } from "react";
import { withRouter } from "react-router-dom";
import Gravatar from "react-gravatar";

// Local
import { GlobalContext } from "App";
import { DropdownMenu, DropdownMenuItem } from "components/DropdownMenu";

export const Header = ({ history }) => {
  const [open, setOpen] = useState(false);
  const { auth } = useContext(GlobalContext);

  const renderProfile = () => {
    return (
      <div className="flex flex-col justify-center">
        <Gravatar
          className="rounded-full mr-2 cursor-pointer self-end"
          email={auth.user.email}
          size={40}
          onClick={event => {
            setOpen(!open);
          }}
        />
        <DropdownMenu
          open={open}
          width="w-24"
          onClose={() => {
            setOpen(false);
          }}
        >
          <DropdownMenuItem
            onClick={() => {
              history.push("/admin/profile");
              setOpen(false);
            }}
          >
            Profile
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() => {
              history.push("/admin/signout");
              setOpen(false);
            }}
          >
            Sign out
          </DropdownMenuItem>
        </DropdownMenu>
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

export default withRouter(Header);
