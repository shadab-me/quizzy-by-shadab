# frozen_string_literal: true

class Attempt < ApplicationRecord
  belongs_to :quiz
  belongs_to :user
  has_many :question
  has_many :attempt_answer
  accepts_nested_attributes_for :attempt_answer, allow_destroy: true
end
