import TimeContainer from "./components/AddTimeForm";
import TimeFormEdit from "./components/TimeFormEdit";
import {UserForm} from "./components/User/UserForm"
import {List} from "./components/List"; 
import AddTimeForm from "./components/AddTimeForm";
import { BrowserRouter as Router, Link, Switch, Route, useHistory } from "react-router-dom";
import { useState } from "react";
import "./Style.css";
import {
  Navbar, NavlinkDropdown,
  NavlinkDropdownElement,Navlink, NavlinksList, Logo
} from 'react-easy-navbar'



export const App = () => {
//   const history = useHistory()
// const [loggedIn, setLoggedIn] = useState(false)  
//   const onLogOut = () => {
//   localStorage.removeItem('token')
//   history.replace('/')
// }

  return (

    
    <Router>
      <div>
      <Link to="/home">Home</Link>
        <Link to="/add">Add</Link>
        <Link to="/">Login</Link>
        {/* <Link onClick={onLogOut}>Logout</Link> */}
        <Switch>
        <Route exact path="/login">
            <UserForm />
          </Route>
          {/* {loggedIn && <Route */}
          <Route exact path="/add">
            <AddTimeForm />
          </Route>
          <Route exact path="/timesheet/edit/:id" >
            <TimeFormEdit />
          </Route>
          <Route exact path="/">
            <UserForm />
          </Route>
          <Route exact path="/home">
            <h1>Current Timesheets</h1>
           <List /> 
          </Route>
        </Switch>
      </div>
    </Router>
  );
};
