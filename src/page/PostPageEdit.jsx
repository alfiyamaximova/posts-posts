import React, { useEffect, useMemo, useState } from 'react';
import { useParams } from 'react-router-dom';

import css from './page.module.css';

import { message } from 'antd';

import PostPageHeader from '../component/Header/PostPageHeader';
import PostPageFooter from '../component/Footer/PostPageFooter';
import { getPostById } from '../service/post-service';
import PostContentEdit from '../component/Content/PostContentEdit';
import { areEqualIgnoringCase } from '../utils/string-utils';
import Spinner from '../component/Spinner/Spinner';


function PostPageEdit() {

    const {postId} = useParams();
    const [post, setPost] = useState({});
    const [isPostLoadingInProgress, setIsPostLoadingInProgress] = useState(false);

    const isNew = useMemo(() => {
        return areEqualIgnoringCase(postId, 'new');
    }, [postId]);

    useEffect(() => {
        if (!!postId && !isNew) {
            setIsPostLoadingInProgress(true);

            getPostById(postId)
                .then(post => {
                    setPost(post);
                    setIsPostLoadingInProgress(false);
                })
                .catch(error => {
                    setPost({});
                    setIsPostLoadingInProgress(false);

                    message.error(`Не удалось загрузить постинг для редактирования: ${error.message}`);
                });
        }
    }, [postId, isNew]);

    return (
        <div className={css.commonPage}>
            <PostPageHeader/>
            <Spinner spinning={isPostLoadingInProgress}>
                <PostContentEdit post={post}/>
            </Spinner>
            <PostPageFooter/>
        </div>
    )
}

export default PostPageEdit;
