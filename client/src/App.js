import TimeContainer from "./components/AddTimeForm";
import TimeFormEdit from "./components/TimeFormEdit";
import {UserForm} from "./components/User/UserForm"
import {RegisterUser} from "./components/User/RegisterUser"
import {List} from "./components/List"; 
import AddTimeForm from "./components/AddTimeForm";
// import Login from "./components/Login"; 
import { BrowserRouter as Router, Link, Switch, Route } from "react-router-dom";
import "./Style.css";

export const App = () => {
  return (
    <Router>
      <div>
      <Link to="/login">Login</Link>
      <Link to="/register">Register</Link>
        <Link to="/add">Add</Link>
        <Link to="/">Home</Link>
        <Switch>
        {/* <Route exact path="/login">
            <UserForm />
          </Route> */}
          <Route exact path="/register">
            <RegisterUser />
          </Route>
          <Route exact path="/add">
            <AddTimeForm />
          </Route>
          <Route exact path="/timesheet/edit/:id" >
            <TimeFormEdit />
          </Route>
          <Route exact path="/login">
            <UserForm />
           {/* <List />  */}
          </Route>
        </Switch>
      </div>
    </Router>
  );
};
