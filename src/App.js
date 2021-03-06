import React, { useEffect, useMemo, useState } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import { message } from 'antd';

import { AppContext } from './context';
import { getAllPosts } from './service/post-service';
import { getLoggedInUser } from './service/user-service';
import PostPageView from './page/PostPageView';
import MainPage from './page/MainPage';
import PostPageEdit from './page/PostPageEdit';
import WrongUrlPage from './page/WrongUrlPage';

function App() {
    const pageSize = 6;

    const [loggedInUser, setLoggedInUser] = useState({});
    const [selectedPageNum, setSelectedPageNum] = useState(1);
    const [allPosts, setAllPosts] = useState([]);
    const [postChanged, setPostChanged] = useState({});
    const [isAllPostsLoadingInProgress, setIsAllPostsLoadingInProgress] = useState(false);

    function calcLastPageNum(postsQuantity) {
        return Math.max(1, Math.ceil(postsQuantity / pageSize));
    }

    useEffect(() => {
        getLoggedInUser()
            .then(user => setLoggedInUser(user))
            .catch(error => {
                setLoggedInUser({});

                message.error(`Не удалось определить текущего пользователя: ${error.message}`);
            });
    }, []);

    useEffect(() => {
        setIsAllPostsLoadingInProgress(true);

        getAllPosts()
            .then(posts => {
                setAllPosts(posts);

                if (postChanged?.action === 'CREATED') {
                    setSelectedPageNum(calcLastPageNum(posts.length))
                } else if (postChanged?.action === 'DELETED') {
                    const lastPageNum = calcLastPageNum(posts.length);
                    if (selectedPageNum > lastPageNum) {
                        setSelectedPageNum(lastPageNum);
                    }
                }
            })
            .catch(error => {
                setAllPosts([]);

                message.error(`Не удалось загрузить список постингов: ${error.message}`);
            })
            .finally(() => setIsAllPostsLoadingInProgress(false));
    /* не нужно включать selectedPageNum в зависимости, чтобы не перезагружать список постов при переходе на другую страницу,
    поэтому подавляем проверку полноты массива зависимостей */
    }, [postChanged]) // eslint-disable-line react-hooks/exhaustive-deps

    const postsToDisplay = useMemo(() => {
        const start = (selectedPageNum - 1) * pageSize;
        const end = start + pageSize;

        return allPosts.slice(start, end);
    }, [selectedPageNum, allPosts]);

    return (
        <AppContext.Provider value={{
            loggedInUser,

            postsToDisplay,

            selectedPageNum,
            setSelectedPageNum,

            postChanged,
            setPostChanged,
        }}>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={
                        <MainPage
                            totalPostsCount={allPosts.length}
                            pageSize={pageSize}
                            isAllPostsLoadingInProgress={isAllPostsLoadingInProgress}
                        />
                    }/>
                    <Route path="/post/:postId" element={
                        <PostPageView/>
                    }/>
                    <Route path="/post/:postId/edit" element={
                        <PostPageEdit/>
                    }/>
                    <Route path="*" element={
                        <WrongUrlPage/>
                    }/>
                </Routes>
            </BrowserRouter>
        </AppContext.Provider>
    );
}

export default App;
