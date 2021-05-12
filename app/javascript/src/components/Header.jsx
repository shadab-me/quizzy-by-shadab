import React from "react";

const Header = () => {
  return (
    <>
      <header className="bg-light shadow-xl p-4">
        <nav className="flex justify-between">
          <h1 className="text-2xl font-bold">Quizzy</h1>
          <ul className="flex">
            <li className="p-2">Home</li>
            <li className="p-2">Login</li>
            <li className="p-2">Signup</li>
          </ul>
        </nav>
      </header>
    </>
  );
};

export default Header;
