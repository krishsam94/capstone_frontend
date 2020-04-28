import React, { Component } from 'react';
import "./events.css";
import Button from 'react-bootstrap/Button';
import InputGroup from 'react-bootstrap/InputGroup';
import FormControl from 'react-bootstrap/FormControl';
import Alert from 'react-bootstrap/Alert';
import { sendMail } from './../../services/eventsService.js';

class Actions extends Component {
    constructor() {
        super();
        this.state = {
            showAlert: false,
            alertMsg: <div></div>
        }
        this.alertMsg = <div></div>;
    }
    componentDidMount() {
        if (this.state.showAlert)
            this.setState({
                alertMsg: <Alert variant="success" className="p-1 mb-2">
                    <p className="m-1">
                        Mail sent successfully!
                </p>
                </Alert>
            });
    }
    componentDidUpdate(prevProps, prevState) {
        if (prevState.showAlert !== this.state.showAlert && this.state.showAlert)
            this.setState({
                alertMsg: <Alert variant="success" className="p-1 mb-2">
                    <p className="m-1">
                        Mail sent successfully!
                    </p>
                </Alert>
            });
    }
    sendMail = async () => {
        let email = document.querySelector(".mailInput ").value;
        if (this.validateEmail(email)) {
            let resp = await sendMail(email);
            if (resp && resp.status === 200) {
                this.setState({
                    showAlert: true
                });
            }
        }
        else {
            alert("Enter valid E-mail");
            this.setState({
                showAlert: false
            });
        }
    }
    validateEmail = (email) => {
        var re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase());
    }
    render() {
        return <div className="actionsCont">
            <div className="actionsTitleCont">
                <h6 className="actionsTitle p-2 pl-3 m-0">ACTIONS</h6>
            </div>
            <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"></link>
            <div className="actionsBodyCont">
                <div className="emailCont">
                    <div className="emailIconCont">
                        <i className="fa fa-file-excel-o emailIcon" aria-hidden="true"></i>
                    </div>
                    <div className="emailBodyCont p-3">
                        <div className="emailTitle mb-2">Email Report</div>
                        {this.state.alertMsg}
                        <InputGroup className="mailInputCont">
                            <FormControl
                                placeholder="Enter E-mail address"
                                aria-label="Enter E-mail address"
                                className="mailInput mr-4" />
                            <InputGroup.Append>
                                <Button variant="secondary" className="mailBtn" onClick={this.sendMail}>Send Email</Button>
                            </InputGroup.Append>
                        </InputGroup>
                    </div>
                </div>
            </div>
        </div>;
    }
}

export default Actions;