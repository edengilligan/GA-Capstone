import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useParams, useHistory } from "react-router-dom";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import "date-fns";
import DateFnsUtils from "@date-io/date-fns";
import {MuiPickersUtilsProvider,KeyboardTimePicker,KeyboardDatePicker,} from "@material-ui/pickers";
import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from "@material-ui/icons/Delete";
import { injectStyle } from "react-toastify/dist/inject-style";

injectStyle();

toast.configure(); 

const TimeFormEdit = (props) => {
  console.log(props);

  const params = useParams();
  const history = useHistory();
  console.log(params);
  
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

  useEffect(() => {
    fetch(`http://localhost:3000/api/timesheets/${params.id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        token: window.localStorage.getItem("token"),
      },
    })
      .then((response) => {
        return response.json();
      })
      .then((timesheetData) => {
        console.log("timesheetData:", timesheetData);
        setFormState(timesheetData);
      });
  }, []);
  const handleChange = (e) => {
    console.log(e);
    const newState = { ...formState };
    newState[e.target.name] = e.target.value;
    setFormState(newState);
  };

  const notify = (message) => {
    toast.error(message, {position: toast.POSITION.TOP_RIGHT});
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("handleSubmit");
    console.log(formState);

    const url = `http://localhost:3000/api/timesheets/${params.id}`;
    fetch(url, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        token: window.localStorage.getItem("token"),
      },
      body: JSON.stringify(formState),
    }).then((response) => {
      console.log(response);
      notify("Timesheet Sucessfully Updated");
      history.replace("/home");

      console.log("PATCH response:", response); // to refresh page add a .then here and then a fetch to fetch like avove and then set the state of timesheets
    });
  };

  const handleDelete = () => {
    fetch(`http://localhost:3000/api/timesheets/${params.id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        token: window.localStorage.getItem("token"),
      },
    })
      .then((response) => {
        return response.json();
      })
      .then((response) => {
        notify("Timesheet Sucessfully Deleted!");
        history.replace("/home");
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
              className="loginamebox"
              format="MM/dd/yyyy"
              margin="normal"
              id="date-picker-inline"
              // label="Date picker inline"
              name="date"
              value={formState.date}
              onChange={handleDateChange}
              KeyboardButtonProps={{ "aria-label": "change date" }}
            /> 
          </Grid>

          {/* <div> <TextField className="addtimeform" name="date" id="standard-basic" label="Date" value={formState.date} onChange={handleChange}/></div> */}
          <div>
            {" "}
            <TextField
              inputProps={{ style: { fontSize: 20 } }}
              InputLabelProps={{ style: { fontSize: 20 } }}
              className="loginamebox"
              name="client"
              id="standard-basic"
              label="Client"
              value={formState.client}
              onChange={handleChange}
            />
          </div>
          <div>
            {" "}
            <TextField
              inputProps={{ style: { fontSize: 20 } }}
              InputLabelProps={{ style: { fontSize: 20 } }}
              className="loginamebox"
              name="staff_attendance"
              id="standard-basic"
              label="Staff Attendance"
              value={formState.staff_attendance}
              onChange={handleChange}
            />
          </div>




          <KeyboardTimePicker
            inputProps={{ style: { fontSize: 20 } }}
            InputLabelProps={{ style: { fontSize: 20 } }}
            margin="normal"
            name="arrival_time"
            id="time-picker"
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
              onChange={departureTime}
              KeyboardButtonProps={{
                "aria-label": "change time",
              }}
            />
          </div>
        </MuiPickersUtilsProvider>

        {/* <div> <TextField className="addtimeform" name="departure_time" id="standard-basic" label="Departure Time" value={formState.departure_time} onChange={handleChange}/></div> */}
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

        <button type="submit" className="signupbutton2">
          Edit
        </button>
        {/* <button className ="delete"onClick={handleDelete} type="submit" >Delete</button> */}
      </form>
      {/* <button type="submit" onClick={handleDelete} className='signupbutton2'>Delete</button> */}
      <IconButton
        className="trashbutton"
        type="submit"
        onClick={handleDelete}
        aria-label="delete"
      >
        <DeleteIcon fontSize="large" />
      </IconButton>
    </div>
  );
};
export default TimeFormEdit;
