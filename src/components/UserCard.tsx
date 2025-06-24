import React from 'react';
import { User } from '../redux/user/userTypes';
import { useNavigate } from 'react-router-dom';

const UserCard = ({ id, image, firstName, lastName, email }: User) => {
    const navigate = useNavigate()

    return (
        <li
            style={{
                width: '40%',
                flexGrow: '1',
                backgroundColor: 'white',
                borderRadius: '16px',
                cursor: 'pointer',
                display: 'flex',
                gap: '16px',
                padding: '16px'
            }}
            onClick={() => navigate(`/users/${id}`)}
        >
            <img width={'160px'} src={image} alt={firstName} />
            <div>
                <h3>{firstName} {lastName}</h3>
                <h4>{email.length > 22 ? email.slice(0, 22) + '..' : email}</h4>
            </div>
        </li>
    );
};

export default UserCard;