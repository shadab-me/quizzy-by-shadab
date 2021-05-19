import React, { useState } from "react";import quiz from "apis/quiz";
import Toastr from "components/Common/Toastr";
import PageLoader from "components/Common/PageLoader";
import QuizForm from "components/Form/QuizForm";

const CreateQuiz = () => {
  const [loading, setLoading] = useState(false);
  const [title, setTitle] = useState("");

  const submitHandler = async (e) => {
    e.preventDefault();
    setLoading(true);
    if (title.trim()) {
      let quiz_data = { title };
      let data = await quiz.create({ quiz_data });
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
        <h1 className="text-center text-4xl mt-10 font-bold">Add New Quiz</h1>
      </div>
      <QuizForm
        type="Create"
        title={title}
        setTitle={setTitle}
        submitHandler={submitHandler}
        loading={loading}
      />
    </div>
  );
};

export default CreateQuiz;
