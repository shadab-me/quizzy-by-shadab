import React, { useEffect, useState } from "react";
import PageLoader from "components/Common/PageLoader";
import QuestionForm from "components/Form/QuestionForm";
import question from "apis/question";
import { useParams, useHistory } from "react-router-dom";
const UpdateQuestion = () => {
  const [loading, setLoading] = useState(false);
  const [title, setTitle] = useState("");
  const [correctAnswer, setCorrectAnswer] = useState("");
  const { id } = useParams();
  const history = useHistory();
  const [answers, setAnswers] = useState([
    { id: 1000, value: "", is_correct: false },
    { id: 2000, value: "", is_correct: false },
  ]);

  const getCurrentQuestion = async () => {
    try {
      setLoading(true);
      let { data } = await question.one(id);
      setTitle(data.question.title);
      let correctIndex = data.answers.findIndex((answer) => answer.is_correct);
      setCorrectAnswer(correctIndex);
      let RowData = [...data.answers];
      RowData[correctIndex].is_correct = false;
      setAnswers(data.answers);
      setLoading(false);
    } catch (error) {
      logger(error);
      setLoading(false);
    }
  };
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
    try {
      let dataWithCorrectAnswer = [...answers];
      dataWithCorrectAnswer[correctAnswer].is_correct = true;
      let questionData = {
        title,
        answers_attributes: dataWithCorrectAnswer,
      };
      const data = await question.update(id, { question: questionData });
      setLoading(false);
      history.goBack();
    } catch (error) {
      setAnswers(false);
      logger(error);
    }
  };

  useEffect(() => {
    getCurrentQuestion();
  }, []);

  if (loading) return <PageLoader />;

  return (
    <div className="container mx-auto w-1/2">
      <div className="max-w-md w-full mx-auto">
        <h1 className="text-center text-4xl mt-10 font-bold">
          Update question
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

export default UpdateQuestion;
