import React, { useEffect, useMemo, useState } from 'react';
import { AppContext } from './context';
import { getAllPosts } from './service/post-service';
import { getLoggedInUser } from './service/user-service';
import MainPage from './page/MainPage/MainPage';

function App() {
    const pageSize = 6;

    const [loggedInUser, setLoggedInUser] = useState(null);
    const [selectedPageNum, setSelectedPageNum] = useState(1);
    const [allPosts, setAllPosts] = useState([]);

    useEffect(() => {
        getLoggedInUser().then(user => setLoggedInUser(user))
    }, []);

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
            <MainPage
                loggedInUser={loggedInUser}
                postsToDisplay={postsToDisplay}
                totalPostsCount={allPosts.length}
                pageSize={pageSize}
            />
        </AppContext.Provider>
    );
}

export default App;
