import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import quiz from "apis/quiz";
import TableUI from "../common/Table";

const Quizzes = () => {
  const [quizzes, setQuizzes] = useState([]);
  const fetchQuiz = async () => {
    const { data } = await quiz.all();
    setQuizzes(data.quizzes);
  };

  useEffect(() => {
    fetchQuiz();
  }, []);

  if (quizzes.length < 1) {
    return (
      <main>
        <div className="flex justify-end">
          <button className="bg-blue-700 text-blue-100 rounded-sm p-2 mt-10 mr-3 outline-none focus:outline-none shadow-sm">
            <Link to="/create">Add new quiz</Link>
          </button>
        </div>
        <div className="quizzes-list">
          <h1 className="text-2xl flex justify-center items-center opacity-75">
            You Have not create quiz.
          </h1>
        </div>
      </main>
    );
  }
  return (
    <main>
      <div className="flex justify-end">
        <button className="bg-blue-700 text-blue-100 rounded-sm p-2 mt-10 mr-3 outline-none focus:outline-none shadow-sm">
          <Link to="/create">Add new quiz</Link>
        </button>
      </div>
      <div className="quizzes-list">
        <h1 className="text-2xl flex justify-center items-center opacity-75">
          {quizzes.length > 1 ? <TableUI quizzes={quizzes} /> : "loading"}
        </h1>
      </div>
    </main>
  );
};

export default Quizzes;
