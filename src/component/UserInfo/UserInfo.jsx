import Meta from 'antd/es/card/Meta';
import Avatar from 'antd/es/avatar/avatar';
import React from 'react';

function UserInfo({user}) {

    return (
        <Meta
            avatar={<Avatar src={user?.avatar}/>}
            title={user?.name}
            description={user?.email}
        />
    )
}

export default UserInfo;
