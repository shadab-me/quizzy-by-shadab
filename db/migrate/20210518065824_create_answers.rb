# frozen_string_literal: true

class CreateAnswers < ActiveRecord::Migration[6.1]
  def change
    create_table :answers do |t|
      t.string :value, null: false
      t.boolean :is_correct, default: false
      t.integer :question_id, null: false
      t.timestamps
    end
  end
end
