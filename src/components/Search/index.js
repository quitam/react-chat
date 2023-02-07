import React, { useState, useContext } from 'react';
import {
    collection,
    query,
    where,
    getDocs,
    getDoc,
    setDoc,
    doc,
    updateDoc,
    serverTimestamp,
} from 'firebase/firestore';
import { db } from '../../firebase';
import { AuthContext } from '../../context/AuthContext';

import { FaSearch } from 'react-icons/fa';
import classNames from 'classnames/bind';
import styles from './Search.module.scss';

const cx = classNames.bind(styles);

const Search = () => {
    const { currentUser } = useContext(AuthContext);
    const [username, setUsername] = useState('');
    const [user, setUser] = useState(null);
    const [error, setError] = useState(false);
    const handleSearch = async () => {
        const q = query(
            collection(db, 'users'),
            where('displayName', '==', username),
        );
        try {
            const querySnapshot = await getDocs(q);
            querySnapshot.forEach((doc) => {
                setUser(doc.data());
            });
        } catch (error) {
            console.log(error);
            setError(true);
        }
    };
    const handleKeyDown = (e) => {
        e.code === 'Enter' && handleSearch();
    };
    const handleSelect = async () => {
        //check whether the group (chats in firestore) exitst
        const combinedId =
            currentUser.uid > user.uid
                ? currentUser.uid + user.uid
                : user.uid + currentUser.uid;
        try {
            const res = await getDoc(doc(db, 'chats', combinedId));
            if (!res.exists()) {
                //create collection if not exist
                await setDoc(doc(db, 'chats', combinedId), {
                    messages: [],
                });

                //create user chats
                await updateDoc(doc(db, 'userChats', currentUser.uid), {
                    [combinedId + '.userInfo']: {
                        uid: user.uid,
                        displayName: user.displayName,
                        photoURL: user.photoURL,
                    },
                    [combinedId + '.date']: serverTimestamp(),
                });

                await updateDoc(doc(db, 'userChats', user.uid), {
                    [combinedId + '.userInfo']: {
                        uid: currentUser.uid,
                        displayName: currentUser.displayName,
                        photoURL: currentUser.photoURL,
                    },
                    [combinedId + '.date']: serverTimestamp(),
                });
            }
        } catch (error) {
            console.log(error);
        }
        setUser(null);
        setUsername('');
    };
    return (
        <div className={cx('search')}>
            <div className={cx('formSearch')}>
                <input
                    type="text"
                    placeholder="Tìm kiếm..."
                    value={username}
                    onKeyDown={handleKeyDown}
                    onChange={(e) => setUsername(e.target.value)}
                />
                <FaSearch className={cx('icon')} />
            </div>
            {error && <span>User not found!</span>}
            {user && (
                <div className={cx('userChat')} onClick={handleSelect}>
                    <img src={user.photoURL} alt="" />
                    <div className={cx('userChatInfo')}>
                        <span>{user.displayName}</span>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Search;
