import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';


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
                        <div> <TextField inputProps={{style: {fontSize: 20}}}
  InputLabelProps={{style: {fontSize: 20}}} name="name" className="loginamebox" id="standard-basic" label="Username" value={form.name} onChange={changeHandler}/></div>
                        <div> <TextField inputProps={{style: {fontSize: 20}}} // font size of input text
  InputLabelProps={{style: {fontSize: 20}}} name="password" className="loginamebox" id="standard-basic" label="Password" value={form.password} onChange={changeHandler} type="password"/></div>
                         <button type="submit" className='signupbutton' > Login</button> 
                         <button type="submit" className='signupbutton' onClick={() => history.push('/signup')}>Sign up</button>
                    </div>
                  
                </form>
             </div>
             
  )
}


