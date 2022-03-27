import React, { useEffect, useMemo, useState } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import { AppContext } from './context';
import { getAllPosts } from './service/post-service';
import { getLoggedInUser } from './service/user-service';
import PostPageView from './page/PostPageView';
import MainPage from './page/MainPage';
import PostPageEdit from './page/PostPageEdit';

function App() {
    const pageSize = 6;

    const [loggedInUser, setLoggedInUser] = useState(null);
    const [selectedPageNum, setSelectedPageNum] = useState(1);
    const [allPosts, setAllPosts] = useState([]);
    const [postChanged, setPostChanged] = useState(null);
    const [isAllPostsLoadingInProgress, setIsAllPostsLoadingInProgress] = useState(false);

    function calcLastPageNum(postsQuantity) {
        return Math.max(1, Math.ceil(postsQuantity / pageSize));
    }

    useEffect(() => {
        getLoggedInUser().then(user => setLoggedInUser(user))
    }, []);

    useEffect(() => {
        setIsAllPostsLoadingInProgress(true);

        getAllPosts().then(posts => {
            setAllPosts(posts);
            if (postChanged?.action === 'CREATED') {
                setSelectedPageNum(calcLastPageNum(posts.length))
            }

            setIsAllPostsLoadingInProgress(false);
        })
    }, [postChanged])

    const postsToDisplay = useMemo(() => {
        const start = (selectedPageNum - 1) * pageSize;
        const end = start + pageSize;

        return allPosts.slice(start, end);
    }, [selectedPageNum, allPosts]);

    return (
        <AppContext.Provider value={{
            selectedPageNum,
            setSelectedPageNum,

            postChanged,
            setPostChanged,
        }}>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={
                        <MainPage
                            loggedInUser={loggedInUser}
                            postsToDisplay={postsToDisplay}
                            totalPostsCount={allPosts.length}
                            pageSize={pageSize}
                            isAllPostsLoadingInProgress={isAllPostsLoadingInProgress}
                        />
                    }/>
                    <Route path="/post/:postId" element={
                        <PostPageView loggedInUser={loggedInUser}/>
                    }/>
                    <Route path="/post/:postId/edit" element={
                        <PostPageEdit loggedInUser={loggedInUser}/>
                    }/>
                </Routes>
            </BrowserRouter>
        </AppContext.Provider>
    );
}

export default App;
