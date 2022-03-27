import React from 'react';
import { useNavigate } from 'react-router-dom';

import css from './Header.module.css'

import { Button } from 'antd';

import UserInfo from '../UserInfo/UserInfo';

function MainPageHeader({loggedInUser}) {

    const navigate = useNavigate();

    function onNewClick() {
        navigate('/post/new/edit');
    }

    return (
        <header className={css.headerBlock}>
            <h1>Блог о разном</h1>
            <div className={css.buttonsAndUserInfoSection}>
                <Button
                    type="primary"
                    onClick={onNewClick}>
                    Написать новый постинг
                </Button>
                <UserInfo user={loggedInUser}/>
            </div>
        </header>
    )
}

export default MainPageHeader;
