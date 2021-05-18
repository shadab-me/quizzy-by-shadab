# frozen_string_literal: true

module Authenticable
  extend ActiveSupport::Concern

  def authenticate_user_using_session
    if session[:user_id]
      @user = User.find_by(id: session[:user_id])
      @current_user = @user
    else
       render json: { errors: [t('session.could_not_auth')]}
    end
  end

  private

  def current_user
    @current_user
  end
end
