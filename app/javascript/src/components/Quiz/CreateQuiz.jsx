import React, { useState } from "react";
import Logger from "js-logger";
import quiz from "apis/quiz";

import Toastr from "components/Common/Toastr";
import PageLoader from "../Common/PageLoader";

const CreateQuiz = () => {
  const [title, setTitle] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTitle(value);
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    setLoading(true);
    if (title.trim()) {
      let quiz_data = { title };
      let data = await quiz.create({ quiz_data });
      setLoading(false);
      window.location.href = "/";
    } else {
      Toastr.error("Question can not blank!");
    }
  };
  if (loading) return <PageLoader />;
  return (
    <div className="container mx-auto w-1/2">
      <div className="max-w-md w-full mx-auto">
        <h1 className="text-center text-4xl mt-10 font-bold">Add New Quiz</h1>
      </div>
      <form onSubmit={submitHandler}>
        <label
          htmlFor="title"
          className="block mb-2 text-sm font-medium text-gray-600"
        >
          Quiz Title
        </label>
        <input
          required
          type="text"
          name="title "
          value={title}
          onChange={handleChange}
          className="block w-full p-3 rounded bg-gray-200 border border-transparent focus: outline-none"
        ></input>
        <button
          type="submit"
          className="bg-blue-700 mt-4 text-white shadow-lg p-3 rounded-md focus:outline-none"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default CreateQuiz;
