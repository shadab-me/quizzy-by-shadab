import React, { useState, useEffect } from "react";
import Logger from "js-logger";
import quiz from "apis/quiz";
import Toastr from "components/Common/Toastr";
import PageLoader from "components/Common/PageLoader";
import QuizForm from "components/Form/QuizForm";
import { useParams } from "react-router-dom";

const UpdateQuiz = () => {
  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const [title, setTitle] = useState("");

  const GetQuizToUpdate = async () => {
    const { data } = await quiz.one(id);
    setTitle(data.quiz.title);
    setLoading(false);
  };
  useEffect(() => {
    GetQuizToUpdate();
  }, []);

  const submitHandler = async (e) => {
    e.preventDefault();
    setLoading(true);
    if (title.trim()) {
      let quiz_data = { title };
      let data = await quiz.update(id, { quiz_data });
      setTimeout(() => {
        window.location.href = "/";
        setLoading(false);
      }, 3500);
    } else {
      Toastr.error("Question can not blank!");
    }
  };
  if (loading) return <PageLoader />;
  return (
    <div className="container mx-auto w-1/2">
      <div className="max-w-md w-full mx-auto">
        <h1 className="text-center text-4xl mt-10 font-bold">Update Quiz</h1>
      </div>
      <QuizForm
        type="Update"
        title={title}
        setTitle={setTitle}
        submitHandler={submitHandler}
        loading={loading}
      />
    </div>
  );
};

export default UpdateQuiz;
