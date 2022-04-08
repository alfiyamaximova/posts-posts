import React, { useEffect, useState } from 'react';

import css from './PostsList.module.css'

import { message } from 'antd';

import PostCard from '../PostCard/PostCard';
import { getAllUsers } from '../../service/user-service';

function PostsList({postsToDisplay}) {

    const [allUsers, setAllUsers] = useState([]);

    useEffect(() => {
        getAllUsers()
            .then(users => setAllUsers(users))
            .catch(error => {
                setAllUsers([]);

                message.error(`Не удалось загрузить список пользователей: ${error.message}`);
            });
    }, [])

    return (
        <main className={css.postsListBlock}>
            {
                postsToDisplay.map(post =>
                    <PostCard post={post} allUsers={allUsers} key={post._id}/>
                )
            }
        </main>
    )
}

export default PostsList;
