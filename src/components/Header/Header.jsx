import React, { useEffect, useState } from 'react';
import { Button } from 'antd';
import css from './Header.module.css'
import Avatar from 'antd/es/avatar/avatar';
import Meta from 'antd/es/card/Meta';
import { getCurrentUser } from '../../service/user-service';

function onNewPostingClick(event) {
    console.log('Есть контакт');
}

function Header() {
    const [currentUser, setCurrentUser] = useState(null);

    useEffect(() => {
        getCurrentUser().then(user => setCurrentUser(user))
    }, []);

    return (
        <header className={css.headerBlock}>
            <h1>Блог о разном</h1>
            <div className={css.buttonsAndUserInfoSection}>
                <Button
                    type="primary"
                    onClick={onNewPostingClick}>
                    Написать новый постинг
                </Button>
                <Meta
                    avatar={<Avatar src={currentUser.avatar} />}
                    title={currentUser.name}
                    description={currentUser.email}
                />
            </div>
        </header>
    )
}

export default Header;
