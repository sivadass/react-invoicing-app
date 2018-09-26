import React from "react";
import { Link, withRouter } from "react-router-dom";
import PropTypes from "prop-types";

const Header = () => {
  return (
    <div className="app-header">
      <div className="logo">
        <a href="#">React Invoicing App</a>
      </div>
      <div className="search-bar">
        <input type="text" placeholder="Search for products" />
      </div>
      <div className="user-menu">
        <a href="#">John Doe</a>
      </div>
    </div>
  );
};

export default Header;
