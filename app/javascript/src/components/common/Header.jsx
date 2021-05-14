import React, { useState, useEffect } from "react";
import auth from "apis/auth";
import { Link } from "react-router-dom";
const Header = ({ isLoggedIn, currentUser }) => {
  const logOut = async () => {
    await auth.logout();
    window.location.href = "/";
  };

  return (
    <>
      <header className="bg-light shadow-lg p-4">
        <nav className="flex justify-between">
          <h1 className="text-2xl font-bold">
            <Link to="/">Quizzy</Link>
          </h1>
          <ul className="flex">
            <li className="p-2">
              <Link to="/">Home</Link>
            </li>
            {isLoggedIn ? (
              <>
                <li className="p-2">{currentUser["first_name"]}</li>
                <li className="p-2" onClick={logOut}>
                  LogOut
                </li>
              </>
            ) : (
              <Link to="/login" className="p-2">
                LogIn
              </Link>
            )}
          </ul>
        </nav>
      </header>
    </>
  );
};

export default Header;
