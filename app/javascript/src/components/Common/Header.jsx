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
      <nav className="bg-white shadow">
        <div className="mx-auto max-w-7xl sm:px-4 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex px-2 lg:px-0">
              <div className="hidden lg:flex">
                <Link
                  to="/"
                  className="text-blue-600 text-2xl font-bold  items-center transition duration-75 ease-in-out inline-flex cursor-pointer mt-3 px-5 py-1 h-10 focus:outline-none hover:bg-white focus:border-none hover:text-blue-600"
                >
                  Quizzy
                </Link>
              </div>
            </div>
            {isLoggedIn ? (
              <div className="flex items-center justify-end">
                <Link
                  to="/"
                  className="font-semibold items-center rounded mx-3 transition duration-75 ease-in-out inline-flex cursor-pointer mt-1  px-6 py-1 h-10 focus:outline-none hover:bg-blue-600 bg-blue-600 focus:border-none text-blue-200"
                >
                  <span className="text-white"> Home </span>
                </Link>
                <h3 to="" className="">
                  {currentUser.first_name}
                </h3>
                <a
                  onClick={logOut}
                  className="font-semibold items-center rounded mx-3 transition duration-75 ease-in-out inline-flex cursor-pointer mt-1 border-2 border-blue-200 px-6 py-1 h-10 focus:outline-none hover:bg-blue-600 focus:border-none focus:to-white"
                >
                  Log Out
                </a>
              </div>
            ) : null}
          </div>
        </div>
      </nav>
    </>
  );
};

export default Header;
