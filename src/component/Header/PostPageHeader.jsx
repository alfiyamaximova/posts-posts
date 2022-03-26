import React from 'react';

import css from './Header.module.css'

import UserInfo from '../UserInfo/UserInfo';

function PostPageHeader({loggedInUser}) {
    return (
        <header className={css.headerBlock}>
            <h1>Блог о разном</h1>
            <UserInfo user={loggedInUser}/>
        </header>
    )
}

export default PostPageHeader;
