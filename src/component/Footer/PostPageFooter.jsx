import React from 'react';

import css from './Footer.module.css'

import CopyrightInfo from '../CopyrightInfo/CopyrightInfo';

function PostPageFooter() {
   return (
        <footer className={`${css.footerBlock} ${css.postPageFooterBlock}`}>
            <CopyrightInfo/>
        </footer>
    )
}

export default PostPageFooter;
