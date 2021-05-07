import React, { useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Link,
  Switch,
  Route,
  useHistory,
} from "react-router-dom";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import AccountCircle from "@material-ui/icons/AccountCircle";
import Button from "@material-ui/core/Button";
import "date-fns";
import DateFnsUtils from "@date-io/date-fns";
import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker,
  KeyboardDatePicker,
} from "@material-ui/pickers";
import Container from "@material-ui/core/Container";
import { toast } from "react-toastify";


toast.configure();

const AddTimeForm = () => {
  const history = useHistory();


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
    const newState = { ...formState };
    newState.date = date;
    setFormState(newState);
  };

  const arrivalTime = (date) => {
    const newState = { ...formState };
    newState.arrival_time = date;
    setFormState(newState);

  };

  const departureTime = (date) => {
    const newState = { ...formState };
    newState.departure_time = date;
    setFormState(newState);
   
  };

  const handleChange = (e) => {
    console.log("event: ", e.target);
    const newState = { ...formState };
    newState[e.target.name] = e.target.value;
    setFormState(newState);
  };
  
  const notify = (message) => {
    toast.error(message, {position: toast.POSITION.TOP_RIGHT});
  };

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
      notify("Timesheet Sucessfully Added");
      history.replace("/home");
      console.log("use clases: response:", response);
    });
  };

  return (
    <div>
    
      <img
        className="logo"
        src="https://media.giphy.com/media/Gh5KijQtkU5Y9Jd6Xo/source.gif"
      ></img>
      <form onSubmit={handleSubmit}>
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
          <Grid container justify="space-around">
         
            <KeyboardDatePicker
              inputProps={{ style: { fontSize: 20 } }}
              InputLabelProps={{ style: { fontSize: 20 } }}
              disableToolbar
              variant="inline"
              format="MM/dd/yyyy"
              className="loginamebox"
              margin="normal"
              id="date-picker-inline"
              InputLabelProps={{ shrink: true }}
              label="Date"
              name="date"
              value={formState.date}
              onChange={handleDateChange}
              KeyboardButtonProps={{ "aria-label": "change date" }}
            />
          </Grid>

          <div> <TextField inputProps={{ style: { fontSize: 20 } }}InputLabelProps={{ style: { fontSize: 20 } }}className="loginamebox" name="client" id="standard-basic" label="Client" value={formState.client} onChange={handleChange}/></div>
         
          <div><TextField inputProps={{ style: { fontSize: 20 } }} InputLabelProps={{ style: { fontSize: 20 } }}className="loginamebox" name="staff_attendance" id="standard-basic" label="Staff Attendance"
              value={formState.staff_attendance}
              onChange={handleChange} />
          </div>

          <KeyboardTimePicker
            inputProps={{ style: { fontSize: 20 } }}
            InputLabelProps={{ style: { fontSize: 20 } }}
            margin="normal"
            name="arrival_time"
            id="time-picker"
            className="arrival_time"
            InputLabelProps={{ shrink: true }}
            label="Arrival Time"
            className="loginamebox"
            value={formState.arrival_time}
            onChange={arrivalTime}
            KeyboardButtonProps={{
              "aria-label": "change time",
            }}
          />
<div>
<KeyboardTimePicker
            inputProps={{ style: { fontSize: 20 } }}
            InputLabelProps={{ style: { fontSize: 20 } }}
            margin="normal"
            name="departure_time"
            id="time-picker"
            label="Departure Time"
            className="loginamebox"
            value={formState.departure_time}
            InputLabelProps={{ shrink: true }}
            onChange={departureTime}
            KeyboardButtonProps={{
              "aria-label": "change time",
            }}
          />
        </div> 
        </MuiPickersUtilsProvider>
        <div>
          {" "}
          <TextField
            inputProps={{ style: { fontSize: 20 } }}
            InputLabelProps={{ style: { fontSize: 20 } }}
            className="loginamebox"
            name="products_used"
            id="standard-basic"
            label="Products Used"
            value={formState.products_used}
            onChange={handleChange}
          />
        </div>
        <div>
          {" "}
          <TextField
            inputProps={{ style: { fontSize: 20 } }}
            InputLabelProps={{ style: { fontSize: 20 } }}
            className="loginamebox"
            name="receipts"
            id="standard-basic"
            label="Receipts"
            value={formState.receipts}
            onChange={handleChange}
          />
        </div>
        <div>
          {" "}
          <TextField
            inputProps={{ style: { fontSize: 20 } }}
            InputLabelProps={{ style: { fontSize: 20 } }}
            className="loginamebox"
            name="notes"
            id="standard-basic"
            label="Notes"
            value={formState.notes}
            onChange={handleChange}
          />
        </div>
        <div>
          {" "}
          <TextField
            inputProps={{ style: { fontSize: 20 } }}
            InputLabelProps={{ style: { fontSize: 20 } }}
            className="loginamebox"
            name="action_next_visit"
            id="standard-basic"
            label="Action Next Visit"
            value={formState.action_next_visit}
            onChange={handleChange}
          />
        </div>
        <div>
          {" "}
          <TextField
            inputProps={{ style: { fontSize: 20 } }}
            InputLabelProps={{ style: { fontSize: 20 } }}
            className="loginamebox"
            name="written_by"
            id="standard-basic"
            label="Written By"
            value={formState.written_by}
            onChange={handleChange}
          />
        </div>
        <div>
          {" "}
          <button type="submit" className="signupbutton">
            {" "}
            Add{" "}
          </button>
        </div>
      </form>
      {/* </Container> */}
    </div>
  );
};

export default AddTimeForm;
