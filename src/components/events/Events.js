import React, { Component } from 'react';
import Table from 'react-bootstrap/Table';
import "./events.css";
import Button from 'react-bootstrap/Button';
import { getEvent } from "./../../services/eventsService";

class Events extends Component {
    constructor(){
        super();
        this.state = {
            data : []
        }
    }

    getEventdata = async () => {
        let resp = await getEvent();
        if (resp && resp.status === 200) {
            return resp.json().then((data) => {
                if (data) {
                    let allEle = [];
                    data.forEach((element, index) => {
                        let tabEle = [];
                        tabEle.push(<td>{element.id}</td>);
                        tabEle.push(<td>{element.month}</td>);
                        tabEle.push(<td>{element.baselocation}</td>);
                        tabEle.push(<td>{element.beneficiaryname}</td>);
                        tabEle.push(<td>{element.venueaddress}</td>);
                        tabEle.push(<td>{element.councilname}</td>);
                        tabEle.push(<td>{element.project}</td>);
                        tabEle.push(<td>{element.category}</td>);
                        tabEle.push(<td>{element.eventname}</td>);
                        tabEle.push(<td>{element.eventdescription}</td>);
                        tabEle.push(<td>{element.eventdate}</td>);
                        tabEle.push(<td>{element.totalvolunteers}</td>);
                        tabEle.push(<td>{element.totalvolunteerhours}</td>);
                        tabEle.push(<td>{element.totaltravelhours}</td>);
                        tabEle.push(<td>{element.livesimpacted}</td>);
                        tabEle.push(<td>{element.activitytype}</td>);
                        tabEle.push(<td>{element.status}</td>);
                        tabEle.push(<td>{element.poc_id}</td>);
                        tabEle.push(<td>{element.poc_name}</td>);
                        tabEle.push(<td>{element.poc_contact}</td>);

                        allEle.push(<tr>{tabEle}</tr>);
                    });
                    
                    this.setState({
                        data: allEle
                    });
                }
            });
        }
    }
    componentDidMount() {
        this.getEventdata();
    }

    render() {
        return <div className="eventsCont">
            <div className="eventsTitleCont">
                <h6 className="eventsTitle p-2 pl-3 m-0">EVENTS REPORT</h6>
            </div>
            <div className="dwnldButtonCont m-2">
                <Button className="dwnldButton" href="http://localhost:9090/report/api/download">DOWNLOAD EXCEL</Button>
            </div>
            <div className="eventsTableCont">
                <Table bordered size="sm" className="eventsTable">
                    <thead>
                        <tr>
                            <th>Event ID</th>
                            <th>Month</th>
                            <th>Base Location</th>
                            <th>Beneficiary Name</th>
                            <th>Venue Address</th>
                            <th>Council Name</th>
                            <th>Project</th>
                            <th>Category</th>
                            <th>Event Name</th>
                            <th>Event Description</th>
                            <th>Event Date</th>
                            <th>Total Volunteers</th>
                            <th>Total Volunteers Hours</th>
                            <th>Total Travel Hours</th>
                            <th>Lives Impacted</th>
                            <th>Activity Type</th>
                            <th>Status</th>
                            <th>POC Id</th>
                            <th>POC Name</th>
                            <th>POC Contact</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.data}
                    </tbody>
                </Table>
            </div>
        </div>;
    }
}

export default Events;