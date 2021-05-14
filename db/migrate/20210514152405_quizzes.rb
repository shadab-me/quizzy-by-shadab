# frozen_string_literal: true

class Quizzes < ActiveRecord::Migration[6.1]
  def change
    create_table :quizzes do |t|
      t.string :question, null: false
      t.string :user_id, null: false
      t.timestamps
    end
  end
end
