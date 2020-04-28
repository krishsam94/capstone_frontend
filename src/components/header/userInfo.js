import React from 'react';
import Button from 'react-bootstrap/Button';

export const UserDetail = ({thisObj}) => {
    let logoutFn = thisObj.logout;
    return <div className="w-100 text-white text-right">
        Hello, {localStorage.getItem('username')} <Button className="ml-2" variant="secondary" onClick={logoutFn}>Logout</Button>
    </div>;
}
