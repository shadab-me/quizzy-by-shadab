# frozen_string_literal: true

class AttemptsController < ApplicationController
  before_action :load_quiz, only: %i[show create]
  before_action :load_question, only: %i[show create]
  before_action :load_attempt, only: %i[update]
  before_action :authenticate_user_using_session, only: %i[index]

  def index
    @attempts = Attempt.where(is_submitted: true)
    @report = []
    @attempts.each do |attempt|
      quiz = attempt.quiz
      user = attempt.user
      if(quiz && user)
      @report << { quiz_name: quiz.title,
                  user_name: "#{user.first_name} #{user.last_name}",
                  email: attempt.user.email,
                  correct_answers: attempt[:correct_answers],
                  incorrect_answers: attempt[:incorrect_answers] }
    end
  end
    render status: :ok, json: { report: @report }
  end

  def create
    @user = User.find_by(email: params[:attempt][:user][:email])
    if @user.present?
      if @quiz.present?
        @attempt = Attempt.find_by(user_id: @user.id, quiz_id: @quiz.id)
        if @attempt.present?
          if @attempt.is_submitted
            render status: :unprocessable_entity, json: { errors: 'You already have taken this quiz.' }
          else
            render status: :ok,
                   json: { user: @user, quiz: @quiz, questions: @questions, attempt_id: @attempt.id }
          end
        else
          @attempt = Attempt.create(user_id: @user.id, quiz_id: @quiz.id)
          if @attempt.save
            render status: :ok,
                   json: { user: @user, quiz: @quiz, questions: @questions, attempt_id: @attempt.id }
          end
        end

      else
        render status: :unprocessable_entity, json: { errors: @quiz.errors }
      end
    else
      @user = User.new({ email: params[:attempt][:user][:email], first_name: params[:attempt][:user][:first_name],
                         last_name: params[:attempt][:user][:last_name], password: 'welcome', password_confirmation: 'welcome' })
      if @user.save!
        if @quiz.present?
          @attempt = Attempt.create(user_id: @user.id, quiz_id: @quiz.id)
          render status: :ok, json: { user: @user, quiz: @quiz, questions: @questions, attempt_id: @attempt.id }
        else
          render status: :unprocessable_entity, json: { errors: @user.errors }
        end
      end

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
    params.required(:attempt).permit(:id, :slug, :user, :is_submitted, :correct_answers, :incorrect_answers,
                                     attempt_answers_attributes: %i[question_id answer_id])
  end
end
