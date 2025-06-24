import React from 'react';
import { Link } from 'react-router-dom';

const RegistrationPage = () => {
    return (
        <div>
            <header style={{
                display: 'flex',
                alignItems: 'center',
                gap: '16px'
            }}>
                <h1>Registration Page</h1>
                <Link to={'/'}><button>Preview</button></Link>
            </header>
        </div>
    );
};

export default RegistrationPage;