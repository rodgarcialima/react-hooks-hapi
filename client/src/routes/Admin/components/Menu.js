import React, { useReducer } from "react";
import { withRouter } from "react-router-dom";
import classnames from "classnames";
import { MdKeyboardArrowRight } from "react-icons/md";

// Local
import styles from "./Menu.module.css";

// Actions
const FOLDER_CLICK = "FOLDER_CLICK";

/**
 * When you can't just move the reducer out of your function component
 * due to dependencies on props or context or other state, the solution
 * is to memoize your reducer using useCallback, so that you only create
 * a new reducer when its dependencies change.
 * @see https://stackoverflow.com/a/55056623/808901
 */
const reducer = (prevState, { type, payload }) => {
  switch (type) {
    case FOLDER_CLICK:
    default: {
      const newState = prevState.map(item =>
        item.id === payload ? { ...item, expanded: !item.expanded } : item
      );
      return newState;
    }
  }
};

export const Menu = ({ history, location, menu }) => {
  /**
   * useReducer is usually preferable to useState when you have complex state
   * logic that involves multiple sub-values or when the next state depends on
   * the previous one.
   */
  const [menuState, dispatch] = useReducer(
    reducer,
    menu.reduce((acc, cur) => {
      if (cur.type === "folder") {
        acc.push({
          id: cur.id,
          expanded: cur.expanded
        });
        return acc;
      }
      return acc;
    }, [])
  );

  const renderItem = (item, isFolder = false) => {
    const { expanded } = menuState.filter(el => el.id === item.id)[0] || false;
    return (
      <React.Fragment key={item.id}>
        <div
          className={classnames(
            "flex items-center text-theme-menu-folder-font hover:bg-theme-menu-hover cursor-pointer p-2 pl-6 rounded-r-full mr-4 font-bold text-sm uppercase",
            { "bg-blue-darkest": item.link === location.pathname }
          )}
          onClick={() => {
            if (isFolder) {
              dispatch({ type: FOLDER_CLICK, payload: item.id });
            } else {
              history.push(item.link);
            }
          }}
        >
          <div className="flex">{item.icon}</div>
          <div className="ml-3">{item.label}</div>
          {isFolder && (
            <div className="flex flex-grow justify-end items-center">
              <MdKeyboardArrowRight
                size={18}
                className={classnames(styles.arrow, {
                  [`${styles.open}`]: expanded
                })}
              />
            </div>
          )}
        </div>
        {isFolder &&
          expanded &&
          item.content.map(subItem => renderSubItem(subItem))}
      </React.Fragment>
    );
  };

  const renderSubItem = subItem => {
    return (
      <div
        key={subItem.id}
        className={classnames(
          "flex text-theme-menu-folder-font hover:bg-theme-menu-hover cursor-pointer p-2 pl-10 rounded-r-full mr-4 text-sm",
          { "bg-blue-darkest": subItem.link === location.pathname }
        )}
        onClick={() => {
          history.push(subItem.link);
        }}
      >
        <div className="ml-3">{subItem.label}</div>
      </div>
    );
  };

  return (
    <div className="flex flex-grow flex-col bg-theme-menu text-white text-sm pt-4">
      {menu.map(item => {
        switch (item.type) {
          case "folder":
            return renderItem(item, true);
          case "item":
          default:
            return renderItem(item);
        }
      })}
    </div>
  );
};

export default withRouter(Menu);
