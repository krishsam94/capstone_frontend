import React from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { FormErrors } from './formErrors';
import './reg.css';
import { register } from '../../services/registerService';
import loginImg from '../../images/loginimg.jpg';
import { Redirect } from 'react-router';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Image from 'react-bootstrap/Image';

class Register extends React.Component {
    constructor() {
        super();
        this.state = {
            username: '',
            password: '',
            cpassword: '',
            formErrors: { username: '', password: '', invalidUser: '', cpassword: '' },
            usernameValid: false,
            passwordValid: false,
            cpasswordValid: false,
            formValid: false
        }
        this.handleUserInput = this.handleUserInput.bind(this);
        this.validateField = this.validateField.bind(this);
    }
    handleUserInput = (e) => {
        let name = e.target.name;
        let value = e.target.value;
        this.setState({ [name]: value }, () => {
            this.validateField(name, value)
        })
    }
    validateField(fieldName, value) {
        let fieldValidationErrors = this.state.formErrors;
        let usernameValid = this.state.usernameValid;
        let passwordValid = this.state.passwordValid;
        let cpasswordValid = this.state.cpasswordValid;
        switch (fieldName) {
            case 'username':
                usernameValid = value.length >= 3;
                fieldValidationErrors.username = usernameValid ? '' : 'is invalid';
                break;
            case 'password':
                passwordValid = value.length >= 3;
                fieldValidationErrors.password = passwordValid ? '' : 'is too short';
                break;
            case 'cpassword':
                cpasswordValid = value === document.getElementsByName("password")[0].value;
                fieldValidationErrors.cpassword = cpasswordValid ? '' : 'Passwords not match';
                break;
            default:
                break;
        }
        this.setState({
            formErrors: fieldValidationErrors,
            usernameValid: usernameValid,
            passwordValid: passwordValid,
            cpasswordValid: cpasswordValid
        }, this.validateForm)
    }
    validateForm() {
        this.setState({ formValid: this.state.usernameValid && this.state.passwordValid && this.state.cpasswordValid});
    }
    formSubmit = async (e) => {
        e.preventDefault();
        if (!(this.state.usernameValid && this.state.passwordValid && this.state.cpasswordValid))
            alert("Enter valid data");
        else {
            let resp = await register(this.state.username, this.state.password);
            if (resp && resp.status === 200) {
                alert("User registration successful");
                window.location.href = "/login";
            }
            else {
                this.setState({ formErrors: { invalidUser: "User Already Exists" } });
            }
        }
    }
    render() {
        if (this.state.token) {
            this.props.updateMain();
            return <Redirect to='./dashboard'></Redirect>
        }
        else {
        return <div>
                <Container className="p-0 overflow-hidden loginCont">
                    <Row className="m-0">
                        <Col className="p-0" xs={7}><Image src={loginImg} responsive className="w-100" /></Col>
                        <Col className="p-0">
                            <Form className='loginForm'>
                                <div className="formTitle">
                                    <span className="cognizantTxt">Cognizant</span>
                                    <span className="outreachTxt"> Outreach</span>
                                    <div className="feedbacktxt">feedback management system</div>
                                </div>
                                <FormErrors formErrors={this.state.formErrors} />
                                <Form.Group>
                                    <Form.Control type="username"
                                        required
                                        value={this.state.username}
                                        placeholder="UserId"
                                        name="username"
                                        onChange={this.handleUserInput}
                                        className="w-75" />
                                </Form.Group>

                                <Form.Group >
                                    <Form.Control
                                        type="password"
                                        required
                                        value={this.state.password}
                                        placeholder="Password"
                                        name="password"
                                        onChange={this.handleUserInput}
                                        className="w-75" />
                                </Form.Group>
                                <Form.Group >
                                    <Form.Control
                                        type="password"
                                        required
                                        value={this.state.cpassword}
                                        placeholder="Confirm Password"
                                        name="cpassword"
                                        onChange={this.handleUserInput}
                                        className="w-75" />
                                </Form.Group>
                                <Button type="submit"
                                    onClick={this.formSubmit} className="w-75">
                                    REGISTER
                                </Button>
                                <p className="mt-2 regTxt mb-0">Click <a href="/login">here</a> to login</p>
                            </Form>
                        </Col>
                    </Row>
                </Container>
            </div>
        }
    }
}
export default Register;