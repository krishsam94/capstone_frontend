import React from 'react';
import './App.css';
import Footer from './components/footer/Footer';
import Header from './components/header/Header';
import Dashboard from './components/dashboard/Dashboard';
import Events from './components/events/Events';
import Actions from './components/events/Actions';
import Login from './components/login/Login';
import Register from './components/register/Register';
//import DisplayCard from './components/displaycard/DisplayCard';
//import AddNews from './components/addNews/AddNews';
import {
  Route,
  BrowserRouter as Router,
} from "react-router-dom";
import { isLoggedIn } from './services/isLoggedInService';
import { Redirect } from 'react-router';
import 'bootstrap/dist/css/bootstrap.min.css';



class App extends React.Component {

  constructor() {
    super();
    this.state = {
      isLoggedIn: isLoggedIn()
    }
  }

  updateState = () => {
    this.setState({ isLoggedIn: isLoggedIn() });
  }
  render() {
    return <div className='main-content' >
      <Header updateMain={this.updateState} isLoggedIn={this.state.isLoggedIn}></Header>
      <Router>
        <Route exact path="/">{this.state.isLoggedIn ? <Redirect to="./dashboard" /> : <Login updateMain={this.updateState}/>}</Route>
        <Route exact path="/login">{this.state.isLoggedIn ? <Redirect to="./dashboard" /> : <Login updateMain={this.updateState}/>}</Route>
        <Route exact path="/dashboard">{this.state.isLoggedIn ? <Dashboard /> : <Redirect to="./" />}</Route>
        <Route exact path="/events">{this.state.isLoggedIn ? <Events /> : <Redirect to="./" />}</Route>
        <Route exact path="/report">{this.state.isLoggedIn ? <div><Actions /><Events /></div> : <Redirect to="./" />}</Route>
        <Route exact path="/register">{this.state.isLoggedIn ? <Dashboard /> : <Register />}</Route>
      </Router>
      <Footer/>
    </div>
  }

}

export default App;
