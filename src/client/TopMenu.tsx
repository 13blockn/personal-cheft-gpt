import React from "react";
// import { Link } from "react-router-dom"; //TODO: add routing

function TopMenu() {
    // TODO untangle nav pieces so logo can be centered while line items are right aligned
    return (
<nav className="flex justify-between items-center my-6">
  <div className="flex items-center ml-3">
    <span className="text-2xl font-bold">Cheft</span>
  </div>
  <ul className="flex justify-end items-center space-x-6">
    <li><a href="#" className="hover:text-gray-300">Home</a></li>
    <li><a href="#" className="hover:text-gray-300 mr-3">Shopping List</a></li>
  </ul>
</nav>
    );
}
  
  export default TopMenu;