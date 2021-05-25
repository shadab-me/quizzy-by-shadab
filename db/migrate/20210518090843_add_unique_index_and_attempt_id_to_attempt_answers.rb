# frozen_string_literal: true

class AddUniqueIndexAndAttemptIdToAttemptAnswers < ActiveRecord::Migration[6.1]
  def change
    change_table :attempt_answers do |t|
      t.integer :attempt_id, null: false
    end
    add_index :attempt_answers, %i[question_id attempt_id], unique: true
  end
end
