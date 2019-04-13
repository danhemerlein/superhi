import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import ProjectFour from "components/ProjectFour";
import ProjectFive from "components/ProjectFive";

class App extends Component {
  render() {
    return (
      <div className="App">
        <Router>
          <Switch>
            <Route exact path="/project4" component={ProjectFour} />
            <Route exact path="/project5" component={ProjectFive} />
          </Switch>
        </Router>
      </div>
    );
  }
}

export default App;
