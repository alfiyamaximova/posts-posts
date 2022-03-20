import React from 'react';
import css from './PostsList.module.css'
import Post from '../Post/Post';

function PostsList({postsToDisplay}) {
    return (
        <main className={css.postsListBlock}>
            {postsToDisplay.map(post => <Post post={post} key={post._id}/>)}
        </main>
    )
}

export default PostsList;
