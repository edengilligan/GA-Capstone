import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export const List = () => {
  const [timesheets, setTimesheets] = useState([]);
  useEffect(() => {
    fetch("http://localhost:3000/api/timesheets", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "token": window.localStorage.getItem('token')
      },
    })
      .then((response) => {
        console.log(response);
        if (response.status === 200) {
          return response.json();
        } else {
          return []; 
        }
      })
      .then((timesheets) => {
        console.log("timesheets:", timesheets);
        setTimesheets(timesheets);
      }).catch((error) => console.log("CATCH error:", error));
  }, [])
  return (
    <div>
      <h1>Timesheets</h1>
      <ul>
        {timesheets.map((el, index) => (
          <ul key={index}>
            <Link to={`timesheet/edit/${el.id}`}>{el.client} </Link>
          </ul>
        ))}
      </ul>
    </div>
  );
};
