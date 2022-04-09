import React, { useContext, useEffect, useMemo, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import css from '../Content.module.css'

import Input from 'antd/es/input/Input';
import TextArea from 'antd/es/input/TextArea';
import { Button, Form, message, Tooltip } from 'antd';

import NavLine from '../../NavLine/NavLine';
import { areEqualIgnoringCase } from '../../../utils/string-utils';
import { createPost, getPostById, updatePost } from '../../../service/post-service';
import { AppContext } from '../../../context';
import Spinner from '../../Spinner/Spinner';
import { someMandatoryFieldIsBlank, sourcePostNotChanged } from './edit-validation';
import { tagsArrayToString, tagsStringToArray } from './edit-utils';

const emptyFormFieldsValues = {
    title: '',
    text: '',
    tags: ''
}

const SOME_MANDATORY_FIELDS_ARE_EMPTY_HINT = 'Заполните все обязательные поля, после этого постинг можно будет сохранить';
const SOURCE_POST_IS_NOT_CHANGED_HINT = 'Измените исходный постинг, после этого его можно будет сохранить';

function PostContentEdit() {

    const {postId} = useParams();

    const [form] = Form.useForm();

    const [post, setPost] = useState({});
    const [isPostLoadingInProgress, setIsPostLoadingInProgress] = useState(false);
    const [canNotSaveReason, setCanNotSaveReason] = useState(SOME_MANDATORY_FIELDS_ARE_EMPTY_HINT);

    const {setPostChanged} = useContext(AppContext);

    const navigate = useNavigate();

    const isNew = useMemo(() => {
        return areEqualIgnoringCase(postId, 'new');
    }, [postId]);

    useEffect(() => {
        if (!!postId && !isNew) {
            setIsPostLoadingInProgress(true);

            getPostById(postId)
                .then(post => {
                    setPost(post);
                    form.setFieldsValue({
                        title: post.title,
                        text: post.text,
                        tags: tagsArrayToString(post.tags)
                    });
                    setCanNotSaveReason(SOURCE_POST_IS_NOT_CHANGED_HINT);
                })
                .catch(error => {
                    setPost({});
                    form.setFieldsValue(emptyFormFieldsValues);
                    setCanNotSaveReason(SOME_MANDATORY_FIELDS_ARE_EMPTY_HINT);

                    message.error(`Не удалось загрузить постинг для редактирования: ${error.message}`);
                })
                .finally(() => setIsPostLoadingInProgress(false));
        }
    // Исключаем emptyFormFieldsValues и form из списка зависимостей
    }, [postId, isNew]); // eslint-disable-line react-hooks/exhaustive-deps

    function onValuesChange(changedValues, allValues) {
        if (someMandatoryFieldIsBlank(allValues)) {
            setCanNotSaveReason(SOME_MANDATORY_FIELDS_ARE_EMPTY_HINT);
            return;
        }

        if (!isNew && sourcePostNotChanged(post, allValues)) {
            setCanNotSaveReason(SOURCE_POST_IS_NOT_CHANGED_HINT);
            return;
        }

        setCanNotSaveReason('');
    }

    function onClickSave(values) {
        if (isNew) {
            createNewPost(values);
        } else {
            updateExistingPost(values);
        }
    }

    function createNewPost(values) {
        const newPost = {
            ...values,
            tags: tagsStringToArray(values.tags)
        }

        createPost(newPost)
            .then(response => {
                setPostChanged({
                    postId: response._id,
                    action: 'CREATED'
                });

                navigate('/');
            })
            .catch(error =>
                message.error(`Не удалось сохранить новый постинг: ${error.message}`)
            );
    }

    function updateExistingPost(values) {
        const updatedPost = {
            ...post,
            ...values,
            tags: tagsStringToArray(values.tags)
        }
        delete updatedPost['updated_at'];

        updatePost(updatedPost)
            .then(response => {
                setPostChanged({
                    postId: response._id,
                    action: 'UPDATED'
                });

                navigate('/');
            })
            .catch(error =>
                message.error(`Не удалось сохранить изменения в постинге: ${error.message}`)
            );
    }

    return (
        <Spinner spinning={isPostLoadingInProgress}>
            <main className={css.postContentBlock}>
                <NavLine currentLocationTitle={isNew ? 'Новый постинг' : 'Редактирование постинга'}/>
                <Form
                    form={form}
                    initialValues={emptyFormFieldsValues}
                    layout={'vertical'}
                    onValuesChange={onValuesChange}
                    onFinish={onClickSave}>
                    <Form.Item
                        name='title'
                        label='Заголовок'
                        rules={[{required: true, message: 'Пожалуйста, задайте заголовок для постинга'}]}>
                        <Input/>
                    </Form.Item>

                    <Form.Item
                        name='text'
                        label='Содержание'
                        rules={[{required: true, message: 'Пожалуйста, напишите содержание постинга'}]}>
                        <TextArea rows={10}/>
                    </Form.Item>

                    <Form.Item
                        name='tags'
                        label='Теги'
                        rules={[{required: true, message: 'Пожалуйста, задайте хотябы один тег для постинга'}]}>
                        <Input/>
                    </Form.Item>

                    <Form.Item>
                        <div className={css.saveButtonSection}>
                            <Tooltip
                                placement='bottom'
                                title={canNotSaveReason}>
                                <Button
                                    type='primary'
                                    htmlType='submit'
                                    disabled={!!canNotSaveReason}>
                                    Сохранить
                                </Button>
                            </Tooltip>
                        </div>
                    </Form.Item>
                </Form>
            </main>
        </Spinner>
    )
}

export default PostContentEdit;
