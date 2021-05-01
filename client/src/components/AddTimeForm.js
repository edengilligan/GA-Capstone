import React, { useEffect, useState } from "react";
import {
  BrowserRouter as Router, Link, Switch, Route, useHistory} from "react-router-dom";
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import AccountCircle from '@material-ui/icons/AccountCircle';
import Button from '@material-ui/core/Button';
import DateFnsUtils from '@date-io/date-fns';
import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker,
  KeyboardDatePicker,
} from '@material-ui/pickers';


const AddTimeForm = () => {
  const history = useHistory();

  const [selectedDate, setSelectedDate] = React.useState(new Date());
  // const [selectedArrivalTime, setSelectedArrivalTime] = React.useState("");

    
  const [formState, setFormState] = useState({
    date: "",
    staff_attendance: "",
    client: "",
    travel_information: "",
    arrival_time: "",
    departure_time: "",
    products_used: "",
    receipts: "",
    notes: "",
    action_next_visit: "",
    written_by: "",
  });

  const handleDateChange = (date) => {
    setSelectedDate(date);
    console.log("date", selectedDate) }

  // const handleArrivalTimeChange = (time) => {
  //   setSelectedArrivalTime(time);
  //   console.log("time", selectedArrivalTime) }

  const handleChange = (e) => {
    console.log("event: ", e.target);
    const newState = { ...formState };
    newState[e.target.name] = e.target.value;
    setFormState(newState);
  };

useEffect(() =>{ 
  // console.log("event: ", e.target);
  const newState = { ...formState };
  newState["date"] = selectedDate;
  console.log('this is the new state in use effect', newState);
  setFormState(newState);
}, [selectedDate])

// useEffect(() =>{ 
//   // console.log("event: ", e.target);
//   const newState = { ...formState };
//   newState["arrival_time"] = selectedArrivalTime;
//   console.log('this is the new state in use effect', newState);
//   setFormState(newState);
// }, [selectedArrivalTime])

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch("http://localhost:3000/api/timesheets", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        token: window.localStorage.getItem("token"),
      },
      body: JSON.stringify(formState),
    }).then((response) => {
      console.log("use clases: response:", response);
    });
  };


  return (
    <div>
      <img className="logo" src="https://media.giphy.com/media/Gh5KijQtkU5Y9Jd6Xo/source.gif"></img>
      <h2>Add Timesheet</h2>
      <form onSubmit={handleSubmit}>
      
      <MuiPickersUtilsProvider utils={DateFnsUtils}>
      <Grid container justify="space-around">
        <KeyboardDatePicker
          disableToolbar
          variant="inline"
          format="MM/dd/yyyy"
          margin="normal"
          id="date-picker-inline"
          label="Date"
          name="date"
          value={formState.date, selectedDate} 
          onChange={handleChange, handleDateChange}
          KeyboardButtonProps={{'aria-label': 'change date',}}/> </Grid>
          </MuiPickersUtilsProvider>
      {/* <div> <TextField className="addtimeform" name="date" id="standard-basic" label="Date" value={formState.date} onChange={handleChange}/></div> */}
      <div> <TextField className="addtimeform" name="client" id="standard-basic" label="Client" value={formState.client}onChange={handleChange}/></div> 
      <div> <TextField className="addtimeform" name="staff_attendance" id="standard-basic" label="Staff Attendance" value={formState.staff_attendance} onChange={handleChange}/></div>    
      <div> <TextField className="addtimeform" name="arrival_time" id="standard-basic" label="Arrival Time" value={formState.arrival_time} onChange={handleChange}/></div>
      <div> <TextField className="addtimeform" name="departure_time" id="standard-basic" label="Departure Time" value={formState.departure_time} onChange={handleChange}/></div>
      <div> <TextField className="addtimeform" name="products_used" id="standard-basic" label="Products Used" value={formState.products_used} onChange={handleChange}/></div>
      <div> <TextField className="addtimeform" name="receipts" id="standard-basic" label="Receipts" value={formState.receipts} onChange={handleChange}/></div>
      <div> <TextField className="addtimeform" name="notes" id="standard-basic" label="Notes" value={formState.notes} onChange={handleChange}/></div>
      <div> <TextField className="addtimeform" name="action_next_visit" id="standard-basic" label="Action Next Visit" value={formState.action_next_visit} onChange={handleChange}/></div>
      <div> <Grid className="addtimeform" container spacing={1} alignItems="center"justify="center"><Grid item><AccountCircle /></Grid><Grid item><TextField name="written_by"alignItems="center"justify="center" id="input-with-icon-grid" label="Written By" value={formState.written_by} onChange={handleChange}/></Grid></Grid></div>
      <div> <Button type="submit" size="small" variant="outlined"> Add </Button></div> 
      </form>
    </div>
    
  );
};

export default AddTimeForm;
