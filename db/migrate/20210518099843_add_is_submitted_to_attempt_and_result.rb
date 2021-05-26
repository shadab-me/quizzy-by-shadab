# frozen_string_literal: true

class AddIsSubmittedToAttemptAndResult < ActiveRecord::Migration[6.1]
  def change
    change_table :attempts do |t|
      t.boolean :is_submitted, default: false
      t.integer  :correct_answers
      t.integer  :incorrect_answers
    end
  end
end
