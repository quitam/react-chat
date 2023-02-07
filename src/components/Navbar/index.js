import React from 'react';

import classNames from 'classnames/bind';
import styles from './Navbar.module.scss';
import { signOut } from 'firebase/auth';
import { auth } from '../../firebase';
import { useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';
import Tippy from '@tippyjs/react';
const cx = classNames.bind(styles);

const Navbar = () => {
    const { currentUser } = useContext(AuthContext);
    console.log(currentUser);
    return (
        <div className={cx('navbar')}>
            <span className="logo">TamY Chat</span>
            <div className={cx('user')}>
                <img src={currentUser.photoURL} alt="avatar" />
                <span>{currentUser.displayName}</span>
                <Tippy content="Log out this account" placement="bottom">
                    <button
                        onClick={() => signOut(auth)}
                        className={cx('logout-btn')}
                    >
                        logout
                    </button>
                </Tippy>
            </div>
            <div className="border-bottom"></div>
        </div>
    );
};

export default Navbar;
