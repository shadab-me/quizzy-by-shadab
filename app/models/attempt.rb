# frozen_string_literal: true

class Attempt < ApplicationRecord
  belongs_to :quiz
  belongs_to :user
  has_many :question
  has_many :attempt_answers
  accepts_nested_attributes_for :attempt_answers, allow_destroy: true

  def self.generate_report_data
    @attempts = Attempt.where(is_submitted: true)
    @report = []
    @attempts.each do |attempt|
      quiz = attempt.quiz
      user = attempt.user
      next unless quiz && user

      @report << { quiz_name: quiz.title,
                   user_name: "#{user.first_name} #{user.last_name}",
                   email: attempt.user.email,
                   correct_answers: attempt[:correct_answers],
                   incorrect_answers: attempt[:incorrect_answers] }
    end
    @report
  end
end
