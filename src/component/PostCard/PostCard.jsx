import React from 'react';
import { NavLink } from 'react-router-dom';

import css from './PostCard.module.css'

import { Card, Tag, Timeline } from 'antd';
import Meta from 'antd/es/card/Meta';
import Avatar from 'antd/es/avatar/avatar';

import { formatDateTime } from '../../utils/date-utils';

function PostCard({post}) {
    return (
        <Card
            title={
                <NavLink to={`post/${post._id}`}>
                    {post.title}
                </NavLink>
            }
            headStyle={{border: '1px solid lightgray', borderRadius: '5px 5px 0 0'}}
            bodyStyle={{border: '1px solid lightgray', borderRadius: '0 0 5px 5px'}}
            bordered={false}
            style={{width: '31.66vw'}}>
            <Meta
                avatar={<Avatar src={post.author.avatar} />}
                title={post.author.email}
            />
            <div className={css.infoSection}>
                {post.text}
            </div>
            <div className={css.infoSection}>
                Теги: {post.tags.map(tag => <Tag key={tag}>{tag}</Tag>)}
            </div>
            <div className={css.infoSection}>
                <Timeline>
                    <Timeline.Item>{formatDateTime(post.created_at)}</Timeline.Item>
                    <Timeline.Item color="green">Отредактировано: {formatDateTime(post.updated_at)}</Timeline.Item>
                </Timeline>
            </div>
        </Card>
    )
}

export default PostCard;
