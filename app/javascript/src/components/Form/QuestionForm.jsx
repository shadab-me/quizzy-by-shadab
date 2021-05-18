import React from "react";
import Input from "components/Input";
import Button from "components/Button";

const QuestionForm = ({
  type,
  title,
  setTitle,
  loading,
  submitHandler,
  answers,
  setAnswers,
  addInputHandler,
  removeInputHandler,
  correctAnswerHandler,
}) => {
  const answersChange = (event, index) => {
    const data = [...answers];
    data[index].value = event.target.value;
    setAnswers(data);
  };
  return (
    <form onSubmit={submitHandler}>
      <Input
        label="Question Title"
        table="title"
        placeholder="Enter title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <div className="w-3/4 mb-3">
        <div className="mb-2">
          {answers?.map((item, index) => {
            return (
              <div className="flex items-center">
                <Input
                  key={index}
                  label={`Answer ${index + 1}`}
                  placeholder="value"
                  value={item.value}
                  onChange={(e) => answersChange(e, index)}
                />
                {index > 1 && (
                  <div className="mt-12">
                    <a
                      className="mt-12 cursor-pointer"
                      onClick={() => removeInputHandler(index)}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        width="24"
                        height="24"
                      >
                        <path
                          fill-rule="evenodd"
                          d="M16 1.75V3h5.25a.75.75 0 010 1.5H2.75a.75.75 0 010-1.5H8V1.75C8 .784 8.784 0 9.75 0h4.5C15.216 0 16 .784 16 1.75zm-6.5 0a.25.25 0 01.25-.25h4.5a.25.25 0 01.25.25V3h-5V1.75z"
                        ></path>
                        <path d="M4.997 6.178a.75.75 0 10-1.493.144L4.916 20.92a1.75 1.75 0 001.742 1.58h10.684a1.75 1.75 0 001.742-1.581l1.413-14.597a.75.75 0 00-1.494-.144l-1.412 14.596a.25.25 0 01-.249.226H6.658a.25.25 0 01-.249-.226L4.997 6.178z"></path>
                        <path d="M9.206 7.501a.75.75 0 01.793.705l.5 8.5A.75.75 0 119 16.794l-.5-8.5a.75.75 0 01.705-.793zm6.293.793A.75.75 0 1014 8.206l-.5 8.5a.75.75 0 001.498.088l.5-8.5z"></path>
                      </svg>
                    </a>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {answers?.length < 4 ? (
          <a
            className="text-blue-700 bold mt-3 cursor-pointer"
            onClick={() => addInputHandler()}
          >
            Add More Answer
          </a>
        ) : null}
      </div>

      <label
        className="mt-2 mb-2 block text-sm font-medium
              leading-5 text-bb-gray-700"
      >
        Select correct answer
      </label>

      <select
        onChange={({ target }) => correctAnswerHandler(target.value)}
        name="select"
        className="block f-full px-3 py-2 placeholder-gray-400
          transition duration-150 ease-in-out border
          border-gray-400 rounded-md appearance-none
          focus:outline-none focus:shadow-outline-blue
          focus:border-purple-600 sm:text-sm sm:leading-5"
      >
        <option value="" selected disabled hidden>
          Correct Answer
        </option>
        {answers.map((answer, index) => (
          <option value={index}>{answer.value}</option>
        ))}
      </select>
      <div className="mt-6">
        <Button
          size="small"
          type="submit"
          buttonText={type}
          loading={loading}
        ></Button>
      </div>
    </form>
  );
};

export default QuestionForm;
