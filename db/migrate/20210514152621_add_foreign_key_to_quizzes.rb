# frozen_string_literal: true

class AddForeignKeyToQuizzes < ActiveRecord::Migration[6.1]
  def change
    add_foreign_key :quizzes, :users, column: :user_id
  end
end
