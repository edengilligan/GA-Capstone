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

const AddTimeForm = () => {
  const history = useHistory();

  const [selectedDate, setSelectedDate] = React.useState(new Date());
  const [selectedTime, setSelectedTime] = React.useState(new Date());
  const [selectedTime2, setSelectedTime2] = React.useState(new Date());
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
    console.log("date", selectedDate);
  };

  const handleTimeChange = (time) => {
    setSelectedTime(time);
    console.log("time", selectedTime);
  };


  const handleTimeChange2 = (time2) => {
    setSelectedTime2(time2);
    console.log("time", selectedTime2);
  };

  const handleChange = (e) => {
    console.log("event: ", e.target);
    const newState = { ...formState };
    newState[e.target.name] = e.target.value;
    setFormState(newState);
  };

  useEffect(() => {
    // console.log("event: ", e.target);
    const newState = { ...formState };
    newState["date"] = selectedDate;
    console.log("this is the new state in use effect", newState);
    setFormState(newState);
  }, [selectedDate]);

  useEffect(() => {
    // console.log("event: ", e.target);
    const newTimeState = { ...formState };
    newTimeState["arrival_time"] = selectedTime;
    console.log("this is the new state in use effect", newTimeState);
    setFormState(newTimeState);
  }, [selectedTime]);

  useEffect(() =>{
    // console.log("event: ", e.target);
    const newTimeState2 = { ...formState };
    newTimeState2["departure_time"] = selectedTime2;
    console.log('this is the new state in use effect', newTimeState2);
    setFormState(newTimeState2);
  }, [selectedTime2])

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
              label="Date"
              name="date"
              value={(formState.date, selectedDate)}
              onChange={(handleChange, handleDateChange)}
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
            label="Arrival Time"
            className="loginamebox"
            value={(handleChange, selectedTime)}
            onChange={(formState.arrival_time, handleTimeChange)}
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
            value={(handleChange, selectedTime2)}
            onChange={(formState.departure_time, handleTimeChange2)}
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
