import React, { useState, useEffect } from "react";
import PageLoader from "components/Common/PageLoader";
import Container from "components/Container";
import Button from "components/Button";
import quizAttempt from "apis/quizattempt";

const PublicQuiz = ({ quiz, questions, attemptId, userDetail }) => {
  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState({});
  const [is_submitted, setSubmitted] = useState(false);
  let correctAnswers = {};
  let [correct, setCorrect] = useState(0);
  let [inCorrect, setInCorrect] = useState(0);

  const checkChangeHandler = (question, answer) => {
    setResponse((preState) => ({
      ...preState,
      [question]: answer,
    }));
  };

  questions.forEach((question) => {
    question.answers.forEach((answer) => {
      if (answer.is_correct) {
        correctAnswers[question.question.id] = answer.id;
      }
    });
  });

  const submitHandler = async () => {
    setLoading(true);
    let selected = [];
    let correctCount = 0;
    let inCorrectCount = 0;
    for (let key in response) {
      if (response[key] == correctAnswers[key]) {
        correctCount++;
      }
      if (response[key] !== correctAnswers[key]) {
        inCorrectCount++;
      }
      setCorrect(correctCount);
      setInCorrect(inCorrectCount);
      let data = { question_id: key, answer_id: response[key] };
      selected.push(data);
    }
    let attempt = {
      user: userDetail,
      attempt_answers_attributes: selected,
    };

    const data = await quizAttempt.update(attemptId, { attempt });
    setSubmitted(true);
    setLoading(false);
  };

  if (loading) {
    return <PageLoader />;
  }

  if (!quiz.title) {
    return <h1>No Quiz Available</h1>;
  }

  return (
    <main>
      <div className="title mt-6md:flex md:items-center mt-6 max-w-3xl">
        <h1 className="text-3xl opacity-50 m-2 p-5 font-bold">{quiz?.title}</h1>
        {is_submitted ? (
          <h3 className="text-xl">
            Thank You for taking the quiz, here is your result. you <br></br>
            have submitted {correct} correct and {inCorrect} incorrect answers.
          </h3>
        ) : null}
      </div>
      <div className="flex justify-end"></div>
      <Container>
        <div className="questions-list mt-8">
          {questions?.map((question, index) => {
            return (
              <div
                key={question.question.id}
                className="mt-6 flex justify-around"
              >
                <div className="md:2/12 block w-2/12 text-gray-500 text-lg bold mt-2">
                  <p className="mb-4 text-lg">Question: {index + 1}</p>
                </div>
                <div className="md:6/12 w-6/12">
                  <div className="flex flex-col text-black-300">
                    <p className="font-bold mb-2 text-2xl">
                      {question.question.title}
                    </p>
                    {question.answers.map((answer) => (
                      <p
                        key={answer.id}
                        onClick={
                          !is_submitted
                            ? () =>
                                checkChangeHandler(
                                  question.question.id,
                                  answer.id
                                )
                            : () => {}
                        }
                        className={`p-4 boder-1 border-gray-400 rounded-md bg-gray-200 mb-2 cursor-pointer mt-2
                            ${
                              response[question.question.id] == answer.id &&
                              !is_submitted
                                ? "bg-blue-300"
                                : null
                            } ${
                          response[question.question.id] ==
                            correctAnswers[question.question.id] &&
                          answer.id == response[question.question.id] &&
                          is_submitted
                            ? "bg-green-500"
                            : null
                        }
                          ${
                            response[question.question.id] !==
                              correctAnswers[question.question.id] &&
                            answer.id == response[question.question.id] &&
                            is_submitted
                              ? "bg-red-500"
                              : null
                          }
                          ${
                            response[question.question.id] !==
                              correctAnswers[question.question.id] &&
                            is_submitted &&
                            answer.id == correctAnswers[question.question.id]
                              ? "bg-green-500"
                              : null
                          }
                          `}
                      >
                        {answer.value}
                      </p>
                    ))}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div className="mt-8 w-1/4 mx-auto my-0">
          <Button
            size={"medium"}
            type={"submit"}
            buttonText={is_submitted ? "Submitted" : "Submit"}
            onClick={!is_submitted ? submitHandler : () => {}}
          ></Button>
        </div>
      </Container>
    </main>
  );
};

export default PublicQuiz;
