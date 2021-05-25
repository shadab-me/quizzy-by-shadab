# frozen_string_literal: true

class AddIsSubmittedToAttempt < ActiveRecord::Migration[6.1]
  def change
    change_table :attempts do |t|
      t.boolean :is_submitted, default: false
    end
  end
end
