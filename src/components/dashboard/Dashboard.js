import React, { Component } from 'react';
import Card from 'react-bootstrap/Card';
import './dashboard.css';
import { getEvent } from "./../../services/eventsService";

class Dashboard extends Component {
    constructor() {
        super();
        this.state = {
            data : {
                totalvolunteers: 0,
                totalevents: 0,
                livesimpacted: 0
            }
        };
    }
    getDashboardData = async () => {
        let resp = await getEvent();
        if (resp && resp.status === 200) {
            const data = await resp.json();
            console.log(data);
            if (data) {
                let totalvolunteers = 0;
                let livesimpacted = 0;
                data.forEach((element, index) => {
                    totalvolunteers += element.totalvolunteers;
                    livesimpacted += element.livesimpacted;
                });
                this.setState({
                    data: {
                        totalvolunteers: totalvolunteers,
                        totalevents: data.length,
                        livesimpacted: livesimpacted
                    }
                });
            }
        }
    }
    componentDidMount() {
        this.getDashboardData();
    }
    render() {
        return (
            <div className="cardsCont">
                <Card style={{ width: '18rem' }} className="mt-4 mb-4 ml-2 mr-2 card1">
                    <Card.Body className="pb-0">
                        <Card.Subtitle className="mb-2">Total Events</Card.Subtitle>
                        <Card.Title className="mb-4 countTxt">{this.state.data.totalevents}</Card.Title>                        
                    </Card.Body>
                    <Card.Link href="/events" className="p-2 viewTxt">View Detail</Card.Link>
                </Card>
                <Card style={{ width: '18rem' }} className="mt-4 mb-4 ml-2 mr-2 card2">
                    <Card.Body className="pb-0">
                        <Card.Subtitle className="mb-2">Lives Impacted</Card.Subtitle>
                        <Card.Title className="mb-4 countTxt">{this.state.data.livesimpacted}</Card.Title>                        
                    </Card.Body>
                    <Card.Link href="/events" className="p-2 viewTxt">View Detail</Card.Link>
                </Card>
                <Card style={{ width: '18rem' }} className="mt-4 mb-4 ml-2 mr-2 card3">
                    <Card.Body className="pb-0">
                        <Card.Subtitle className="mb-2">Total Volunteers</Card.Subtitle>
                        <Card.Title className="mb-4 countTxt">{this.state.data.totalvolunteers}</Card.Title>                        
                    </Card.Body>
                    <Card.Link href="/events" className="p-2 viewTxt">View Detail</Card.Link>
                </Card>
                <Card style={{ width: '18rem' }} className="mt-4 mb-4 ml-2 mr-2 card4">
                    <Card.Body className="pb-0">
                        <Card.Subtitle className="mb-2">Total Participants</Card.Subtitle>
                        <Card.Title className="mb-4 countTxt">{this.state.data.totalvolunteers}</Card.Title>                        
                    </Card.Body>
                    <Card.Link href="/events" className="p-2 viewTxt">View Detail</Card.Link>
                </Card>
            </div>
        );
    }

}

export default Dashboard;