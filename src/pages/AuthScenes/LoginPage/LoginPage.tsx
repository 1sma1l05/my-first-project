import React, { ChangeEvent, FormEvent, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { LoginRequest } from '../../../types/authTypes';
import { useAppDispatch } from '../../../hooks/useAppDispatch';
import { login } from '../../../redux/auth/authThunks';
import { LocalStorage } from '../../../localStorage/localStorage';

const LoginPage = () => {
    const dispatch = useAppDispatch()
    const [loginRequestData, setLoginRequestData] = useState<LoginRequest>({
        username: '',
        password: ''
    })

    const getloginRequestData = (e: ChangeEvent<HTMLInputElement>) => {
        setLoginRequestData({ ...loginRequestData, [e.target.name]: e.target.value })
    }

    const handleForm = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        if (loginRequestData.username.trim() !== '' && loginRequestData.password.trim() !== '') {
            dispatch(login(loginRequestData))
        }
    }

    useEffect(() => {
        setLoginRequestData(LocalStorage.loginRequestData.getLoginRequestData())
    }, [])

    useEffect(() => {
        LocalStorage.loginRequestData.setLoginRequestData(loginRequestData)
    }, [loginRequestData])

    return (
        <div>
            <header style={{
                display: 'flex',
                alignItems: 'center',
                gap: '16px'
            }}>
                <h1>Login Page</h1>
                <Link to={'/'}><button>Preview</button></Link>
            </header>
            <div style={{
                marginTop: '16px'
            }}>
                <form
                    onSubmit={handleForm}
                    style={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'start',
                        gap: '16px'
                    }}
                >
                    <input
                        type='text'
                        name='username'
                        value={loginRequestData.username}
                        onChange={(e) => getloginRequestData(e)}
                        placeholder='Username'
                    />
                    <input
                        type='text'
                        name='password'
                        value={loginRequestData.password}
                        onChange={(e) => getloginRequestData(e)}
                        placeholder='Password'
                    />
                    <div style={{
                        display: 'flex',
                        gap: '16px'
                    }}>
                        <button>Log in</button>
                        <Link to={'/registration'}><button>Sign in</button></Link>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default LoginPage;