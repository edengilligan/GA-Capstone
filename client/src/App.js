import TimeContainer from "./components/TimeContainer";
import TimeFormEdit from "./components/TimeFormEdit";
import { BrowserRouter as Router, Link, Switch, Route } from "react-router-dom";
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


<Router>
<div className="App">

<Link to="/timesheet">Home</Link>
        <Switch>
          <Route path="/timesheet">
          <TimeContainer />
          </Route>
        </Switch>

        <Link to="/timesheet/edit">Add</Link>
        <Switch>
          <Route path="/timesheet">
          <TimeFormEdit />
          </Route>
        </Switch>

</div>
</Router>