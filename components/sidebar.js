import React from "react";
import { slide as Menu } from "react-burger-menu";

const Sidebar = props => {
  return (
    <Menu >
      <props.items/>
    </Menu>
  );
};

export default Sidebar