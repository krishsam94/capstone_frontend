import React from 'react';
import Navbar from 'react-bootstrap/Navbar';
import './footer.css';

class Footer extends React.Component {
    render() {
        return (<div>
            <Navbar
                className='footerTxt justify-content-center'>
                <Navbar.Text>
                    &#169; 2020 Outreach feedback management system. Cognizant All rights reserved
                </Navbar.Text>
            </Navbar>
        </div>);
    }
}

export default Footer;