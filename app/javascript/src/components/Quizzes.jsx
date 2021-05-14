import React from "react";
import { Link } from "react-router-dom";
const Quizzes = () => {
  return (
    <main>
      <div className="flex justify-end">
        <button className="bg-blue-700 text-blue-100 rounded-sm p-2 mt-10 mr-3 outline-none focus:outline-none shadow-sm">
          <Link to="/create">Add new quiz </Link>
        </button>
      </div>
      <div className="quizzes-list">
        <h1 className="text-2xl flex justify-center items-center opacity-75">
          You Have not create quiz.
        </h1>
      </div>
    </main>
  );
};

export default Quizzes;
