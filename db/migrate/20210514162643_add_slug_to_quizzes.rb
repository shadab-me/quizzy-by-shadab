# frozen_string_literal: true

class AddSlugToQuizzes < ActiveRecord::Migration[6.1]
  def change
    change_table :quizzes do |t|
      t.string :slug, null: false
      t.boolean :is_publish, default: false
    end
  end
end
