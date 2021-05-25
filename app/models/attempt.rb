# frozen_string_literal: true

class Attempt < ApplicationRecord
  belongs_to :quiz
  belongs_to :user
  has_many :question
  has_many :attempt_answers
  accepts_nested_attributes_for :attempt_answers, allow_destroy: true
end
