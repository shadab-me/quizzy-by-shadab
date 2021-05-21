import React, { useState } from "react";
import quiz from "apis/quiz";
import Toastr from "components/Common/Toastr";
import PageLoader from "components/Common/PageLoader";
import QuizForm from "components/Form/QuizForm";
import Logger from "js-logger";
import { useHistory } from "react-router-dom";

const CreateQuiz = () => {
  const [loading, setLoading] = useState(false);
  const [title, setTitle] = useState("");
  const history = useHistory();
  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      if (title.trim()) {
        setLoading(true);
        let quiz_data = { title };
        let data = await quiz.create({ quiz_data });
        history.push("/dashboard");
        setLoading(false);
      } else {
        Toastr.error("Question can not blank!");
      }
    } catch (error) {
      setLoading(false);
      Logger.error(error);
    }
    setLoading(true);
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
