import css from './MainPage.module.css';
import AddNewPostingButtonHeader from '../../component/Header/AddNewPostingButtonHeader';
import PostsList from '../../component/PostsList/PostsList';
import PaginationFooter from '../../component/Footer/PaginationFooter';
import React from 'react';

function MainPage({loggedInUser, postsToDisplay, totalPostsCount, pageSize}) {
    return (
        <div className={css.mainPage}>
            <AddNewPostingButtonHeader loggedInUser={loggedInUser}/>
            <PostsList postsToDisplay={postsToDisplay}/>
            <PaginationFooter totalPostsCount={totalPostsCount} pageSize={pageSize}/>
        </div>
    )
}

export default MainPage;
