import TimeContainer from "./components/AddTimeForm";
import TimeFormEdit from "./components/TimeFormEdit";
import {UserForm} from "./components/User/UserForm"
import {List} from "./components/List"; 
import AddTimeForm from "./components/AddTimeForm";
import {NewUser} from "./components/User/NewUser"
import { BrowserRouter as Router, Link, Switch, Route, useHistory } from "react-router-dom";
import { useState } from "react";
import "./Style.css";
import { MenuItem } from '@material-ui/core';
import { Menu } from '@material-ui/core';




export const App = () => {

 const name = JSON.parse(localStorage.getItem('name'));
 console.log(name)

const [loggedIn, setLoggedIn] = useState(false)  
  const onLogOut = () => {
    
    setLoggedIn(false);
  localStorage.removeItem('token')
}

  return (
<Router>
    <div>
      <div>
    {loggedIn && <MenuItem component={Link} className="list-group-item" to={'/home'}>Existing Timesheets</MenuItem>}
    {loggedIn && <MenuItem component={Link} className="list-group-item" to={'/add'}>Add New Timesheet</MenuItem>}
    {!loggedIn && <MenuItem component={Link} className="list-group-item" to={'/'}>Login</MenuItem>}
    {loggedIn && <MenuItem component={Link} className="list-group-item" onClick={onLogOut} to={'/logout'}>Logout</MenuItem>}
    </div>
        <Switch>
        <Route exact path="/login">
            <UserForm setLoginHook={setLoggedIn}/>
          </Route>
          <Route exact path="/signup">
            <NewUser />
          </Route>

          <Route exact path="/logout">
            <UserForm setLoginHook={setLoggedIn}/>
          </Route>
          <Route exact path="/add">
          {/* <h2>Welcome, {'name'}!</h2> */}
            <AddTimeForm />
          </Route>
          <Route exact path="/timesheet/edit/:id" >
          {/* <h2>Welcome, {name}!</h2> */}
            <TimeFormEdit />
          </Route>
          <Route exact path="/">
            <UserForm setLoginHook={setLoggedIn} />
          </Route>
          <Route exact path="/home">
          {/* <h2>Welcome, {name}!</h2> */}
            
           <List /> 
          </Route>
        </Switch>
    </div>
   
    </Router>
  );
};
