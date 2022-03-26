import { NavLink } from 'react-router-dom';

import css from './NavLine.module.css'

import { Breadcrumb } from 'antd';

function NavLine({title, postId}) {
    return (
        <div className={css.navLineBlock}>
            <Breadcrumb separator=">">
                <Breadcrumb.Item>
                    <NavLink to="/">Все постинги</NavLink>
                </Breadcrumb.Item>
                <Breadcrumb.Item>
                    <NavLink to={`/post/${postId}`}>Выбранный постинг: {title}</NavLink>
                </Breadcrumb.Item>
            </Breadcrumb>
        </div>
    )
}

export default NavLine;
