import React, { useContext, useState } from 'react';

import { GrAttachment } from 'react-icons/gr';
import { MdSend, MdImage } from 'react-icons/md';

import classNames from 'classnames/bind';
import styles from './Input.module.scss';
import { AuthContext } from '../../context/AuthContext';
import { ChatContext } from '../../context/ChatContext';
import {
    arrayUnion,
    doc,
    serverTimestamp,
    Timestamp,
    updateDoc,
} from 'firebase/firestore';
import { db, storage } from '../../firebase';
import { v4 as uuid } from 'uuid';
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage';
const cx = classNames.bind(styles);

const Input = () => {
    const { currentUser } = useContext(AuthContext);
    const { data } = useContext(ChatContext);
    const [text, setText] = useState('');
    const [img, setImg] = useState(null);

    const handleSend = async (e) => {
        e.preventDefault();
        if (text) {
            if (img) {
                //upload img message
                const storageRef = ref(storage, uuid());
                await uploadBytesResumable(storageRef, img).then(() => {
                    getDownloadURL(storageRef).then(async (downloadURL) => {
                        await updateDoc(doc(db, 'chats', data.chatId), {
                            messages: arrayUnion({
                                id: uuid(),
                                text,
                                senderId: currentUser.uid,
                                date: Timestamp.now(),
                                img: downloadURL,
                            }),
                        });
                    });
                });

                //update last message of chat if send a photo
                await updateDoc(doc(db, 'userChats', currentUser.uid), {
                    [data.chatId + '.lastMessage']: {
                        text: 'sent a photo',
                    },
                    [data.chatId + '.date']: serverTimestamp(),
                    [data.chatId + '.senderId']: currentUser.uid,
                });
                await updateDoc(doc(db, 'userChats', data.user.uid), {
                    [data.chatId + '.lastMessage']: {
                        text: 'sent a photo',
                    },
                    [data.chatId + '.date']: serverTimestamp(),
                    [data.chatId + '.senderId']: currentUser.uid,
                });
            } else {
                //update text
                await updateDoc(doc(db, 'chats', data.chatId), {
                    messages: arrayUnion({
                        id: uuid(),
                        text,
                        senderId: currentUser.uid,
                        date: Timestamp.now(),
                    }),
                });
                //update last message of chat
                await updateDoc(doc(db, 'userChats', currentUser.uid), {
                    [data.chatId + '.lastMessage']: {
                        text,
                    },
                    [data.chatId + '.date']: serverTimestamp(),
                    [data.chatId + '.senderId']: currentUser.uid,
                });
                await updateDoc(doc(db, 'userChats', data.user.uid), {
                    [data.chatId + '.lastMessage']: {
                        text,
                    },
                    [data.chatId + '.date']: serverTimestamp(),
                    [data.chatId + '.senderId']: currentUser.uid,
                });
            }
        }
        setText('');
        setImg(null);
    };
    return (
        <div className={cx('input')}>
            <form onSubmit={handleSend}>
                <input
                    type="text"
                    placeholder="Nhập tin nhắn...."
                    spellCheck={false}
                    className={cx('chatMessage')}
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                />
            </form>
            <div className={cx('send')}>
                <GrAttachment className={cx('attachmentButton')} />
                <input
                    style={{ display: 'none' }}
                    type="file"
                    name="file"
                    id="file"
                    onChange={(e) => setImg(e.target.files[0])}
                />
                <label htmlFor="file" className={cx('imgInput')}>
                    <MdImage />
                </label>
                <MdSend className={cx('send-btn')} onClick={handleSend} />
            </div>
        </div>
    );
};

export default Input;
