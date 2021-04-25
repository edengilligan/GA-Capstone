import React, { useState } from "react";
import { useHistory } from "react-router-dom";

export const UserForm = () => {
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
       if (data.token) {
        history.replace('/home')
      }})}
  return (
    <form onSubmit={submitHandler}>
      <style>
@import url('https://fonts.googleapis.com/css2?family=Alegreya&display=swap');
</style>
      <div class="container px-4 py-5 mx-auto">
    <div class="card card0">
        <div class="d-flex flex-lg-row flex-column-reverse">
            <div class="card card1">
                <div class="row justify-content-center my-auto">
                    <div class="col-md-8 col-10 my-5">
                    <img src="https://media.giphy.com/media/UWk4MNsTLWKoBkV0tt/source.gif"width="150" height="150" frameBorder="0" allowFullScreen></img>
                        <h3 class="mb-5 text-center heading">Staff Portal</h3>
                        {/* <h6 class="msg-info">Please login to your staff profile</h6> */}
                        <div class="form-group"> <label class="form-control-label text-muted">Username</label> <input name="name" type="text" id="email" value={form.name} placeholder="Phone no or email id" class="form-control" onChange={changeHandler} ></input></div>
                        <div class="form-group"> <label class="form-control-label text-muted">Password</label> <input name="password" type="password" id="psw" value={form.password} placeholder="Password" class="form-control" onChange={changeHandler} ></input></div>
                        <div class="row justify-content-center my-3 px-3"> <button type="submit" class="btn-block btn-color">Login</button> </div>  
                    </div>
                </div>
                <div class="bottom text-center mb-5">
                   <div> <p href="#" class="sm-text mx-auto mb-3">Don't have an account? </p></div><p><button type="submit" class="btn btn-white ml-2">Create new</button></p>
                </div>
            </div>
            <div class="card card2">
                <div class="my-auto mx-md-5 px-md-5 right">
                </div>
            </div>
            </div>
        </div>
    </div>
    </form>
  )
}
