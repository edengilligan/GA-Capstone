import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";  
import {useParams, useHistory} from "react-router-dom"
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import AccountCircle from '@material-ui/icons/AccountCircle';
import { createMuiTheme } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

toast.configure()

const TimeFormEdit = (props) => {
  console.log(props);

  const params = useParams(); 
  const history = useHistory()
  console.log(params)

  const [formState, setFormState] = useState ({
    date: "",
    staff_attendance: "",
    client: "",
    travel_information: "",
    arrival_time: "",
    departure_time:"",
    products_used:"",
    receipts: "" , 
    notes: "",
    action_next_visit: "",
    written_by: ""
  });

  useEffect(() => {
    fetch(`http://localhost:3000/api/timesheets/${params.id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "token": window.localStorage.getItem('token')
      },
    })
      .then((response) => {
        return response.json();
      })
      .then((timesheetData) => {
        console.log("timesheetData:", timesheetData);
        setFormState(timesheetData);
      });
  },[]);
  const handleChange = (e) => {
    const newState = { ...formState };
    newState[e.target.name] = e.target.value;
    setFormState(newState);
  };

  const notify = (message) => {
    toast(message)
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("handleSubmit");
    console.log(formState); 

    const url = `http://localhost:3000/api/timesheets/${params.id}`;
    fetch(url, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        "token": window.localStorage.getItem('token')
      },
      body: JSON.stringify(formState),
    }).then((response) => {
      console.log(response); 
      notify('timesheet edited')
      history.replace('/home')
      // const [toaster, setToaster] = useState({
      
      // this is where you would add TOAST with a pop up message
      // set a state this will help to show the TOASTER popup 
      // import components and show toaster based on state new compnenet will render 
      // after ok history.replace 
      console.log("PATCH response:", response); // to refresh page add a .then here and then a fetch to fetch like avove and then set the state of timesheets
    });
    
  };

  const handleDelete = () => {
    fetch(`http://localhost:3000/api/timesheets/${params.id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "token": window.localStorage.getItem('token')
      },
    })
      .then((response) => {
        return response.json();
      })
      .then((response) => {
        notify('timesheet deleted')
        history.replace('/home')
      })
  };


   return (
    <div>
      <img className="logo" src="https://media.giphy.com/media/Gh5KijQtkU5Y9Jd6Xo/source.gif"></img>
    <h2>Edit/Delete</h2>
    <form onSubmit={handleSubmit} >

    <div> <TextField className="addtimeform" name="date" id="standard-basic" label="Date" value={formState.date} onChange={handleChange}/></div>
    <div> <TextField className="addtimeform" name="client" id="standard-basic" label="Client" value={formState.client}onChange={handleChange}/></div> 
      <div> <TextField className="addtimeform" name="staff_attendance" id="standard-basic" label="Staff Attendance" value={formState.staff_attendance} onChange={handleChange}/></div>    
      <div> <TextField className="addtimeform" name="arrival_time" id="standard-basic" label="Arrival Time" value={formState.arrival_time} onChange={handleChange}/></div>
      <div> <TextField className="addtimeform" name="departure_time" id="standard-basic" label="Departure Time" value={formState.departure_time} onChange={handleChange}/></div>
      <div> <TextField className="addtimeform" name="products_used" id="standard-basic" label="Products Used" value={formState.products_used} onChange={handleChange}/></div>
      <div> <TextField className="addtimeform" name="receipts" id="standard-basic" label="Receipts" value={formState.receipts} onChange={handleChange}/></div>
      <div> <TextField className="addtimeform" name="notes" id="standard-basic" label="Notes" value={formState.notes} onChange={handleChange}/></div>
      <div> <TextField className="addtimeform" name="action_next_visit" id="standard-basic" label="Action Next Visit" value={formState.action_next_visit} onChange={handleChange}/></div>
      <div> <Grid className="addtimeform" container spacing={1} alignItems="center"justify="center"><Grid item><AccountCircle /></Grid>
      <Grid item><TextField name="written_by"alignItems="center"justify="center" id="input-with-icon-grid" label="Written By" value={formState.written_by} onChange={handleChange}/></Grid></Grid></div>  
        <Button type="submit" size="small" variant="outlined"> Edit 🖊️ </Button>
        {/* <button className ="delete"onClick={handleDelete} type="submit" >Delete</button> */}
      </form>
      <Button type="submit" onClick={handleDelete} size="small" variant="outlined"> Delete 🗑️ </Button>
    </div>
  );
};
export default TimeFormEdit;