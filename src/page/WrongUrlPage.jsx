import React from 'react';

import css from './page.module.css';

import PostPageHeader from '../component/Header/PostPageHeader';
import PostPageFooter from '../component/Footer/PostPageFooter';
import WrongUrlContent from '../component/Content/WrongUrlContent';

function WrongUrlPage() {
    return (
        <div className={css.commonPage}>
            <PostPageHeader/>
            <WrongUrlContent/>
            <PostPageFooter/>
        </div>
    )
}

export default WrongUrlPage;
