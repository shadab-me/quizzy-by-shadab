# frozen_string_literal: true

class UsersController < ApplicationController
  before_action :set_user, only: %i[show edit update destroy]

  def create
    @user = User.new(user_params)
    if @user.save
      session[:user_id] = @user_id
      render status: :created, json: { nottice: 'Successfully Created' }
    else
      render  json: { error: @user.errors }
    end
  end

  private

  def user_params
    params.require(:user).permit(:first_name, :last_name, :email, :password, :password_confirmation)
  end
end
