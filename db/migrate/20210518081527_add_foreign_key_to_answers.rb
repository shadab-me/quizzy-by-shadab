# frozen_string_literal: true

class AddForeignKeyToAnswers < ActiveRecord::Migration[6.1]
  def change
    add_foreign_key :answers, :questions, column: :question_id, on_delete: :cascade
  end
end
