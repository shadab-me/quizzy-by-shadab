class QuizzesController < ApplicationController
    def create
        create_by = current_user
        @quiz = Quiz.new(...quiz_params, create_by)
        if @quiz.save
           render status: :create, json: {notice: "Quiz Create Successfully."}
        else
         render json: {errors: @quiz.errors}
        end

    end

    def quiz_params
        params.required(:quiz).permit(:question)
    end
end
