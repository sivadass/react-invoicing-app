import React from "react";
import { Link } from "react-router-dom";
import Footer from "./footer";

const Sidebar = () => {
  return (
    <div className="sidebar">
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/invoices">Invoices</Link>
        </li>
        <li>
          <Link to="/clients">Clients</Link>
        </li>
        <li>
          <Link to="/settings">Settings</Link>
        </li>
      </ul>
      <Footer />
    </div>
  );
};

export default Sidebar;
