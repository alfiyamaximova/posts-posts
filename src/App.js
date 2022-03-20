import React, { useMemo, useState } from 'react';
import css from './App.module.css'
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import PostsList from './components/PostsList/PostsList';
import { postData } from './data/posts';
import { AppContext } from './context';

function App() {
    const pageSize = 6;

    const [selectedPageNum, setSelectedPageNum] = useState(1);

    const postsToDisplay = useMemo(() => {
        const start = (selectedPageNum - 1) * pageSize;
        const end = start + pageSize;

        return postData.slice(start, end);
    }, [selectedPageNum]);

    return (
        <AppContext.Provider value={{ setSelectedPageNum }}>
            <div className={css.appPage}>
                <Header/>
                <PostsList postsToDisplay={postsToDisplay}/>
                <Footer totalPostsCount={postData.length} pageSize={pageSize}/>
            </div>
        </AppContext.Provider>
    );
}

export default App;
