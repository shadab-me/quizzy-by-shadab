import React, { useState } from "react";
import Logger from "js-logger";
import quiz from "apis/quiz";
import Toastr from "components/Common/Toastr";
import PageLoader from "components/Common/PageLoader";
import QuestionForm from "components/Form/QuestionForm";

const CreateQuestion = () => {
  const [loading, setLoading] = useState(false);
  const [title, setTitle] = useState("");
  const [correctAnswer, setCorrectAnswer] = useState("");

  const [answers, setAnswers] = useState([
    { value: "", is_correct: false },
    { value: "", is_correct: false },
  ]);

  const correctAnswerHandler = (value) => {
    setCorrectAnswer(value);
  };

  const addInputHandler = () => {
    setAnswers([...answers, { value: "", is_correct: false }]);
  };
  const removeInputHandler = (index) => {
    let updatedData = [...answers];
    updatedData.splice(index, 1);
    setAnswers(updatedData);
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    setLoading(true);
    if (title.trim()) {
      let question = { title, answers };
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
        <h1 className="text-center text-4xl mt-10 font-bold">
          Add new question
        </h1>
      </div>
      <QuestionForm
        type="Create"
        title={title}
        setTitle={setTitle}
        submitHandler={submitHandler}
        loading={loading}
        answers={answers}
        addInputHandler={addInputHandler}
        removeInputHandler={removeInputHandler}
        setAnswers={setAnswers}
        correctAnswerHandler={correctAnswerHandler}
      />
    </div>
  );
};

export default CreateQuestion;
