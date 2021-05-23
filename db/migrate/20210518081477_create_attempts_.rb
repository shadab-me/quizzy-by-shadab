# frozen_string_literal: true

class CreateAttempts < ActiveRecord::Migration[6.1]
  def change
    create_table :attempts do |t|
      t.integer :user_id, null: false
      t.integer :quiz_id, null: false
      t.timestamps
    end
  end
end
