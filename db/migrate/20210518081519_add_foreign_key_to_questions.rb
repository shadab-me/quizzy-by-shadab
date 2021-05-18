# frozen_string_literal: true

class AddForeignKeyToQuestions < ActiveRecord::Migration[6.1]
  def change
    add_foreign_key :questions, :quizzes, column: :quiz_id, on_delete: :cascade
  end
end
