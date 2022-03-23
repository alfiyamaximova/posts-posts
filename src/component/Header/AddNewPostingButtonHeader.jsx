import React from 'react';
import { Button } from 'antd';
import css from './Header.module.css'
import UserInfo from '../UserInfo/UserInfo';

function onNewPostingClick(event) {
    console.log('Есть контакт');
}

function AddNewPostingButtonHeader({loggedInUser}) {
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

export default AddNewPostingButtonHeader;
