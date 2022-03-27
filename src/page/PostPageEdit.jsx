import React, { useEffect, useMemo, useState } from 'react';
import { useParams } from 'react-router-dom';

import css from './page.module.css';

import PostPageHeader from '../component/Header/PostPageHeader';
import PostPageFooter from '../component/Footer/PostPageFooter';
import { getPostById } from '../service/post-service';
import PostContentEdit from '../component/PostContent/PostContentEdit';
import { areEqualIgnoringCase } from '../utils/string-utils';
import Spinner from '../component/Spinner/Spinner';


function PostPageEdit({loggedInUser}) {

    const {postId} = useParams();
    const [post, setPost] = useState(null);
    const isNew = useMemo(() => {
        return areEqualIgnoringCase(postId, 'new');
    }, [postId]);

    useEffect(() => {
        if (!!postId && !isNew) {
            getPostById(postId).then(post => setPost(post));
        }
    }, [postId, isNew]);

    return (
        <div className={css.commonPage}>
            <PostPageHeader loggedInUser={loggedInUser}/>
            <Spinner spinning={!isNew && !post}>
                <PostContentEdit post={post}/>
            </Spinner>
            <PostPageFooter/>
        </div>
    )
}

export default PostPageEdit;
