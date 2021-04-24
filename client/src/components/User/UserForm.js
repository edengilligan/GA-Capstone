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
        history.replace('/')
      }
    })
  }
  return (
    <div>
      <h1>Login</h1>
      <form onSubmit={submitHandler}>
        <label>
          Username:
          <input name="name" value={form.name} onChange={changeHandler} />
        </label>
        <label>
          Password:
          <input
            name="password"
            value={form.password}
            onChange={changeHandler}
          />
        </label>
        <button type="submit">Login</button>
      </form>
    </div>
  );
};
