import TimeContainer from "./components/AddTimeForm";
import TimeFormEdit from "./components/TimeFormEdit";
import {UserForm} from "./components/User/UserForm"
import {List} from "./components/List"; 
import AddTimeForm from "./components/AddTimeForm";
import {NewUser} from "./components/User/NewUser"
import { BrowserRouter as Router, Link, Switch, Route, useHistory } from "react-router-dom";
import { useState } from "react";
import "./Style.css";




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
        {loggedIn && <Link className="navBar" to="/home">Home</Link>}
        {loggedIn && <Link className="navBar" to="/add">Add</Link>}
        {!loggedIn && <Link className="navBar" to="/">Login</Link>}
        {loggedIn && <Link className="navBar"  onClick={onLogOut} to="/logout">Logout</Link>}
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
