import React from 'react';

import classNames from 'classnames/bind';
import styles from './Sidebar.module.scss';

import Navbar from '../Navbar';
import Search from '../Search';
import ChatList from '../ChatList';

const cx = classNames.bind(styles);

const Sidebar = () => {
    return (
        <div className={cx('sidebar')}>
            <Navbar />
            <Search />
            <ChatList />
        </div>
    );
};

export default Sidebar;
