import React, { useState, useEffect } from "react";
import auth from "apis/auth";
import { Link } from "react-router-dom";
const PublicHeader = ({ isLoggedIn, currentUser }) => {
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
          </div>
        </div>
      </nav>
    </>
  );
};

export default PublicHeader;
