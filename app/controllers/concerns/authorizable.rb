# frozen_string_literal: true

module Authorizable
  extend ActiveSupport::Concern

  included do
    rescue_from Pundit::NotAuthorizedError, with: :authorization_error
    include Pundit
  end

  def authorization_error
    render status: :forbidden, json: { error: 'authorization.denied' }
  end
end
