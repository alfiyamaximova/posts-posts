import React from 'react';

import css from './PostsList.module.css'

import PostCard from '../PostCard/PostCard';

function PostsList({postsToDisplay}) {
    return (
        <main className={css.postsListBlock}>
            {postsToDisplay.map(post => <PostCard post={post} key={post._id}/>)}
        </main>
    )
}

export default PostsList;
