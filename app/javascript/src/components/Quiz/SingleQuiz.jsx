import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import quiz from "apis/quiz";
import PageLoader from "components/Common/PageLoader";

const SingleQuiz = () => {
  const [loading, setLoading] = useState(false);
  const [question, setQuestion] = useState([]);
  const [title, setTitle] = useState("");
  const { id } = useParams();
  const fetchQuestions = async () => {};

  const getQuiz = async () => {
    const { data } = await quiz.one(id);
    setTitle(data.quiz.title);
    setLoading(false);
  };
  useEffect(() => {
    getQuiz();
  }, []);

  const handleDelete = async (id) => {};
  if (loading) {
    return <PageLoader />;
  }
  if (question.length < 1) {
    return (
      <main>
        <div className="title mt-6">
          <h1 className="text-3xl opacity-50 m-2 p-5 font-bold">{title}</h1>
        </div>
        <div className="flex justify-end mt-6">
          <button className="bg-blue-700 text-blue-100 rounded-sm p-2 mt-4 mr-3 m-2 outline-none focus:outline-none shadow-sm">
            <Link to={`/${id}/question/new`}>Add question</Link>
          </button>
        </div>
        <div className="question-list mt-6">
          <h1 className="text-2xl flex justify-center items-center opacity-75">
            There is no question in this quiz.
          </h1>
        </div>
      </main>
    );
  }
  return (
    <main>
      <div className="title mt-6">
        <h1 className="text-3xl opacity-50 m-2 p-5 font-bold">{title}</h1>
      </div>

      <div className="flex justify-end">
        <button className="bg-blue-700 text-blue-100 rounded-sm p-2 mt-10 mr-3 outline-none focus:outline-none shadow-sm">
          <Link to={`/${id}/question/new`}>Add question</Link>
        </button>
      </div>
      <div className="question-list">
        <h1 className="text-2xl flex justify-center items-center opacity-75">
          {/* <TableUI question={question} handleDelete={handleDelete} /> */}
        </h1>
      </div>
    </main>
  );
};

export default SingleQuiz;
