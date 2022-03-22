import React, { useEffect, useMemo, useState } from 'react';
import css from './App.module.css'
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import PostsList from './components/PostsList/PostsList';
import { AppContext } from './context';
import { getAllPosts } from './service/post-service';

function App() {
    const pageSize = 6;

    const [selectedPageNum, setSelectedPageNum] = useState(1);
    const [allPosts, setAllPosts] = useState([]);

    useEffect(() => {
        getAllPosts().then(posts => setAllPosts(posts))
    }, [])

    const postsToDisplay = useMemo(() => {
        const start = (selectedPageNum - 1) * pageSize;
        const end = start + pageSize;

        return allPosts.slice(start, end);
    }, [selectedPageNum, allPosts]);

    return (
        <AppContext.Provider value={{ setSelectedPageNum }}>
            <div className={css.appPage}>
                <Header/>
                <PostsList postsToDisplay={postsToDisplay}/>
                <Footer totalPostsCount={allPosts.length} pageSize={pageSize}/>
            </div>
        </AppContext.Provider>
    );
}

export default App;
