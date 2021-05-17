# frozen_string_literal: true

class ApplicationController < ActionController::Base
  skip_before_action :verify_authenticity_token

  include Authorizable

  def current_user
    @user = User.find_by(id: session[:user_id]) if session[:user_id]
    current_user = @user
  end
end
