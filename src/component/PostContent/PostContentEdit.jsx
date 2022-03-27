import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import css from './PostContent.module.css'

import Input from 'antd/es/input/Input';
import TextArea from 'antd/es/input/TextArea';
import { Button, Form, Tooltip } from 'antd';

import NavLine from '../NavLine/NavLine';
import { isNotBlank } from '../../utils/string-utils';
import { createPost } from '../../service/post-service';
import { AppContext } from '../../context';

function PostContentEdit({post}) {

    const [canSave, setCanSave] = useState(false);
    const {setPostChanged} = useContext(AppContext);
    const navigate = useNavigate();

    function onValuesChange(changedValues, allValues) {
        // Все поля формы редактирования постинга обязательны к заполнению
        setCanSave(Object.values(allValues).every(value => isNotBlank(value)));
    }

    function onClickSave(values) {
        const newPost = {
            ...values,
            tags: values.tags.split(' ').map(tag => tag.trim())
        }

        createPost(newPost).then(response => {
            setPostChanged({
                postId: response._id,
                action: 'CREATED'
            });

            navigate('/');
        });
    }

    return (
        <main className={css.postContentBlock}>
            <NavLine currentLocationTitle={!!post ? 'Редактирование постинга' : 'Новый постинг'}/>
            <Form
                layout={'vertical'}
                onValuesChange={onValuesChange}
                onFinish={onClickSave}>
                <Form.Item
                    name='title'
                    label='Заголовок'
                    rules={[{ required: true, message: 'Пожалуйста, задайте заголовок для постинга' }]}>
                    <Input value={post?.title}/>
                </Form.Item>

                <Form.Item
                    name='text'
                    label='Содержание'
                    rules={[{ required: true, message: 'Пожалуйста, напишите содержание постинга' }]}>
                    <TextArea rows={10} value={post?.text}/>
                </Form.Item>

                <Form.Item
                    name='tags'
                    label='Теги'
                    rules={[{ required: true, message: 'Пожалуйста, задайте хотябы один тег для постинга' }]}>
                    <Input value={post?.tags.join(' ')}/>
                </Form.Item>

                <Form.Item>
                    <div className={css.buttonsSection}>
                        <Tooltip
                            placement='bottom'
                            title={
                                canSave
                                    ? ''
                                    : 'Нельзя сохранить постинг пока не заполнены все обязательные поля'
                            }>
                            <Button
                                type='primary'
                                htmlType='submit'
                                disabled={!canSave}>
                                Сохранить
                            </Button>
                        </Tooltip>
                    </div>
                </Form.Item>
            </Form>
        </main>
    )
}

export default PostContentEdit;
