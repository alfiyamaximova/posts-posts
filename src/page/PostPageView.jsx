import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import css from './page.module.css';

import { message } from 'antd';

import PostPageHeader from '../component/Header/PostPageHeader';
import PostPageFooter from '../component/Footer/PostPageFooter';
import PostContentView from '../component/Content/PostContentView';
import { getPostById } from '../service/post-service';
import Spinner from '../component/Spinner/Spinner';

function PostPageView() {

    const {postId} = useParams();
    const [post, setPost] = useState({});
    const [isPostLoadingInProgress, setIsPostLoadingInProgress] = useState(false);

    useEffect(() => {
        if (!!postId) {
            setIsPostLoadingInProgress(true);

            getPostById(postId)
                .then(post => {
                    setPost(post);
                    setIsPostLoadingInProgress(false);
                })
                .catch(error => {
                    setPost({});
                    setIsPostLoadingInProgress(false);

                    message.error(`Не удалось загрузить постинг для просмотра: ${error.message}`);
                });
        }
    }, [postId]);

    return (
        <div className={css.commonPage}>
            <PostPageHeader/>
            <Spinner spinning={isPostLoadingInProgress}>
                <PostContentView post={post}/>
            </Spinner>
            <PostPageFooter/>
        </div>
    )
}

export default PostPageView;
