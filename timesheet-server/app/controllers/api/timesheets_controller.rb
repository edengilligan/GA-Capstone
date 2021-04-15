class Api::TimesheetsController < ApplicationController
    # index is just a get request /timesheets
    def index 
        render json: Timesheets.all
    end
    
def create  
    puts params[:client]
    timesheets = Timesheets.create(date: params[:date], staff_attendance: params[:staff_attendance], client: params[:client], travel_information: params[:travel_information], arrival_time: params[:arrival_time], departure_time: params[:departure_time], products_used: params[:products_used], receipts: params[:receipts], notes: params[:notes], action_next_visit: params[:action_next_visit], written_by: params[:written_by])
    
    timesheets_valid = timesheets.valid? 
    if timesheets_valid
        render json: {message: "Sucessfully Created Timesheet!"}, status: 200
    else 
    render json: {message: "Unable To Create Timesheet"}, status: 400
end
end 

def show 
    render json: Timesheets.find(params[:id])
end 

def update  
    timesheets = Timesheets.find(params[:id])
    timesheets.update(date: params[:date], staff_attendance: params[:staff_attendance], client: params[:client], travel_information: params[:travel_information], arrival_time: params[:arrival_time], departure_time: params[:departure_time], products_used: params[:products_used], receipts: params[:receipts], notes: params[:notes], action_next_visit: params[:action_next_visit], written_by: params[:written_by])
    render json: {type: 'Sucessfully Updated Timesheet!'}, status: 200 
end

def destroy 
    Timesheets.destroy(params[:id])
    render json: {message: 'Timesheet Sucessfully Deleted'}
end 
end
