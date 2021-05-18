# frozen_string_literal: true

class QuestionsController < ApplicationController
  before_action :set_question, only: %i[show edit update destroy]
  before_action :authenticate_user_using_session, only: %i[create]

  def index
    @questions = Question.where(quiz_id: params[:id])
    render status: :ok, json: { questions: @question }
  end

  def show
    render
  end

  def create
    @question = Question.new(question_params)
    if @question.save
      render status: :created, json: { notice: 'Question created successfully.' }
    else
      render status: :unprocessable_entity, json: { errors: @question.errors }
    end
  end

  def update
    if @question.update(question_params)
      render status: :ok, location: @question
    else
      render status: :unprocessable_entity, json: { errors: @question.errors }
    end
  end

  def destroy
    if @question.destroy
      render status: :ok, json: { notice: 'Successfully deleted.' }
    else
      render status: unprocessable_entity, json: { errors: @question.errors }
    end
  end

  private

  def set_question
    @question = Question.find(params[:id])
  end

  def question_params
    params.required(:question).permit(:id, :title, :quiz_id, answers_attributes: %i[value is_correct])
  end
end
