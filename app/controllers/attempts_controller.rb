# frozen_string_literal: true

class AttemptsController < ApplicationController
  before_action :load_quiz
  before_action :load_question

  def create
    @user = User.find_by(email: params[:attempt][:user][:email])
    if @user.present?
      if @quiz.present?
        @attempt = Attempt.create(user_id: @user.id, quiz_id: @quiz.id)
        if @attempt.save
          render status: :ok,
                 json: { user: @user, quiz: @quiz, question: @questions, attempt_id: @attempt.id }
        end
      else
        render status: :unprocessable_entity, json: { errors: @quiz.errors }
      end
    else
      render status: :unprocessable_entity, json: { errors: 'User is not here' }
    end
  end

  private

  def load_quiz
    @quiz = Quiz.find_by(slug: params[:attempt][:slug])
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
    params.required(:attempt).permit(:slug, :user)
  end
end
