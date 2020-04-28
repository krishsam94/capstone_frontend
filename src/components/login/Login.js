import React from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { FormErrors } from './formErrors';
import './login.css';
import { login } from '../../services/loginService';
import loginImg from '../../images/loginimg.jpg';
import { Redirect } from 'react-router';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Image from 'react-bootstrap/Image';

class Login extends React.Component {
    constructor() {
        super();
        this.state = {
            username: '',
            password: '',
            formErrors: { username: '', password: '', invalidUser: '' },
            usernameValid: false,
            passwordValid: false,
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
        switch (fieldName) {
            case 'username':
                usernameValid = value.length >= 3;
                fieldValidationErrors.username = usernameValid ? '' : 'is invalid';
                break;
            case 'password':
                passwordValid = value.length >= 3;
                fieldValidationErrors.password = passwordValid ? '' : 'is too short';
                break;
            default:
                break;
        }
        this.setState({
            formErrors: fieldValidationErrors,
            usernameValid: usernameValid,
            passwordValid: passwordValid
        }, this.validateForm)
    }
    validateForm() {
        this.setState({ formValid: this.state.usernameValid && this.state.passwordValid });
    }
    formSubmit = async (e) => {
        e.preventDefault();
        if (!(this.state.usernameValid && this.state.passwordValid))
            alert("Enter valid data");
        else {
            let auth = await login(this.state.username, this.state.password);
            if (auth && auth.status === 200) {
                auth.json().then((data) => {
                    localStorage.setItem('token', data.token);
                    localStorage.setItem('username', this.state.username);
                    this.setState({
                        token: data.token
                    });
                });
            }
            else {
                this.setState({ formErrors: { invalidUser: "Invalid credentials / User Not Exists" } });
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
                                <Button type="submit"
                                    onClick={this.formSubmit} className="w-75">
                                    SIGN ME IN
                                </Button>
                                <p className="mt-2 regTxt mb-0">Interested in Outreach? Click <a href="/register">here</a> to register for next event</p>
                            </Form>
                        </Col>
                    </Row>
                </Container>
            </div>
        }
    }
}
export default Login;