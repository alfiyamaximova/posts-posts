import React from 'react';
import { Button } from 'antd';
import css from './Header.module.css'

function onNewPostingClick(event) {
    console.log('Есть контакт');
}

function Header() {
    return (
        <header className={css.headerBlock}>
            <h1>Блог о разном</h1>
            <Button
                type="primary"
                onClick={onNewPostingClick}>
                Написать новый постинг
            </Button>
        </header>
    )
}

export default Header;
