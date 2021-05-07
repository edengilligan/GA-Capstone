import TimeContainer from "./components/AddTimeForm";
import TimeFormEdit from "./components/TimeFormEdit";
import { UserForm } from "./components/User/UserForm";
import { List } from "./components/List";
import AddTimeForm from "./components/AddTimeForm";
import { NewUser } from "./components/User/NewUser";
import {
  BrowserRouter as Router,
  Link,
  Switch,
  Route,
  useHistory,
} from "react-router-dom";
import { useState } from "react";
import "./Style.css";
import { MenuItem } from "@material-ui/core";
import { Menu } from "@material-ui/core";
import axios from "axios";
import React from "react";
import Button from "@material-ui/core/Button";

export const App = () => {
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  //  const name = JSON.parse(localStorage.getItem('name'));
  //  console.log(name)

  const [loggedIn, setLoggedIn] = useState(false);
  const [loggedInName, setLoggedInName] = useState("");
  const onLogOut = () => {
    setLoggedIn(false);
    localStorage.removeItem("token");
  };

  return (
    <Router>
      <div>
        <div>
          <div class="dropdown">
            <button
              class="btn btn-secondary dropdown-toggle"
              anchorEl={anchorEl}
              keepMounted
              open={Boolean(anchorEl)}
              type="button"
              onClose={handleClose}
              onClick={handleClick}
              id="dropdownMenuButton"
              data-toggle="dropdown"
              aria-haspopup="true"
              aria-expanded="false"
            >
              Menu
            </button>
          </div>
          <div className="menu"></div>
          <Menu
            id="simple-menu"
            anchorEl={anchorEl}
            keepMounted
            open={Boolean(anchorEl)}
            onClose={handleClose}
          >
            {loggedIn && (
              <MenuItem
                onClick={handleClose}
                component={Link}
                className="list-group-item"
                to={"/home"}
              >
                Existing Timesheets
              </MenuItem>
            )}
            {loggedIn && (
              <MenuItem
                onClick={handleClose}
                component={Link}
                className="list-group-item"
                to={"/add"}
              >
                Add New Timesheet
              </MenuItem>
            )}
            {!loggedIn && (
              <MenuItem
                onClick={handleClose}
                component={Link}
                className="list-group-item"
                to={"/"}
              >
                Login
              </MenuItem>
            )}
            {loggedIn && (
              <MenuItem
                onClick={handleClose}
                component={Link}
                className="list-group-item"
                onClick={onLogOut}
                to={"/logout"}
              >
                Logout
              </MenuItem>
            )}
          </Menu>
        </div>
        <Switch>
          <Route exact path="/login">
            <UserForm
              setLoginHook={setLoggedIn}
              setLoggedInName={setLoggedInName}
            />
          </Route>
          <Route exact path="/signup">
            <NewUser />
          </Route>

          <Route exact path="/logout">
            <UserForm
              setLoginHook={setLoggedIn}
              setLoggedInName={setLoggedInName}
            />
          </Route>
          <Route exact path="/add">
            <AddTimeForm />
          </Route>
          <Route exact path="/timesheet/edit/:id">
            <TimeFormEdit />
          </Route>
          <Route exact path="/">
            <UserForm
              setLoginHook={setLoggedIn}
              setLoggedInName={setLoggedInName}
            />
          </Route>
          <Route exact path="/home">
            <h3 className="welcome">{`Welcome, ${loggedInName}!`}</h3>

            <List />
          </Route>
        </Switch>
      </div>
    </Router>
  );
};
