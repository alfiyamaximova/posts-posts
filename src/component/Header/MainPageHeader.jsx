import React from 'react';

import css from './Header.module.css'

import { Button } from 'antd';

import UserInfo from '../UserInfo/UserInfo';

function onNewPostingClick(event) {
    console.log('Есть контакт');
}

function MainPageHeader({loggedInUser}) {
    return (
        <header className={css.headerBlock}>
            <h1>Блог о разном</h1>
            <div className={css.buttonsAndUserInfoSection}>
                <Button
                    type="primary"
                    onClick={onNewPostingClick}>
                    Написать новый постинг
                </Button>
                <UserInfo user={loggedInUser}/>
            </div>
        </header>
    )
}

export default MainPageHeader;
