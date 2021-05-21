import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import quiz from "apis/quiz";
import TableUI from "components/Common/Table";
import PageLoader from "components/Common/PageLoader";
import Button from "components/Button";
import Container from "components/Container";
const Quizzes = () => {
  const [loading, setLoading] = useState(true);
  const [quizzes, setQuizzes] = useState("");

  const fetchQuiz = async () => {
    const { data } = await quiz.all();
    try {
      setQuizzes(data.quizzes);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      logger.error(error);
    }
  };

  useEffect(() => {
    fetchQuiz();
  }, []);

  const handleDelete = async (id) => {
    setLoading(true);
    await quiz.delete(id);
    await fetchQuiz();
    setLoading(false);
  };
  if (loading) {
    return <PageLoader />;
  }
  if (quizzes.length < 1) {
    return (
      <main>
        <div className="flex justify-end mr-20 mt-16">
          <div>
            <Button
              size={"medium"}
              type={"link"}
              iconClass={"ri-add-line"}
              buttonText="Add Question"
              path={`/${id}/quiz/new`}
            ></Button>{" "}
          </div>
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
      <div className="flex justify-end mr-20 mt-16">
        <div className="">
          <Button
            size={"medium"}
            type={"link"}
            iconClass={"ri-add-line"}
            buttonText="Add Question"
            path={`quiz/new`}
          ></Button>{" "}
        </div>
      </div>

      <div className="quizzes-list">
        <h1 className="text-2xl flex justify-center items-center opacity-75">
          <TableUI quizzes={quizzes} handleDelete={handleDelete} />
        </h1>
      </div>
    </main>
  );
};

export default Quizzes;
