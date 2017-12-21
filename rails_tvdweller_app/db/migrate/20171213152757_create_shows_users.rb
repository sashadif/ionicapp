class CreateShowsUsers < ActiveRecord::Migration
  def change
    create_table :shows_users do |t|
      t.integer :show_id
      t.integer :user_id
    end
  end
end
