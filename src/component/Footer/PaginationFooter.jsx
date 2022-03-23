import React, { useContext } from 'react';
import css from './Footer.module.css'
import { Pagination } from 'antd';
import { AppContext } from '../../context';
import CopyrightInfo from '../CopyrightInfo/CopyrightInfo';

function PaginationFooter({totalPostsCount, pageSize}) {
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
            <CopyrightInfo/>
        </footer>
    )
}

export default PaginationFooter;
