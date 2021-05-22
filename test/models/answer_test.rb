# frozen_string_literal: true

require 'test_helper'

class AnswerTest < ActiveSupport::TestCase
  def setup
    @user = User.new(first_name: 'Sam',
                     last_name: 'Smith',
                     email: 'sam@example.com',
                     role: 'administrator',
                     password: 'welcome',
                     password_confirmation: 'welcome')
    @quiz = @user.quizzes.new(title: 'This is a test poll',slug: "this-is-a-test-poll")
    @question = @quiz.questions.new(title: 'this test question')
    @answer = @question.answers.new(value: 'Test', question: @question)
  end

  def test_value_should_be_valid
    @answer.value = ''
    assert_not @answer.invalid?
  end

  def test_answer_should_be_valid
    assert @answer.valid?
  end

  def test_valid_answer_should_be_saved
    assert_difference 'Answer.count' do
      @answer.save
    end
  end

  def test_valid_should_not_be_valid_without_quiz
    @answer.question = nil
    assert @answer.invalid?
  end
end
