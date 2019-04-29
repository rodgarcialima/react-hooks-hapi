import React, { useEffect, useRef } from "react";
import classnames from "classnames";

export const DropdownMenuItem = ({ onClick, children }) => {
  return (
    <div
      className="flex items-center block p-2 no-underline text-sm text-black bg-white hover:bg-grey-lighter cursor-pointer"
      onClick={onClick}
    >
      {children}
    </div>
  );
};

/**
 * Inspiration: https://codesandbox.io/s/9o3lw5792w
 */
export const DropdownMenu = ({ width = "w-24", open, onClose, children }) => {
  const node = useRef();

  useEffect(() => {
    const handleClickOutside = event => {
      if (!node.current.contains(event.target)) {
        onClose();
      }
    };

    if (open) {
      window.addEventListener("mousedown", handleClickOutside, false);
    } else {
      window.removeEventListener("mousedown", handleClickOutside, false);
    }

    return () => {
      window.removeEventListener("mousedown", handleClickOutside, false);
    };
  }, [open, onClose]);

  return (
    <div ref={node} className={`relative inline-block ${width}`}>
      <div
        className={classnames(`absolute shadow-md z-1 ${width}`, {
          hidden: !open
        })}
      >
        <div className="flex flex-col">{children}</div>
      </div>
    </div>
  );
};

export default DropdownMenu;
