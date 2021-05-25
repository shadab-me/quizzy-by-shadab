# frozen_string_literal: true

class PublicController < ApplicationController
  before_action :load_quiz, only: %i[show update destroy]

  def show
    if @quiz
      if @quiz.is_publish
        redirect_to "/public/#{@quiz.slug}/attempts/new"
      else
        render status: :unprocessable_entity, json: { errors: 'Quiz is not public' }
      end
    else
      render status: :unprocessable_entity, json: { errors: 'There is no Quiz' }
    end
  end

  private

  def load_quiz
    @quiz = Quiz.find_by(slug: params[:id])
  rescue ActiveRecord::RecordNotFound => e
    render json: { errors: e }
  end
end
