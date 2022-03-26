import React, { useContext } from 'react';

import css from './Footer.module.css'

import { Pagination } from 'antd';

import { AppContext } from '../../context';
import CopyrightInfo from '../CopyrightInfo/CopyrightInfo';

function MainPageFooter({totalPostsCount, pageSize}) {
    const {selectedPageNum, setSelectedPageNum} = useContext(AppContext);

    function onSelectedPageChanged(page, pageSize) {
        setSelectedPageNum(page);
    }

    return (
        <footer className={css.footerBlock}>
            <Pagination
                current={selectedPageNum}
                defaultPageSize={pageSize}
                total={totalPostsCount}
                onChange={onSelectedPageChanged}
            />
            <CopyrightInfo/>
        </footer>
    )
}

export default MainPageFooter;
