import React, { useEffect, useState } from 'react';
import { GetPostCommentsResponse, Post } from '../redux/post/postTypes';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch } from '../hooks/useAppDispatch';
import { getPostCommentsApi } from '../api/endpoints/postApi';

const PostCard = ({ id, body, reactions, tags, title, userId, views }: Post) => {
    const dispatch = useAppDispatch()
    const navigate = useNavigate()
    const [postComments, setPostComments] = useState<GetPostCommentsResponse | null>(null)
    const [postCommentsToggle, setPostCommentsToggle] = useState(false)

    const fetchPostComments = async () => {
        const data = await getPostCommentsApi(String(id))
        setPostComments(data)
    }

    useEffect(() => {
        fetchPostComments()
    }, [])

    return (
        <li
            onClick={() => navigate(`/post/${id}`)}
            style={{
                border: '1px solid black',
                display: 'flex',
                flexDirection: 'column',
                gap: '8px',
                padding: '16px',
                backgroundColor: 'white',
                borderRadius: '16px',
                cursor: 'pointer'
            }}>
            <h3>{userId}</h3>
            <h4>Title: {title}</h4>
            <h4>Body: {body}</h4>
            <h4>Нравятся: {reactions.likes}</h4>
            <h4>Не нравятся: {reactions.dislikes}</h4>
            <h4>Теги: {tags.map(item => ` #${item}`)}</h4>
            <h4>Просмотры: {views}</h4>
            <h4>Комментарии: {postComments?.total}</h4>
            {
                postComments?.comments.length &&
                <button onClick={(e) => {
                    e.stopPropagation()
                    setPostCommentsToggle(prev => !prev)
                }} style={{ alignSelf: 'start' }}>Посмотреть коментарии</button>
            }
            {
                postCommentsToggle && postComments?.comments.map((item, index) => <li style={{
                    border: '1px solid goldenrod',
                    padding: '8px',
                    borderRadius: '8px'
                }}>
                    <h3
                        style={{
                            display: 'inline-flex',
                            backgroundColor: 'goldenrod',
                            borderRadius: '8px'
                        }}
                        onClick={(e) => {
                            e.stopPropagation()
                            navigate(`/users/${item.user.id}`)
                        }}>User: {item.user.fullName}</h3>
                    <h3>Likes: {item.likes}</h3>
                    <h3>Comment: {item.body}</h3>
                </li>)
            }
        </li>
    );
};

export default PostCard;