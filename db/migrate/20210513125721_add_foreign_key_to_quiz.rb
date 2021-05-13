class AddForeignKeyToQuiz < ActiveRecord::Migration[6.1]
  def change
        add_foreign_key :quizzes, :users, column: :create_by

  end
end
