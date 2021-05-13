# frozen_string_literal: true

class CreateQuizzes < ActiveRecord::Migration[6.1]
  def change
    create_table :quizzes do |t|
      t.string :question
      t.integer :create_by
      t.timestamps
    end
  end
end
