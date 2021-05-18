# frozen_string_literal: true

class Question < ApplicationRecord
  belongs_to :quiz
  has_many :answers, dependent: :destroy
  accepts_nested_attributes_for :answers, allow_destroy: true
  validates :title, presence: true, on: :create
end
