class CreateShows < ActiveRecord::Migration
  def change
    create_table :shows do |t|
      t.string :title
      t.string :director
      t.string :year
      t.string :description

      t.timestamps null: false
    end
  end
end
