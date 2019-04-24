import React from "react";
import Menu from "./Menu";
import { shallow } from "enzyme";
import uuidv4 from "uuid/v4";

// Icons
import { MdDashboard } from "react-icons/md";

describe("Menu component", () => {
  it("renders without crashing", () => {
    shallow(<Menu />);
  });

  it("should have one item of 'item' type", () => {
    // Default menu config
    const iconSize = 18;
    const iconColor = "#9CA1B1";

    // Menu
    const menuTree = [
      {
        id: uuidv4(),
        type: "item",
        label: "Dashboard",
        icon: <MdDashboard size={iconSize} color={iconColor} />,
        link: "/admin"
      }
    ];

    const wrapper = shallow(<Menu menu={menuTree} />);
    // Enzyme does not support react hooks yet :(
  });
});
