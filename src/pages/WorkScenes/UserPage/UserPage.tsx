import React, { FormEvent, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAppDispatch } from '../../../hooks/useAppDispatch';
import { getAllUsers } from '../../../redux/user/userThunks';
import { useAppSelector } from '../../../hooks/useAppSelector';
import UserCard from '../../../components/UserCard';

const UserPage = () => {
    const dispatch = useAppDispatch()
    const { loading, error, user } = useAppSelector((state) => state.user)
    const { limit, skip, total, users } = useAppSelector((state) => state.user.user)

    useEffect(() => {
        dispatch(getAllUsers())
    }, [])

    return (
        <div>
            <header style={{
                display: 'flex',
                alignItems: 'center',
                gap: '16px'
            }}>
                <h1>Users Page</h1>
                <Link to={'/'}><button>Home</button></Link>
            </header>
            <div style={{ marginTop: '16px' }}>
                <ul style={{
                    listStyle: 'none',
                    display: 'flex',
                    flexWrap: 'wrap',
                    gap: '16px',
                }}>
                    {
                        users.map((item, index) => <UserCard key={index} {...item} />)
                    }
                </ul>
            </div>
        </div>
    );
};

export default UserPage;