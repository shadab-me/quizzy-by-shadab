import React, { useState } from "react";
import { Link, useParams } from "react-router-dom";
import auth from "apis/auth";
import PageLoader from "components/Common/PageLoader";

export default function PublicLogin(props) {
  const [loading, setLoading] = useState(false);
  const { slug } = useParams();
  const [user, setUser] = useState({
    email: "",
    first_name: "",
    last_name: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      setLoading(true);
      let { data } = await auth.login({ session: user });
      window.location.href = "/";
    } catch (error) {
      setLoading(false);
      logger(error);
    }
  };

  return (
    <>
      <h1 className="text-3xl text-bold text-center mb-12 opacity-75 mt-10">
        Welcome to {slug.split("-").join(" ")} Quiz
      </h1>
      <div className="container mx-auto p-8 flex">
        <div className="max-w-md w-full mx-auto">
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
                    htmlFor="first_name"
                    className="block mb-2 3000text-sm font-medium text-gray-600"
                  >
                    First Name
                  </label>

                  <input
                    type="text"
                    name="first_name"
                    className="block w-full p-3 rounded bg-gray-200 border border-transparent focus:outline-none"
                    value={user.first_name}
                    onChange={handleChange}
                  />
                </div>

                <div className="mb-5">
                  <label
                    htmlFor="last_name"
                    className="block mb-2 text-sm font-medium text-gray-600"
                  >
                    Last Name
                  </label>

                  <input
                    type="text"
                    name="last_name"
                    className="block w-full p-3 rounded bg-gray-200 border border-transparent focus:outline-none"
                    value={user.last_name}
                    onChange={handleChange}
                  />
                </div>
                {loading ? (
                  <button className="w-full p-3 mt-4 bg-indigo-600 text-white rounded shadow">
                    Loading...
                  </button>
                ) : (
                  <button
                    type="submit"
                    className="w-full p-3 mt-4 bg-indigo-600 text-white rounded shadow"
                  >
                    Login
                  </button>
                )}
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
