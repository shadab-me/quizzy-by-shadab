class PublicController < ApplicationController  
     before_action :load_quiz, only: %i[show update destroy]
     before_action :load_question, only: %i[show]
     
def show
    if @quiz
      render status: :ok, json: { quiz: @quiz, questions: @questions.as_json }
    else
      render status: :unprocessable_entity, json: { errors: @quiz.errors }
    end
end

  private
  def load_quiz
  @quiz = Quiz.find(params[:id])
  rescue ActiveRecord::RecordNotFound => e
    render json: { errors: e }
  end

  def load_question
    @questions = Question.where(quiz_id: @quiz.id).map do |question|
      {
        question: question,
        answers: question.answers
      }
    end
  rescue ActiveRecord::RecordNotFound => e
    render json: { errors: e }
  end

  def quiz_params
    params.required(:quiz).permit(:id)
  end
end