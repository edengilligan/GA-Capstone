import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { toast } from "react-toastify";


toast.configure();

export const NewUser = (props) => {
    const history = useHistory()
  const [form, setForm] = useState({
    name: "",
    password: "",
  });
  const changeHandler = (e) => {
    const newFormState = { ...form };
    newFormState[e.target.name] = e.target.value;
    console.log(newFormState);
    setForm(newFormState);
    // the e.target.name is targeting input type name below
  }

  /* 

  user: { 
    name: "ash", 
    password: "stacey"
  }

  */

  /*

  name: "ash"
  password: "stacey"

  */

  /* 
   {
     user: {
       name: 'ash',
       password: 'stacey'
     }
   }


  */

  const submitHandler = (e) => { 
    // e.preventDefault();
    fetch('http://localhost:3000/api/users', {
      method: "POST",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(
        { user:  {...form}
      })
    }).then(response => response.json())
    
      }
  return (
     
    <div>
    <form onSubmit={submitHandler} noValidate autoComplete="off" >
      <div className="container px-4 py-5 mx-auto">
                    <img className="logo" src="https://media.giphy.com/media/Gh5KijQtkU5Y9Jd6Xo/source.gif"></img>
                        <div> <TextField inputProps={{style: {fontSize: 20}}}
  InputLabelProps={{style: {fontSize: 20}}} className="loginamebox" name="name" id="standard-basic" label="Username" value={form.name} onChange={changeHandler}/></div>
                        <div> <TextField inputProps={{style: {fontSize: 20}}}
  InputLabelProps={{style: {fontSize: 20}}} className="loginamebox" name="password" id="standard-basic" label="Password" value={form.password} onChange={changeHandler} type="password"/></div>
                    </div>
                 <div> <button type="submit" className='signupbutton'>Submit</button></div>
                </form>
                
             </div>
  )
}

// onClick={() => history.push('/')}>Submit