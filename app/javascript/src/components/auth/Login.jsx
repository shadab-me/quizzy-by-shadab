import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
//import authApi from "apis/auth";
//import { setToLocalStorage } from "helpers/storage";

export default function Login(props) {
  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    authApi.login({ login: user }).then(({ data }) => {
      setToLocalStorage(data);
      window.location.href = "/";
    });
  };

  return (
    <>
      <div className="container mx-auto p-8 flex">
        <div className="max-w-md w-full mx-auto">
          <h1 className="text-4xl text-center mb-12 font-thin">Login</h1>
          <form onSubmit={handleSubmit}>
            <div className="bg-white rounded-lg overflow-hidden shadow-2xl">
              <div className="p-8">
                <div className="mb-5">
                  <label
                    htmlFor="Email"
                    className="block mb-2 3000text-sm font-medium text-gray-600"
                  >
                    Email
                  </label>

                  <input
                    type="text"
                    name="email"
                    className="block w-full p-3 rounded bg-gray-200 border border-transparent focus:outline-none"
                    value={user.username}
                    onChange={handleChange}
                  />
                </div>

                <div className="mb-5">
                  <label
                    htmlFor="password"
                    className="block mb-2 text-sm font-medium text-gray-600"
                  >
                    Password
                  </label>

                  <input
                    type="password"
                    name="password"
                    className="block w-full p-3 rounded bg-gray-200 border border-transparent focus:outline-none"
                    value={user.password}
                    onChange={handleChange}
                  />
                </div>

                <button
                  type="submit"
                  className="w-full p-3 mt-4 bg-indigo-600 text-white rounded shadow"
                >
                  Login
                </button>
              </div>

              <div className="flex justify-between p-8 text-sm border-t border-gray-300 bg-gray-100">
                <Link to="/signup" className="font-medium text-indigo-500">
                  Create account
                </Link>
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
