import React, { useEffect, useState } from "react";
import {Link } from "react-router-dom";

export const List = () => {
  const [timesheets, setTimesheets] = useState([]);
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
  return (
    <div>
      
      <h1>Timesheets</h1>
      <ul>
        {timesheets.map((el, index) => (
          <li
            key={index}
          >
            <Link to={`timesheet/edit/${el.id}`}>{el.client} </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};


