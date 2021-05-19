# frozen_string_literal: true

class SessionsController < ApplicationController

  def create
    @user = User.find_by(email: params[:session][:email].downcase)
    if @user.present? && @user.authenticate(params[:session][:password])
      session[:user_id] = @user.id
      redirect_to root_path, json: { notice: 'Incorrect credential, try again' }
    else
      render status: :unauthorized, json: { notice: 'Incorrect credential, try again' }
    end
  end

  def destroy
    if session[:user_id]
      session[:user_id] = nil
      redirect_to root_path
    end
  end

  def is_logged_in
    if current_user
      render json: { logged: true, user: current_user }
    else
      render json: { logged_in: false, user: 'No such user' }
    end
  end

  def session_params
    params.require(:session).permit(:email, :password)
  end
end
