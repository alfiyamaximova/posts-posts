import React from 'react';

import css from './page.module.css';

import MainPageHeader from '../component/Header/MainPageHeader';
import PostsList from '../component/PostsList/PostsList';
import MainPageFooter from '../component/Footer/MainPageFooter';
import Spinner from '../component/Spinner/Spinner';

function MainPage({postsToDisplay, totalPostsCount, pageSize, isAllPostsLoadingInProgress}) {
    return (
        <div className={css.commonPage}>
            <MainPageHeader/>
            <Spinner spinning={isAllPostsLoadingInProgress}>
                <PostsList postsToDisplay={postsToDisplay}/>
            </Spinner>
            <MainPageFooter totalPostsCount={totalPostsCount} pageSize={pageSize}/>
        </div>
    )
}

export default MainPage;
