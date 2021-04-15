import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Link, Switch, Route } from "react-router-dom";
import TimeForm from "./TimeForm";
import TimeFormEdit from "./TimeFormEdit";
import { List } from "./List";

const TimeContainer = () => {
  const [timesheets, setTimesheets] = useState([]);
  const [timesheetEdit, setTimesheetEdit] = useState({
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
written_by: "",
  });
  const [timesheetDelete, setTimesheetDelete] = useState({
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
    written_by: "",
  });

  const handleTimeFormSubmit = (formState) => {
    const newTime = {
      date: formState.date,
      staff_attendance: formState.staff_attendance,
      client: formState.client,
      travel_information: formState.travel_information,
      arrival_time: formState.arrival_time,
      departure_time: formState.departure_time,
      products_used: formState.products_used,
      receipts: formState.receipts,
      notes: formState.notes,
      action_next_visit: formState.action_next_visit,
      written_by: formState.written_by
    };
    console.log(newTime);
    const newTimesheets = [...timesheets];
    newTimesheets.push(newTime);

    setTimesheets(newTimesheets);

    fetch("http://localhost:3000/api/timesheets", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newTime),
    }).then((response) => {
      console.log("use clases: response:", response);
    });
  };
  useEffect(() => {
    fetch("http://localhost:3000/api/timesheets", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        return response.json();
      })
      .then((timesheets) => {
        console.log("timesheets:", timesheets);
        setTimesheets(timesheets);
      });
  }, []);
  const handleTimesheetClick = (id) => {
    console.log(id);
    fetch(`http://localhost:3000/api/timesheets/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        return response.json();
      })
      .then((timesheetData) => {
        console.log("timesheetData:", timesheetData);
        setTimesheetEdit(timesheetData);
        setTimesheetDelete(timesheetData);
      });
  };

  const handleDelete = (id) => {
    const newTimesheets = timesheets.filter((el) => {
      if (el.id !== id) {
        return true;
      } else {
        return false;
      }
    });
    setTimesheets(newTimesheets);
    console.log(newTimesheets);
  };

  const handleEditTimesheet = (updatedTimesheet) => {
    console.log("handleEditTimesheet:", updatedTimesheet);
    const foundTimesheet = timesheets.findIndex((timeEl) => {
      console.log("timeEl:", timeEl);
      return timeEl.id === timesheets.id;
    });
    console.log("foundTimesheet:", foundTimesheet);
    const newTimesheets = [...timesheets];
    newTimesheets[foundTimesheet] = timesheets;
    setTimesheets(newTimesheets);
    const url = `http://localhost:3000/api/timesheets/${updatedTimesheet.id}`;
    console.log(url);
    fetch(url, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedTimesheet),
    }).then((response) => {
      console.log("PATCH response:", response); // to refresh page add a .then here and then a fetch to fetch like avove and then set the state of timesheets
    });
  };

  const handleDeleteTimesheet = (deletedTimesheet) => {
    console.log("handleDeleteTimesheet:", deletedTimesheet);
    const foundTimesheet = timesheets.findIndex((timeEl) => {
      console.log("timeEl:", timeEl);
      return timeEl.id === timesheets.id;
    });
    console.log("foundTimesheet:", foundTimesheet);
    const newTimesheets = [...timesheets];
    newTimesheets[foundTimesheet] = timesheets;
    setTimesheets(newTimesheets);
    const url = `http://localhost:3000/api/timesheets/:${deletedTimesheet.id}`;
    console.log(url);

    fetch(url, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(deletedTimesheet),
    }).then((response) => {
      console.log("DELETE response:", response);
    });
  };

  return (
    
    <div> <h1>Timesheets</h1> 
    <ul>
    {timesheets.map((el, index) => (
    <button key={index} onClick={() => { handleTimesheetClick(el.id);}}>{el.client}</button>))}
    </ul>
              
      <TimeForm submit={handleTimeFormSubmit} timesheet={timesheets} />
              
      <TimeFormEdit
        submit={handleEditTimesheet}
        onDelete={handleDelete}
        timesheet={timesheetEdit}
      />
      {/* <TimeFormDelete
        submit={handleDeleteTimesheet}
        timesheet={timesheetDelete}
      />
            */}
    </div>
  );
};
export default TimeContainer;
