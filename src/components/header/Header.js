import React from 'react';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import {isLoggedIn} from '../../services/isLoggedInService';
import { UserDetail } from './userInfo';
import './header.css';

class Header extends React.Component {

    constructor() {
        super();
        this.state = {
            isLoggedIn : isLoggedIn()
        };
    }
    componentDidUpdate = (prevProps) => {
        if(this.props.isLoggedIn !== prevProps.isLoggedIn)
            this.setState({isLoggedIn : this.props.isLoggedIn});
    }
    getHomeBannerLink = () => {
        return this.state.isLoggedIn ? "/dashboard" : "/";
    }
    logout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("username");
        this.props.updateMain();
        this.setState({isLoggedIn : isLoggedIn()});
    }
    render() {
        if (!this.state.isLoggedIn) {
            return <div></div>
        }
        else{
            return (<div>
                <Navbar variant="dark" className="headerCont">
                    <Navbar.Brand href={this.getHomeBannerLink()} text="white" className="headerTitle">Outreach <span>FMS</span></Navbar.Brand>
                    <Nav.Link className="text-nowrap" href="/dashboard" style={{ color: 'white', textDecoration: 'none' }}>Dashboard</Nav.Link> 
                    <Nav.Link className="text-nowrap" href="/events" style={{ color: 'white', textDecoration: 'none' }}>Events</Nav.Link>
                    <Nav.Link className="text-nowrap" href="/report" style={{ color: 'white', textDecoration: 'none' }}>Reports</Nav.Link>
                    <UserDetail thisObj={this}/>
                </Navbar>
            </div>);
        }      
    }
}

export default Header;