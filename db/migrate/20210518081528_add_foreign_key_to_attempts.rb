# frozen_string_literal: true

class AddForeignKeyToAttempts < ActiveRecord::Migration[6.1]
  def change
    add_foreign_key :attempts, :users, column: :user_id
  end
end
