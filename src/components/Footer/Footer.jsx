import React, { useContext } from 'react';
import css from './Footer.module.css'
import { Pagination } from 'antd';
import { AppContext } from '../../context';

function Footer({totalPostsCount, pageSize}) {
    const {setSelectedPageNum} = useContext(AppContext);

    function onSelectedPageChanged(page, pageSize) {
        setSelectedPageNum(page);
    }

    return (
        <footer className={css.footerBlock}>
            <Pagination
                defaultCurrent={1}
                defaultPageSize={pageSize}
                total={totalPostsCount}
                onChange={onSelectedPageChanged}
            />
            <span>(c) 2022 Альфия Максимова</span>
        </footer>
    )
}

export default Footer;
