import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useAppDispatch } from '../../../hooks/useAppDispatch';
import { getSinglePost } from '../../../redux/post/postThunks';
import { useAppSelector } from '../../../hooks/useAppSelector';
import Loading from '../../../components/loading';

const PostItemPage = () => {
    const params = useParams()
    const dispatch = useAppDispatch()
    const { id, userId, title, body, reactions, tags, views } = useAppSelector((state) => state.post.postDetail) || {}

    useEffect(() => {
        dispatch(getSinglePost(String(params.id)))
    }, [])

    if (params.id != id) {
        return <Loading />
    }

    return (
        <div style={{
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
            <h4>Нравятся: {reactions?.likes}</h4>
            <h4>Не нравятся: {reactions?.dislikes}</h4>
            <h4>Теги: {tags?.map(item => ` #${item}`)}</h4>
            <h4>Просмотры: {views}</h4>
        </div>
    );
};

export default PostItemPage;