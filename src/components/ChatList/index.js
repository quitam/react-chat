import React, { useState, useEffect, useContext } from 'react';
import { doc, onSnapshot } from 'firebase/firestore';
import classNames from 'classnames/bind';
import styles from './ChatList.module.scss';
import { db } from '../../firebase';
import { AuthContext } from '../../context/AuthContext';
import { ChatContext } from '../../context/ChatContext';

const cx = classNames.bind(styles);

const ChatList = () => {
    const { currentUser } = useContext(AuthContext);
    const { dispatch } = useContext(ChatContext);
    const [chatList, setChatList] = useState([]);

    useEffect(() => {
        const getChatList = () => {
            const unsub = onSnapshot(
                doc(db, 'userChats', currentUser.uid),
                (doc) => {
                    setChatList(doc.data());
                },
            );
            return () => {
                unsub();
            };
        };
        currentUser.uid && getChatList();
    }, [currentUser.uid]);

    const handleSelect = (user) => {
        dispatch({ type: 'CHANGE_USER', payload: user });
    };
    return (
        <div className={cx('chat-list')}>
            {chatList &&
                Object.entries(chatList)
                    ?.sort((a, b) => b[1].date - a[1].date)
                    .map((chat) => (
                        <div
                            className={cx('userChat')}
                            key={chat[0]}
                            onClick={() => handleSelect(chat[1].userInfo)}
                        >
                            <img src={chat[1].userInfo.photoURL} alt="" />
                            <div className={cx('userChatInfo')}>
                                <span>{chat[1].userInfo.displayName}</span>
                                {chat[1].lastMessage && (
                                    <p>
                                        {currentUser.uid === chat[1].senderId
                                            ? 'You'
                                            : `${chat[1].userInfo.displayName}`}
                                        {': '}
                                        {chat[1].lastMessage?.text}
                                    </p>
                                )}
                            </div>
                        </div>
                    ))}
        </div>
    );
};

export default ChatList;
