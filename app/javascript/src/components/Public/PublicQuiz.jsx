import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import PageLoader from "components/Common/PageLoader";
import { useRowState } from "react-table";
import Button from "components/Button";
import publicData from "apis/public";
import Container from "components/Container";

const PublicQuiz = () => {
  const [loading, setLoading] = useState(false);
  const [questions, setQuestions] = useState([]);
  const [quizData, setQuizData] = useState("");
  const { slug } = useParams();

  const getQuiz = async () => {
    try {
      setLoading(true);
      const { data } = await publicData.one();
      setQuizData(data.quiz);
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

  if (loading) {
    return <PageLoader />;
  }
  if (!quizData.title) {
    return <h1>No Quiz Available</h1>;
  }
  return (
    <h1>This shshhs ISnsh</h1>
    // <main>
    //   <div className="title mt-6md:flex md:items-center mt-6 max-w-3xl">
    //     <h1 className="text-3xl opacity-50 m-2 p-5 font-bold">
    //       {quizData?.title}
    //     </h1>
    //   </div>
    //   <div className="flex justify-end"></div>
    //   <Container>
    //     <div className="questions-list mt-8">
    //       {questions?.map((question, index) => {
    //         return (
    //           <div
    //             key={question.question.id}
    //             className="mt-6 flex justify-around"
    //           >
    //             <div className="md:2/12 block w-2/12 text-gray-500 text-sm">
    //               <p className="mb-3">Question: {index + 1}</p>
    //             </div>
    //             <div className="md:6/12 w-6/12">
    //               <div className="flex flex-col text-black-300">
    //                 <p className="font-bold mb-2">{question.question.title}</p>
    //                 {question.answers.map((answer) => (
    //                   <p className="flex flex-row mb-2" key={answer.id}>
    //                     {answer.value}
    //                   </p>
    //                 ))}
    //               </div>
    //             </div>
    //           </div>
    //         );
    //       })}
    //     </div>
    //   </Container>
    // </main>
  );
};

export default PublicQuiz;
