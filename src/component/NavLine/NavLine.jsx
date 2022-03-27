import { NavLink, useLocation } from 'react-router-dom';

import css from './NavLine.module.css'

import { Breadcrumb } from 'antd';

function NavLine({currentLocationTitle}) {

    const location = useLocation();

    return (
        <div className={css.navLineBlock}>
            <Breadcrumb separator=">">
                <Breadcrumb.Item>
                    <NavLink to="/">Все постинги</NavLink>
                </Breadcrumb.Item>
                <Breadcrumb.Item>
                    <NavLink to={location?.pathname}>{currentLocationTitle}</NavLink>
                </Breadcrumb.Item>
            </Breadcrumb>
        </div>
    )
}

export default NavLine;
