import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import css from './page.module.css';

import PostPageHeader from '../component/Header/PostPageHeader';
import PostPageFooter from '../component/Footer/PostPageFooter';
import PostContentView from '../component/PostContent/PostContentView';
import { getPostById } from '../service/post-service';

function PostPageView({loggedInUser}) {

    const {postId} = useParams();
    const [post, setPost] = useState(null);

    useEffect(() => {
        if (!!postId) {
            getPostById(postId).then(post => setPost(post));
        }
    }, [postId]);

    return (
        <div className={css.commonPage}>
            <PostPageHeader loggedInUser={loggedInUser}/>
            <PostContentView post={post}/>
            <PostPageFooter/>
        </div>
    )
}

export default PostPageView;
