# frozen_string_literal: true

class FixColumnName < ActiveRecord::Migration[6.1]
  def change
    change_table :quizzes do |t|
      t.rename :question, :title
    end
  end
end
