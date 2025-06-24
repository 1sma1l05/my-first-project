import React, { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useAppDispatch } from '../../../hooks/useAppDispatch';
import { getSingleUser } from '../../../redux/user/userThunks';
import { useAppSelector } from '../../../hooks/useAppSelector';
import { removeUserDetail } from '../../../redux/user/userSlice';
import Loading from '../../../components/loading';

const UserDetailPage = () => {
    const dispatch = useAppDispatch()
    const { loading, error, userDetail } = useAppSelector((state) => state.user)
    const { id } = useParams()

    useEffect(() => {
        window.scrollTo({ top: 0 })
        dispatch(getSingleUser(String(id)))

        return () => {
            dispatch(removeUserDetail())
        }
    }, [])

    if (loading) {
        return <Loading />
    }

    return (
        <div>
            <header style={{
                display: 'flex',
                alignItems: 'center',
                gap: '16px'
            }}>
                <h1>User Detail Page</h1>
                <Link to={'/users'}><button>Users</button></Link>
            </header>
            <div style={{ display: 'flex', alignItems: 'start', gap: '16px', marginTop: '16px' }}>
                <img style={{ width: '240px', backgroundColor: 'white' }} src={userDetail?.image} alt={userDetail?.firstName} />
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    <h2>Имя: {userDetail?.firstName}</h2>
                    <h2>Фамилия: {userDetail?.lastName}</h2>
                    <h2>Возраст: {userDetail?.age}</h2>
                    <h2>Рост: {userDetail?.height}</h2>
                    <h2>Вес: {userDetail?.weight}</h2>
                    <h2>Email: {userDetail?.email}</h2>
                    <h2>Телефон: {userDetail?.phone}</h2>
                    <h2>Логин: {userDetail?.username}</h2>
                    <h2>Пароль: {userDetail?.password}</h2>
                    <h2></h2>
                </div>
            </div>
        </div>
    );
};

export default UserDetailPage;