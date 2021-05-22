# frozen_string_literal: true

class QuizzesController < ApplicationController
  before_action :authenticate_user_using_session
  before_action :load_quiz, only: %i[show update destroy]
  before_action :load_question, only: %i[show]
  before_action :check_admin
  before_action :authorize_quiz, only: %i[update destroy]

  def index
    @quizzes = Quiz.where(user_id: current_user.id)
    render status: :ok, json: { quizzes: @quizzes }
  end

  def show
    if @quiz
      render status: :ok, json: { quiz: @quiz, questions: @questions.as_json }
    else
      render status: :unprocessable_entity, json: { errors: @questions.errors }
    end
  end

  def create
    slug = quiz_params[:title].parameterize
    presentSameSlug = Quiz.where('slug like ?', "%#{slug}%").count
    slug = if presentSameSlug.positive?
             "#{slug}+#{presentSameSlug + 1}"
           else
             slug
           end
    @quiz = Quiz.new(quiz_params.merge(user_id: current_user.id.to_i, slug: slug))
    if @quiz.save
      render status: :created, json: { notice: 'Quiz created successfully.' }
    else
      render status: :unprocessable_entity, json: { errors: @quiz.errors }
    end
  end

  def update
    if @quiz.update(quiz_params)
      render status: :ok, json: {
        notice: 'Successfully updated.'
      }
    else
      render status: :unprocessable_entity, json: { errors: @quiz.errors }
    end
  end

  def destroy
    if @quiz.destroy
      render status: :ok, json: { notice: 'Successfully deleted.' }
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

  def check_admin
    if current_user.role == 'administrator'
      p current_user
      true
    else
      render json: { errors: 'Access denied.' }
    end
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

  def authorize_quiz
    authorize @quiz
  end

  def quiz_params
    params.required(:quiz_data).permit(:title, :id, :is_publish)
  end
end
