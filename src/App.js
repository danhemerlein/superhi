import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import ProjectFour from "components/ProjectFour";

class App extends Component {
  render() {
    return (
      <div className="App">
        <Router>
          <div className="">
            <Switch>
              <Route exact path="/" component={ProjectFour} />
            </Switch>
          </div>
        </Router>
      </div>
    );
  }
}

export default App;
