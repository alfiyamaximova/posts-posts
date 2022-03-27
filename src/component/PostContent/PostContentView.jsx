import React from 'react';

import css from './PostContent.module.css'

import Avatar from 'antd/es/avatar/avatar';
import Meta from 'antd/es/card/Meta';
import { Divider, Tag, Timeline } from 'antd';

import { formatDateTime } from '../../utils/date-utils';
import NavLine from '../NavLine/NavLine';

function PostContentView({post}) {

    // Раскомментировать, если будет API для редактирования постинга

    // const navigate = useNavigate();
    //
    // function onEditClick() {
    //     navigate(`/post/${post?._id}/edit`);
    // }

    return (
        <main className={css.postContentBlock}>
            <NavLine currentLocationTitle='Просмотр постинга'/>
            <div className={css.headerAndEditButtonSection}>
                <h2>{post?.title}</h2>
                {/*Раскомментировать, если будет API для редактирования постинга*/}
                {/*<Button onClick={onEditClick}>Редактировать</Button>*/}
            </div>
            <Meta
                avatar={<Avatar src={post?.author?.avatar} />}
                title={post?.author?.email}
            />
            <Divider />
            <Timeline>
                <Timeline.Item>{formatDateTime(post?.created_at)}</Timeline.Item>
                <Timeline.Item color="green">Отредактировано: {formatDateTime(post?.updated_at)}</Timeline.Item>
            </Timeline>
            <Divider />
                {post?.text}
            <Divider />
            <div>
                {post?.tags?.map(tag => <Tag key={tag}>{tag}</Tag>)}
            </div>
        </main>
    )
}

export default PostContentView;
