import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import AliceCarousel from 'react-alice-carousel';
import 'react-alice-carousel/lib/alice-carousel.css';

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
     
      <img className="logo" src="https://media.giphy.com/media/Gh5KijQtkU5Y9Jd6Xo/source.gif"></img>
      
      <ul>
        {timesheets.map((el, index) => (
          <ul key={index}>
            <Link to={`timesheet/edit/${el.id}`}><li class="list-group-item list-group-item-action list-group-item-success">{el.client}<div></div>{el.date}</li></Link>
            
          </ul>
        ))}
        
      </ul>
    </div>
  );
};

