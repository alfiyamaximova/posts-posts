import React from 'react';

import css from './page.module.css';

import PostPageHeader from '../component/Header/PostPageHeader';
import PostPageFooter from '../component/Footer/PostPageFooter';
import PostContentEdit from '../component/Content/Edit/PostContentEdit';


function PostPageEdit() {
    return (
        <div className={css.commonPage}>
            <PostPageHeader/>
            <PostContentEdit/>
            <PostPageFooter/>
        </div>
    )
}

export default PostPageEdit;
