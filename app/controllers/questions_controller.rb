class QuestionsController < ApplicationController
  before_action :set_question, only: %i[ show edit update destroy ]
  before_action :authenticate_user_using_session, only: %i[create]

  def index
    @questions = Question.where(quiz.id: params[:id])
    render status: :ok, json: { questions: @question } 
   end

  def show
    render
  end

  
  def create
    @question = Question.new(question_params)
       if @question.save
         render status :created { render :show, status: :created, location: @question }
      else
        render json: {@question.errors, status: :unprocessable_entity} 
    end
  end

  def update
       if @question.update(question_params)
           render  status: :ok, location: @question
      else
        render, status: :unprocessable_entity json: {@question.errors}
     end
  end

  def destroy
    @question.destroy
      render redirect_to questions_url, notice: "Question was successfully destroyed." }
      format.json { head :no_content }
  end

  private
     def set_question
      @question = Question.find(params[:id])
    end

    def quiz_params
    params.required(:question).permit(:title, :options_attributes:)
  end
end
