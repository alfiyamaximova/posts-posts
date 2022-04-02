import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import { Button } from 'antd';

import css from './Content.module.css'

function WrongUrlContent() {

    const location = useLocation();
    const navigate = useNavigate();

    function onBackToMainPageButtonClick(event) {
        navigate('/');
    }

    return (
        <main className={css.postContentBlock}>
            <div className={css.errorSection}>
                <div className={css.errorMessageSection}>
                    <span className={css.error404}>
                        404
                    </span>
                    <span className={css.errorMessage}>
                        страница с адресом <span className={css.errorUrl}>{location?.pathname}</span> не найдена
                    </span>
                </div>
                <div className={css.errorActionButtons}>
                    <Button
                        type='primary'
                        onClick={onBackToMainPageButtonClick}>
                        Вернуться на главную страницу
                    </Button>
                </div>
            </div>
        </main>
    )
}

export default WrongUrlContent;
