import React, { useContext, useEffect, useMemo, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import css from './Content.module.css'

import { QuestionCircleOutlined } from '@ant-design/icons';
import Avatar from 'antd/es/avatar/avatar';
import Meta from 'antd/es/card/Meta';
import Modal from 'antd/es/modal/Modal';
import { Button, Divider, message, Tag, Timeline } from 'antd';

import { formatDateTime } from '../../utils/date-utils';
import NavLine from '../NavLine/NavLine';
import { AppContext } from '../../context';
import { deletePost, getPostById } from '../../service/post-service';
import Spinner from '../Spinner/Spinner';

function PostContentView() {

    const {postId} = useParams();

    const [post, setPost] = useState({});
    const [isPostLoadingInProgress, setIsPostLoadingInProgress] = useState(false);
    const [isConfirmationDialogVisible, setIsConfirmationDialogVisible] = useState(false);

    const {loggedInUser, setPostChanged} = useContext(AppContext);

    const navigate = useNavigate();

    useEffect(() => {
        if (!!postId) {
            setIsPostLoadingInProgress(true);

            getPostById(postId)
                .then(post => setPost(post))
                .catch(error => {
                    setPost({});

                    message.error(`Не удалось загрузить постинг для просмотра: ${error.message}`);
                })
                .finally(() => setIsPostLoadingInProgress(false));
        }
    }, [postId]);

    const canChangePost = useMemo(() => {
        return !!post && !!post.author && !!loggedInUser && post.author._id === loggedInUser._id;
    }, [post, loggedInUser]);

    function onEditClick(event) {
        navigate(`/post/${post?._id}/edit`);
    }

    function onDeleteClick(event) {
        setIsConfirmationDialogVisible(true);
    }

    function onDeleteConfirmedClick(event) {
        setIsConfirmationDialogVisible(false);

        deletePost(post._id)
            .then(response => {
                setPostChanged({
                    postId: response._id,
                    action: 'DELETED'
                });

                navigate('/');
            })
            .catch(error =>
                message.error(`Не удалось выполнить удаление постинга: ${error.message}`)
            );
    }

    function onDeleteCanceledClick(event) {
        setIsConfirmationDialogVisible(false);
    }

    return (
        <Spinner spinning={isPostLoadingInProgress}>
            <main className={css.postContentBlock}>
                <NavLine currentLocationTitle='Просмотр постинга'/>
                <div className={css.headerAndButtonsSection}>
                    <h2>{post?.title}</h2>
                    {canChangePost && <div className={css.editAndDeleteButtonsSection}>
                        <Button onClick={onEditClick}>Редактировать</Button>
                        <Button onClick={onDeleteClick}>Удалить</Button>
                    </div>}
                </div>
                <Meta
                    avatar={<Avatar src={post?.author?.avatar}/>}
                    title={post?.author?.email}
                />
                <Divider/>
                <Timeline>
                    <Timeline.Item>{formatDateTime(post?.created_at)}</Timeline.Item>
                    <Timeline.Item color="green">Отредактировано: {formatDateTime(post?.updated_at)}</Timeline.Item>
                </Timeline>
                <Divider/>
                {post?.text}
                <Divider/>
                <div>
                    {post?.tags?.map(tag => <Tag key={tag}>{tag}</Tag>)}
                </div>

                <Modal
                    title="Подтверждение"
                    visible={isConfirmationDialogVisible}
                    onOk={onDeleteConfirmedClick}
                    okText='Да, удалить'
                    onCancel={onDeleteCanceledClick}
                    cancelText='Отмена'
                    centered={true}>
                    <div className={css.questionIconAndText}>
                        <QuestionCircleOutlined className={css.questionIcon}/>
                        <span>Вы уверены, что хотите удалить данный постинг?</span>
                    </div>
                </Modal>
            </main>
        </Spinner>
    )
}

export default PostContentView;
