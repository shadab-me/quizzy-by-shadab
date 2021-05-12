# frozen_string_literal: true

class SessionsController < ApplicationController
  def create
    @user = User.find_by(email: params[:session][:email].downcase)
    puts @user
    if @user.present? && @user.authenticate(params[:session][:password])
      session[:user_id] = @user.id
      redirect_to root_path, notice: 'Logged in successfully'
    else
      render status: :unauthorized, json: { notice: 'Incorrect credential, try again' }
    end
  end

  def destroy
    session[:user_id] = nil if session[:user_id]
    redirect_to root_path, notice: 'Logged out'
  end

  def session_params
    params.require(:session).permit(:email, :password)
  end
end
