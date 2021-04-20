import TimeContainer from "./components/TimeContainer";
import TimeFormEdit from "./components/TimeFormEdit";
import {List} from "./components/List"; 
// import Login from "./components/Login"; 
import { BrowserRouter as Router, Link, Switch, Route } from "react-router-dom";
import "./Style.css";

export const App = () => {
  return (
    <Router>
      <div>
        <Link to="/timesheet">Add</Link>
        <Link to="/">Home</Link>
        <Switch>
          <Route exact path="/timesheet">
            <TimeContainer />
          </Route>
          <Route exact path="/timesheet/edit/:id">
            <TimeFormEdit />
          </Route>
          <Route exact path="/">
            <List />
          </Route>
        </Switch>
      </div>
    </Router>
  );
};
