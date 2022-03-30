import React, { useEffect, useState } from 'react';

import css from './PostsList.module.css'

import PostCard from '../PostCard/PostCard';
import { getAllUsers } from '../../service/user-service';

function PostsList({postsToDisplay, loggedInUser}) {

    const [allUsers, setAllUsers] = useState([]);

    useEffect(() => {
        getAllUsers().then(users => setAllUsers(users));
    }, [])

    return (
        <main className={css.postsListBlock}>
            {
                postsToDisplay.map(post =>
                    <PostCard post={post} allUsers={allUsers} loggedInUser={loggedInUser} key={post._id}/>
                )
            }
        </main>
    )
}

export default PostsList;
