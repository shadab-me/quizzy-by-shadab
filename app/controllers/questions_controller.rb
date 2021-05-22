# frozen_string_literal: true

class QuestionsController < ApplicationController
  before_action :set_question, only: %i[show edit update destroy]
  before_action :authenticate_user_using_session
  before_action :load_answers, only: %i[show update index]
  before_action :delete_answers, only: %i[update]
  before_action :check_admin

  def index
    @questions = Question.where(quiz_id: params[:id])
    render status: :ok, json: { questions: @question, answers: @answers }
  end

  def show
    if @question
      render status: :ok, json: { question: @question, answers: @answers }
    else
      render status: :unprocessable_entity, json: { errors: @question.errors }
    end
  end

  def create
    @question = Question.new(question_params)
    if @question.save
      render status: :created, json: { notice: 'Sucessfully Created' }
    else
      render status: :unprocessable_entity, json: { errors: @question.errors }
    end
  end

  def update
    if @question.update(question_params)
      render status: :ok, json: { notice: 'Sucessfully Updated' }
    else
      render status: :unprocessable_entity, json: { errors: @question.errors }
    end
  end

  def destroy
    if @question.destroy
      render status: :ok, json: { notice: 'Successfully deleted' }
    else
      render status: :unprocessable_entity, json: { errors: @question.errors }
    end
  end

  private

  def set_question
    @question = Question.find(params[:id])
  end

  def load_answers
    @answers = Answer.where(question_id: @question.id)
  rescue ActiveRecord::RecordNotFound => e
    render json: { errors: e }
  end

  def delete_answers
    @answers.destroy_all
  rescue ActiveRecord::RecordNotFound => e
    render json: { errors: e }
  end

  def check_admin
    if current_user.role == 'administrator'
      p current_user
    else
      render json: { errors: 'Access denied.' }
    end
  end

  def question_params
    params.required(:question).permit(:id, :title, :quiz_id, answers_attributes: %i[value is_correct])
  end
end
