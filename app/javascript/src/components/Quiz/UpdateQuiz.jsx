import React, { useState } from "react";
import Logger from "js-logger";
import quiz from "apis/quiz";
import Toastr from "components/Common/Toastr";
import PageLoader from "components/Common/PageLoader";
import QuizForm from "components/Quiz/QuizForm";

const UpdateQuiz = () => {
  const [loading, setLoading] = useState(false);
  const [title, setTitle] = useState("");

  const GetQuizToUpdate = () => {};

  const submitHandler = async (e) => {
    e.preventDefault();
    setLoading(true);
    if (title.trim()) {
      let quiz_data = { title };
      let data = await quiz.update({ quiz_data });
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
