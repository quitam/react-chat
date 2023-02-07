import React from 'react';
import classNames from 'classnames/bind';
import styles from './Home.module.scss';

import Sidebar from '../../components/Sidebar';
import Chat from '../../components/Chat';

const cx = classNames.bind(styles);

const Home = () => {
    return (
        <div className={cx('home')}>
            <div className={cx('container')}>
                <Sidebar />
                <Chat />
            </div>
        </div>
    );
};

export default Home;
