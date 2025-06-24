import React, { FormEvent, useEffect, useState } from 'react';
import { useAppDispatch } from '../../../hooks/useAppDispatch';
import { logout } from '../../../redux/auth/authSlice';
import { Link } from 'react-router-dom';
import { refreshTokens } from '../../../redux/auth/authThunks';
import { useAppSelector } from '../../../hooks/useAppSelector';
import { getAllPosts, getPostsByTag, getPostsTagList, searchPost } from '../../../redux/post/postThunks';
import PostCard from '../../../components/PostCard';
import Loading from '../../../components/loading';

const HomePage = () => {
    const { refreshToken } = useAppSelector((state) => state.auth.token)
    const dispatch = useAppDispatch()
    const { posts } = useAppSelector((state) => state.post.post)
    const { loading, error, tags } = useAppSelector((state) => state.post)
    const [searchName, setSearchName] = useState('')
    const [tagName, setTagName] = useState('all')

    const handleForm = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
    }

    useEffect(() => {
        dispatch(searchPost(searchName))
    }, [searchName])

    useEffect(() => {
        if (tagName === 'all') {
            dispatch(getAllPosts())
        } else {
            dispatch(getPostsByTag(tagName))
        }
    }, [tagName])

    useEffect(() => {
        dispatch(getAllPosts())
    }, [])

    return (
        <div>
            <header style={{
                display: 'flex',
                alignItems: 'center',
                gap: '16px'
            }}>
                <h1>Home Page</h1>
                <Link to={'/profile'}><button>Profile</button></Link>
                <button onClick={() => dispatch(logout())}>Log out</button>
                <button onClick={() => dispatch(refreshTokens(refreshToken))}>Refresh Token</button>
                <Link to={'/users'}><button>User</button></Link>
            </header>
            <div style={{ marginTop: '16px' }}>
                <h2>Posts</h2>
                <form onSubmit={handleForm} style={{ display: 'flex', alignItems: 'center', gap: '16px', marginTop: '16px' }}>
                    <input
                        type="text"
                        name='searchName'
                        value={searchName}
                        placeholder='Search posts'
                        onChange={(e) => setSearchName(e.target.value)}
                    />
                    <select onChange={(e) => setTagName(e.target.value)}>
                        <option value="all">all</option>
                        {
                            tags.map((item, index) => <option key={index} value={item}>{item}</option>)
                        }
                    </select>
                </form>
                {
                    posts.length === 0 ?
                        loading && <Loading />
                        :
                        posts.length > 0 ?
                            <ul style={{ listStyle: 'none', width: '70%', margin: '16px auto 0', display: 'flex', flexDirection: 'column', gap: '16px' }}>
                                {
                                    posts.map(item => <PostCard key={item.id} {...item} />)
                                }
                            </ul>
                            :
                            <h1>No posts</h1>
                }
            </div>
        </div>
    );
};

export default HomePage;