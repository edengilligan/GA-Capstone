import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";  
import {useParams, useHistory} from "react-router-dom"

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
      .then((timesheetData) => {
        console.log("timesheetData:", timesheetData);
     
      });

  };


  const notifyDelete = () => {
    toast('Timesheet Deleted')
    console.log('toaster test')
  }

  return (
    <div>
    <h2>Edit/Delete</h2>
    <form onSubmit={handleSubmit} >
      <div>
      <label>
      <div className="datetxt">Date</div> 
        <input
          name="date"
          value={formState.date}
          onChange={handleChange}
        ></input>
      </label>
      </div>
      <div>
      <label>
      <div className="clienttxt">Client</div> 
        <input
          name="client"
          value={formState.client}
          onChange={handleChange}
        ></input>
      </label>
      </div>
      <div>
      <label>
      <div className="stafftxt">Staff Attendance</div> 
        <input
          name="staff_attendance"
          value={formState.staff_attendance}
          onChange={handleChange}
        ></input>
      </label>
      </div>
     <div>
      <label>
      <div className="traveltxt">Travel Information</div> 
        <input
          name="travel_information"
          value={formState.travel_information}
          onChange={handleChange}
        ></input>
      </label>
      </div>
<div>
      <label>
      <div className="arrivaltxt">Arrival Time</div> 
        <input
          name="arrival_time"
          value={formState.arrival_time}
          onChange={handleChange}
        ></input>
      </label>
      </div>
        <div>
      <label>
      <div className="departuretxt">Departure Time</div> 
        <input
          name="departure_time"
          value={formState.departure_time}
          onChange={handleChange}
        ></input>
      </label>
      </div>
<div>
      <label>
      <div className="productstxt">Products Used</div> 
        <input
          name="products_used"
          value={formState.products_used}
          onChange={handleChange}
        ></input>
      </label>
      </div>
<div>
      <label>
      <div className="receiptstxt">Receipts</div> 
        <input
          name="receipts"
          value={formState.receipts}
          onChange={handleChange}
        ></input>
      </label>
      </div>
<div>
      <label>
      <div className="notestxt">Notes</div> 
        <input
          name="notes"
          value={formState.notes}
          onChange={handleChange}
        ></input>
      </label>
      </div>
<div>
      <label>
      <div className="actiontxt">Action Next Visit</div> 
        <input
          name="action_next_visit"
          value={formState.action_next_visit}
          onChange={handleChange}
        ></input>
      </label>
      </div>
<div>
      <label>
      <div className="writtentxt">Written By</div> 
        <input
          name="written_by"
          value={formState.written_by}
          onChange={handleChange}
        ></input>
      </label>
      </div>
        <button className ="edit" type="submit" >Edit</button>
        <button className ="delete"onClick={handleDelete} >Delete</button>
      </form>
    </div>
  );
};
export default TimeFormEdit;