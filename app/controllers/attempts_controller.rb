# frozen_string_literal: true

class AttemptsController < ApplicationController
  before_action :load_quiz, only: %i[show create]
  before_action :load_question, only: %i[show create]
  before_action :load_attempt, only: %i[update]
  # after_action :load_attempt_answers, only: %i[update]

  def create
    @user = User.find_by(email: params[:attempt][:user][:email])
    if @user.present?
      if @quiz.present?
        @attempt = Attempt.create(user_id: @user.id, quiz_id: @quiz.id)
        if @attempt.save
          render status: :ok,
                 json: { user: @user, quiz: @quiz, questions: @questions, attempt_id: @attempt.id }
        end
      else
        render status: :unprocessable_entity, json: { errors: @quiz.errors }
      end
    else
      render status: :unprocessable_entity, json: { errors: 'User is not here' }
    end
  end

  def update
    if @attempt
      if @attempt.update(attempt_params)
        render status: :ok, json: { "notice": 'Successfully submitted' }
      else
        render status: :unprocessable_entity, json: { errors: @attempt.errors }
      end
    else
      render status: :unprocessable_entity, json: { errors: @attempt.errors }
    end
  end

  private

  def load_quiz
    @quiz = Quiz.find_by(slug: params[:attempt][:slug])
  rescue ActiveRecord::RecordNotFound => e
    render json: { errors: e }
  end

  def load_quiz
    @quiz = Quiz.find_by(slug: params[:attempt][:slug])
  rescue ActiveRecord::RecordNotFound => e
    render json: { errors: e }
  end

  def load_attempt
    @attempt = Attempt.find(params[:id])
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

  def attempt_params
    params.required(:attempt).permit(:id, :slug, :user, :is_submited,
                                     attempt_answers_attributes: %i[question_id answer_id])
  end
end
