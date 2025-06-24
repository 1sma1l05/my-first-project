import React from 'react';
import { Link } from 'react-router-dom';

const PreviewPage = () => {
    return (
        <div>
            <header style={{
                display: 'flex',
                alignItems: 'center',
                gap: '16px'
            }}>
                <h1>Preview Page</h1>
                <Link to={'/login'}><button>Log in</button></Link>
                <Link to={'/registration'}><button>Sign in</button></Link>
            </header>
        </div>
    );
};

export default PreviewPage;