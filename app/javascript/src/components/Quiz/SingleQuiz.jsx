import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import PageLoader from "components/Common/PageLoader";
import { useRowState } from "react-table";
import Button from "components/Button";
import quiz from "apis/quiz";
import question from "apis/question";
import Container from "components/Container";

const SingleQuiz = () => {
  const [loading, setLoading] = useState(false);
  const [questions, setQuestions] = useState([]);
  const [title, setTitle] = useState("");
  const { id } = useParams();

  const getQuiz = async () => {
    try {
      setLoading(true);
      const { data } = await quiz.one(id);
      setTitle(data.quiz.title);
      setQuestions(data.questions);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      logger.error(error);
    }
  };
  useEffect(() => {
    getQuiz();
  }, []);

  const handleDelete = async (id) => {
    try {
      setLoading(true);
      await question.delete(id);
      getQuiz();
      setLoading(false);
    } catch (error) {
      setLoading(false);

      logger.error(error);
    }
  };
  if (loading) {
    return <PageLoader />;
  }
  if (questions.length < 1) {
    return (
      <main>
        <div className="title mt-6">
          <h1 className="text-3xl opacity-50 m-2 p-5 font-bold">{title}</h1>
        </div>
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
        <div className="question-list mt-8">
          <h1 className="text-2xl flex justify-center items-center opacity-75">
            There is no question in this quiz.
          </h1>
        </div>
      </main>
    );
  }
  return (
    <main>
      <div className="title mt-6md:flex md:items-center mt-6 max-w-3xl">
        <h1 className="text-3xl opacity-50 m-2 p-5 font-bold">{title}</h1>
      </div>
      <div className="flex justify-end">
        <div className="w-1/4 flex">
          <div className="mr-2">
            <Button
              size={"medium"}
              type={"link"}
              iconClass={"ri-add-line"}
              buttonText="Add Question"
              path={`/${id}/question/new`}
            ></Button>
          </div>
          <div className="">
            <Button
              size={"medium"}
              type={"Button"}
              iconClass={""}
              buttonText="Publish"
              path={``}
            ></Button>
          </div>
        </div>
      </div>
      <Container>
        <div className="questions-list mt-8">
          {questions.map((question, index) => {
            return (
              <div
                key={question.question.id}
                className="mt-6 flex justify-around"
              >
                <div className="md:2/12 block w-2/12 text-gray-500 text-sm">
                  <p className="mb-3">Question: {index + 1}</p>
                  {question.answers.map((answer, index) => (
                    <p key={answer.id} className="mb-3">
                      Option: {index + 1}
                    </p>
                  ))}
                </div>
                <div className="md:6/12 w-6/12">
                  <div className="flex flex-col text-black-300">
                    <p className="font-bold mb-2">{question.question.title}</p>
                    {question.answers.map((answer) => (
                      <p className="flex flex-row mb-2" key={answer.id}>
                        {answer.value}
                        {answer.is_correct && (
                          <span className="text-green-500 relative flex justify-center">
                            <i className="ri-checkbox-circle-fill px-1"></i>{" "}
                            Correct answer
                          </span>
                        )}
                      </p>
                    ))}
                  </div>
                </div>
                <div className="md:w-3/12 w-3/12" key={question.question.id}>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Button
                        buttonText={"Edit"}
                        type={"link"}
                        size={"Small"}
                        path={`/edit/question/${question.question.id}`}
                        iconClass={"ri-pencil-line"}
                      >
                        Edit
                      </Button>
                    </div>
                    <div>
                      <Button
                        buttonText={"Delete"}
                        buttonColor={"red"}
                        iconClass={"ri-delete-bin-line"}
                        marginTop=""
                        onClick={() => handleDelete(question.question.id)}
                      />
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </Container>
    </main>
  );
};

export default SingleQuiz;
