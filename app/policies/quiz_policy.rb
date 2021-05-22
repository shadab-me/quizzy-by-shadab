# frozen_string_literal: true

class QuizPolicy
  attr_reader :user, :quiz

  def initialize(user, quiz)
    @user = user
    @quiz = quiz
  end

  def show?
    true
  end

  def update?
    quiz['user_id'].to_i == user.id
  end

  def create?
    true
  end

  def destroy?
    update?
  end
end
