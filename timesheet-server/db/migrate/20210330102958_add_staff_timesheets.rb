class AddStaffTimesheets < ActiveRecord::Migration[6.1]
  def change
    change_table :timesheets do |t|
      t.string :staff_attendance
  end
end
end