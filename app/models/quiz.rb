# frozen_string_literal: true

class Quiz < ApplicationRecord
  belongs_to :user
  has_many :questions
  has_many :answers, through: :question
end
