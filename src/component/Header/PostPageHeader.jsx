import React, { useContext } from 'react';

import css from './Header.module.css'

import UserInfo from '../UserInfo/UserInfo';
import { AppContext } from '../../context';

function PostPageHeader() {

    const {loggedInUser} = useContext(AppContext);

    return (
        <header className={css.headerBlock}>
            <h1>Блог о разном</h1>
            <UserInfo user={loggedInUser}/>
        </header>
    )
}

export default PostPageHeader;
