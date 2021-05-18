import React from "react";
import Input from "components/Input";
import Button from "components/Button";

const QuizFrom = ({ type, title, setTitle, loading, submitHandler }) => {
  return (
    <form onSubmit={submitHandler}>
      <Input
        table="title"
        placeholder="Enter title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <div className="mt-6">
        <Button size = "medium" type="submit" buttonText={type} loading={loading}></Button>
      </div>
    </form>
  );
};

export default QuizFrom;
