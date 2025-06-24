import React, { useEffect } from 'react';
import { Route, Routes, useLocation, useNavigate } from 'react-router-dom';
import HomePage from '../pages/WorkScenes/HomePage/HomePage';
import PreviewPage from '../pages/AuthScenes/PreviewPage/PreviewPage';
import LoginPage from '../pages/AuthScenes/LoginPage/LoginPage';
import RegistrationPage from '../pages/AuthScenes/RegistrationPage/RegistrationPage';
import { useAppSelector } from '../hooks/useAppSelector';
import Loading from '../components/loading';
import ProfilePage from '../pages/WorkScenes/ProfilePage/ProfilePage';
import PostItemPage from '../pages/WorkScenes/PostItemPage/PostItemPage';
import UsersPage from '../pages/WorkScenes/UserPage/UserPage';
import UserDetailPage from '../pages/WorkScenes/UserDetailPage/UserDetailPage';

const AppRoutes = () => {
    const { loading, error, token, currentUser } = useAppSelector((state) => state.auth)
    const navigate = useNavigate()
    const location = useLocation()

    useEffect(() => {
        if (token.accessToken) {
            navigate('/')
        } else {
            navigate('/login')
        }
    }, [token.accessToken])

    useEffect(() => {
        navigate(location.pathname)
    }, [])

    if (loading) {
        return <Loading />
    }

    console.log('Ismail')

    return token.accessToken ? (
        <Routes>
            <Route path='/' element={<HomePage />} />
            <Route path='/profile' element={<ProfilePage />} />
            <Route path='/post/:id' element={<PostItemPage />} />
            <Route path='/users' element={<UsersPage />} />
            <Route path='/users/:id' element={<UserDetailPage />} />
        </Routes>
    ) : (
        <Routes>
            <Route path='/' element={<PreviewPage />} />
            <Route path='/login' element={<LoginPage />} />
            <Route path='/registration' element={<RegistrationPage />} />
        </Routes>
    )
};

export default AppRoutes;