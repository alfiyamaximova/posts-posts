import React from 'react';

import css from './page.module.css';

import MainPageHeader from '../component/Header/MainPageHeader';
import PostsList from '../component/PostsList/PostsList';
import MainPageFooter from '../component/Footer/MainPageFooter';

function MainPage({loggedInUser, postsToDisplay, totalPostsCount, pageSize}) {
    return (
        <div className={css.commonPage}>
            <MainPageHeader loggedInUser={loggedInUser}/>
            <PostsList postsToDisplay={postsToDisplay}/>
            <MainPageFooter totalPostsCount={totalPostsCount} pageSize={pageSize}/>
        </div>
    )
}

export default MainPage;
