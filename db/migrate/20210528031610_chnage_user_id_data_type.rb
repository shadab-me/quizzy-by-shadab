class ChnageUserIdDataType < ActiveRecord::Migration[6.1]

  def change
     change_table :quizzes do |t|
      t.change :user_id, :integer
    end
  end
end
