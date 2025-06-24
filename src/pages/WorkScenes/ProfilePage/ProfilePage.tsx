import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAppSelector } from '../../../hooks/useAppSelector';
import { useAppDispatch } from '../../../hooks/useAppDispatch';
import { getCurrentUser } from '../../../redux/auth/authThunks';

const ProfilePage = () => {
    const dispatch = useAppDispatch()
    const { currentUser } = useAppSelector((state) => state.auth)

    useEffect(() => {
        if (currentUser === null) {
            dispatch(getCurrentUser())
        }
    }, [dispatch])

    return (
        <div>
            <header style={{
                display: 'flex',
                alignItems: 'center',
                gap: '16px'
            }}>
                <h1>Profile Page</h1>
                <Link to={'/'}><button>Home</button></Link>
            </header>
            <div style={{ display: 'flex', alignItems: 'start', gap: '16px', marginTop: '16px' }}>
                <img style={{ width: '240px', backgroundColor: 'white' }} src={currentUser?.image} alt={currentUser?.firstName} />
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    <h2>Имя: {currentUser?.firstName}</h2>
                    <h2>Фамилия: {currentUser?.lastName}</h2>
                    <h2>Возраст: {currentUser?.age}</h2>
                    <h2>Рост: {currentUser?.height}</h2>
                    <h2>Вес: {currentUser?.weight}</h2>
                    <h2>Email: {currentUser?.email}</h2>
                    <h2>Телефон: {currentUser?.phone}</h2>
                    <h2>Логин: {currentUser?.username}</h2>
                    <h2>Пароль: {currentUser?.password}</h2>
                    <h2></h2>
                </div>
            </div>
        </div>
    );
};

export default ProfilePage;