# frozen_string_literal: true

class CreateAttemptAnswers < ActiveRecord::Migration[6.1]
  def change
    create_table :attempt_answers do |t|
      t.integer :question_id, null: false
      t.integer :answer_id, null: false
      t.timestamps
    end
  end
end
