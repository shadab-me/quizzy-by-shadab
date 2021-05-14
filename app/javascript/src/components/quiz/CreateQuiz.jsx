import React, { useState } from "react";
import Logger from "js-logger";
import quiz from "apis/quiz";

import Toastr from "components/common/Toastr";

const CreateQuiz = () => {
  const [question, setQuestion] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setQuestion(value);
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    if (question.trim()) {
      let quiz_data = { title: question };
      let data = await quiz.create({ quiz_data });
    } else {
      Toastr.error("Question can not blank!");
    }
  };
  return (
    <div className="container mx-auto w-1/2">
      <div className="max-w-md w-full mx-auto">
        <h1 className="text-center text-4xl mt-10 font-bold">Add New Quiz</h1>
      </div>
      <form onSubmit={submitHandler}>
        <label
          htmlFor="question"
          className="block mb-2 text-sm font-medium text-gray-600"
        >
          Question
        </label>
        <input
          required
          type="text"
          name="question "
          value={question}
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
