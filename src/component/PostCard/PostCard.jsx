import React, { useContext, useEffect, useMemo, useState } from 'react';
import { NavLink } from 'react-router-dom';

import css from './PostCard.module.css'

import { LikeFilled, LikeOutlined } from '@ant-design/icons';
import { Card, message, Tag, Timeline, Tooltip } from 'antd';
import Meta from 'antd/es/card/Meta';
import Avatar from 'antd/es/avatar/avatar';

import { putLike, removeLike } from '../../service/like-service';
import { formatDateTime } from '../../utils/date-utils';
import { isNotEmptyArray } from '../../utils/array-utils';
import { AppContext } from '../../context';

function PostCard({post, allUsers}) {

    const {loggedInUser} = useContext(AppContext);
    const [postToDisplay, setPostToDisplay] = useState(null);
    const [likers, setLikers] = useState([]);
    const [likedByLoggedInUser, setLikedByLoggedInUser] = useState(false);

    // post to display - initial loading
    useEffect(() => {
        setPostToDisplay(post);
    }, [post]);

    // set likers
    useEffect(() => {
        if (!!allUsers && !!postToDisplay && !!postToDisplay.likes) {
            setLikers(
                allUsers.filter(user => !!postToDisplay.likes.find(userId => userId === user._id))
            );
        }
    }, [postToDisplay, allUsers])

    // set liked by logged in user
    useEffect(() => {
        setLikedByLoggedInUser(
            isNotEmptyArray(likers) && !!likers.find(liker => liker._id === loggedInUser._id)
        );
    }, [likers, loggedInUser])

    const haveLikes = useMemo(() => {
        return isNotEmptyArray(likers);
    }, [likers])

    function changeLike(event) {
        if (likedByLoggedInUser) {
            removeLike(postToDisplay._id)
                .then(updatedPost => setPostToDisplay(updatedPost))
                .catch(error =>
                    message.error(`Не удалось снять отметку "нравится" с постинга: ${error.message}`)
                );
        } else {
            putLike(postToDisplay._id)
                .then(updatedPost => setPostToDisplay(updatedPost))
                .catch(error =>
                    message.error(`Не удалось поставить отметку "нравится" постингу: ${error.message}`)
                );
        }
    }

    return (
        <Card
            title={
                <Tooltip placement='bottom' title='Кликните, чтобы перейти к чтению постинга'>
                    <NavLink to={`post/${postToDisplay?._id}`}>
                        {postToDisplay?.title}
                    </NavLink>
                </Tooltip>
            }
            headStyle={{border: '1px solid lightgray', borderRadius: '5px 5px 0 0'}}
            bodyStyle={{border: '1px solid lightgray', borderRadius: '0 0 5px 5px'}}
            bordered={false}
            style={{width: '31.66vw'}}>
            <Meta
                avatar={<Avatar src={postToDisplay?.author?.avatar} />}
                title={postToDisplay?.author?.email}
            />
            <div className={css.infoSection}>
                {postToDisplay?.text}
            </div>
            <div className={css.infoSection}>
                Теги: {postToDisplay?.tags.map(tag => <Tag key={tag}>{tag}</Tag>)}
            </div>
            <div className={css.infoSection}>
                <Timeline>
                    <Timeline.Item>{formatDateTime(postToDisplay?.created_at)}</Timeline.Item>
                    <Timeline.Item color="green">Отредактировано: {formatDateTime(postToDisplay?.updated_at)}</Timeline.Item>
                </Timeline>
            </div>
            <div className={css.infoSection}>
                <Tooltip
                    placement='bottom'
                    title={
                        haveLikes
                            ? <div className={css.likersHint}>
                                Этот постинг нравится:
                                <p/>
                                {
                                    likers.map(liker => <span className={css.likerName} key={liker._id}>{liker.name}</span>)
                                }
                              </div>
                            : 'Будьте первым, кому понравился этот постинг!'
                    }>
                    {
                        likedByLoggedInUser
                            ? <LikeFilled onClick={changeLike} className={css.likesIcon}/>
                            : <LikeOutlined onClick={changeLike} className={css.likesIcon}/>
                    }
                </Tooltip>
            </div>
        </Card>
    )
}

export default PostCard;
