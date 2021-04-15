import TimeContainer from "./components/TimeContainer";
import { BrowserRouter as Router, Link, Switch, Route } from "react-router-dom";
import TimeForm from "./components/TimeForm";
import './Style.css'

export const App = () => {
  return (
    <Router>
      <div>
        <Link to="/timesheet">Home</Link>
        <Switch>
          <Route path="/timesheet">
          <TimeContainer />
          </Route>
        </Switch>
      </div>  
    </Router>
  );
};
