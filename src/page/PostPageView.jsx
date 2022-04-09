import React from 'react';

import css from './page.module.css';

import PostPageHeader from '../component/Header/PostPageHeader';
import PostPageFooter from '../component/Footer/PostPageFooter';
import PostContentView from '../component/Content/PostContentView';

function PostPageView() {

    return (
        <div className={css.commonPage}>
            <PostPageHeader/>
            <PostContentView/>
            <PostPageFooter/>
        </div>
    )
}

export default PostPageView;
