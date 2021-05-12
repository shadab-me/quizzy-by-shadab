# frozen_string_literal: true

class ApplicationController < ActionController::Base
  skip_before_action :verify_authenticity_token
  def index
    @user = User.find_by(id: session[:user_id]) if session[:user_id]
  end
end
