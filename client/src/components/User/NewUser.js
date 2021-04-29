import React, { useState } from "react";
import { useHistory } from "react-router-dom";

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
        history.replace('/')
      }})}
  return (
    <div>
    <form onSubmit={submitHandler}>
      <div className="container px-4 py-5 mx-auto">
                    <img className="logo" src="https://media.giphy.com/media/UWk4MNsTLWKoBkV0tt/source.gif"></img>
                        <h3 className="mb-5 text-center heading">Sign Up</h3>
                        <div className="form-group"> <label class="form-control-label text-muted">Username</label> <input name="name" type="text" id="email" value={form.name} placeholder="Username" class="form-control" onChange={changeHandler} ></input></div>
                        <div className="form-group"> <label class="form-control-label text-muted">Password</label> <input name="password" type="password" id="psw" value={form.password} placeholder="Password" class="form-control" onChange={changeHandler} ></input></div>
                        <div className="row justify-content-center my-3 px-3"> <button type="submit" class="btn-block btn-color">Login</button> </div>  
                    </div>
                </form>
             </div>
  )
}