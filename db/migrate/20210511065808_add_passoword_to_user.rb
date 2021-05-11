# frozen_string_literal: true

class AddPassowordToUser < ActiveRecord::Migration[6.1]
  def change
    change_table :users do |t|
      t.string :password, null: false
    end
  end
end
