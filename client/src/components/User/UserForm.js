import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { MDBContainer, MDBRow, MDBCol, MDBBtn, MDBCard, MDBInput } from 'mdbreact';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
  root: {
    background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
    border: 0,
    borderRadius: 3,
    boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
    color: 'white',
    height: 48,
    padding: '0 30px',
  },
});

export const UserForm = (props) => {
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
  const submitHandler = (e) => {
    e.preventDefault();
    fetch('http://localhost:3000/api/auth/login', {
      method: "POST",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(form)
    })
    .then(response => response.json())
    .then(data => {
      window.localStorage.setItem('token', data.token)
      console.log("props check:", props)
      props.setLoginHook(true);
       if (data.token) {
        history.replace('/home')
      }})}
  return (

    
    <div>
    <form onSubmit={submitHandler} noValidate autoComplete="off" >
      <div className="container px-4 py-5 mx-auto">
                    <img className="logo" src="https://media.giphy.com/media/Gh5KijQtkU5Y9Jd6Xo/source.gif"></img>
                        <div> <TextField name="name" id="standard-basic" label="Username" value={form.name} onChange={changeHandler}/></div>
                        <div> <TextField name="password" id="standard-basic" label="Password" value={form.password} onChange={changeHandler} type="password"/></div>
                        <div> <Button type="submit" size="large" variant="outlined"> LOGIN 🔛</Button></div>  
                    </div>
                 <div> <Button type="submit" size="large" variant="outlined">Sign up 📝</Button></div>
                </form>
             </div>
  )
}
