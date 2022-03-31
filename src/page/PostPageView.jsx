import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import css from './page.module.css';

import PostPageHeader from '../component/Header/PostPageHeader';
import PostPageFooter from '../component/Footer/PostPageFooter';
import PostContentView from '../component/PostContent/PostContentView';
import { getPostById } from '../service/post-service';
import Spinner from '../component/Spinner/Spinner';

function PostPageView() {

    const {postId} = useParams();
    const [post, setPost] = useState(null);

    useEffect(() => {
        if (!!postId) {
            getPostById(postId).then(post => setPost(post));
        }
    }, [postId]);

    return (
        <div className={css.commonPage}>
            <PostPageHeader/>
            <Spinner spinning={!post}>
                <PostContentView post={post}/>
            </Spinner>
            <PostPageFooter/>
        </div>
    )
}

export default PostPageView;
