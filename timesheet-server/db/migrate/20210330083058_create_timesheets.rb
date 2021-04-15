class CreateTimesheets < ActiveRecord::Migration[6.1]
  def change
    create_table :timesheets do |t|
t.string :date
t.string :client
t.string :travel_information
t.string :arrival_time
t.string :departure_time
t.string :products_used
t.string :receipts 
t.string :notes
t.string :action_next_visit
t.string :written_by
      t.timestamps
    end
  end
end
