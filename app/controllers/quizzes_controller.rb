# frozen_string_literal: true

class QuizzesController < ApplicationController
  
  def index
    @quizzes = Quiz.all
    render status: :ok, json: { quizzes: @quizzes }
  end

  def create
    @quiz = Quiz.new(quiz_params.merge(user_id: current_user.id.to_i))
    if @quiz.save
      render status: :created, json: { notice: 'Quiz created successfully.' }
    else
      render status: :unprocessable_entity, json: { error: @quiz.errors }
    end
  end

  def quiz_params
    params.required(:quiz_data).permit(:title)
  end
end
