import React, { useContext, useEffect, useState } from 'react';
import Message from '../Message';
import classNames from 'classnames/bind';
import styles from './MessageBody.module.scss';
import { ChatContext } from '../../context/ChatContext';
import { doc, onSnapshot } from 'firebase/firestore';
import { db } from '../../firebase';

const cx = classNames.bind(styles);

const MessageBody = () => {
    const [messages, setMessages] = useState([]);
    const { data } = useContext(ChatContext);
    useEffect(() => {
        const unsub = onSnapshot(doc(db, 'chats', data.chatId), (doc) => {
            doc.exists() && setMessages(doc.data().messages);
        });
        return () => {
            unsub();
        };
    }, [data.chatId]);

    return (
        <div className={cx('message-body')}>
            {messages?.map((message) => (
                <Message message={message} key={message.id} />
            ))}
        </div>
    );
};

export default MessageBody;
