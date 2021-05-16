# frozen_string_literal: true

class QuizzesController < ApplicationController
  before_action :load_quiz, only: %i[show update destroy]
  def index
    @quizzes = Quiz.all
    render status: :ok, json: { quizzes: @quizzes }
  end

  def show
    if @quiz
      render status: :ok, json: { quiz: @quiz }
    else
      render status: :unprocessable_entity, json: { error: @quiz.errors.full_message }
    end
  end

  def create
    @quiz = Quiz.new(quiz_params.merge(user_id: current_user.id.to_i))
    if @quiz.save
      render status: :created, json: { notice: 'Quiz created successfully.' }
    else
      render status: :unprocessable_entity, json: { error: @quiz.errors.full_message }
    end
  end

  def update
    if @quiz.update(quiz_params)
      render status: :ok, json: {
        notice: 'Successfully updated.'
      }
    else
      render status: unprocessable_entity, json: { errors: @quiz.errors.full_message }
    end
  end

  def destroy
    if @quiz.destroy
      render status: :ok, json: { notice: 'Successfully deleted.' }
    else
      render status: unprocessable_entity, json: { errors: @quiz.errors.full_message }

    end
  end

  private

  def load_quiz
    @quiz = Quiz.find(params[:id])
  rescue ActiveRecord::RecordNotFound => e
    render json: { errors: e }
  end

  def quiz_params
    params.required(:quiz_data).permit(:title, :id)
  end
end
