# frozen_string_literal: true

class CreateQuestion < ActiveRecord::Migration[6.1]
  def change
    create_table :questions do |t|
      t.string :title, null: false
      t.integer :quiz_id, null: false
      t.timestamps
    end
  end
end
