import './App.css';
import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import Newsfeed from './components/Newsfeed';
import Review from './components/Review';
import Board from './components/Board';
import Loading from './components/Loading';
import NavBar from "./views/NavBar/NavBar";

class App extends React.Component {

  constructor () {
    super()
    this.state = { start : true }

    this.startHandler = this.startHandler.bind(this);
  }

  startHandler() {
    this.setState({ start : true })
  }

  render () {
    return (
      this.state.start ? 
        <Router>
          <div>
          <NavBar />

            {/* A <Switch> looks through its children <Route>s and
                renders the first one that matches the current URL. */}
          <div className="body">
            <Switch>
              <Route exact path="/">
                <Newsfeed />
              </Route>
              <Route exact path="/review">
                <Review />
              </Route>
              <Route exact path="/board">
                <Board />
              </Route>
            </Switch>
          </div>
          </div>
        </Router>
        :
        <Loading start={this.startHandler}/>
    );
  }
  
}


export default App;
