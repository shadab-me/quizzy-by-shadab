# frozen_string_literal: true

class SessionsController < ApplicationController
  before_action :authenticate_user_using_session, only: %i[show]

  def show
    if current_user
      render json: { logged: true, user: current_user }
    else
      render json: { logged_in: false, user: 'No such user' }
    end
  end

  def create
    @user = User.find_by(email: params[:session][:email].downcase)
    if (@user.role = 'administrator')
      if @user.present? && @user.authenticate(params[:session][:password])
        session[:user_id] = @user.id
        render status: :ok, json: { notice: 'logged in successfully' }
      else
        render status: :unauthorized, json: { notice: 'Incorrect credential, try again' }
      end
    elsif @user.role = 'standard'
      if @user.present?
        session[:user_id] = @user.id
        render status: :ok, json: { notice: 'logged in successfully' }
      else
        render status: :unauthorized, json: { notice: 'Incorrect credential, try again' }
      end
    end
  end

  def destroy
    session[:user_id] = nil if session[:user_id]
  end

  def session_params
    params.require(:session).permit(:email, :password)
  end
end
