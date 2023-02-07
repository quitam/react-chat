import React, { useContext, useEffect, useRef } from 'react';
import TimeAgo from 'javascript-time-ago';
import en from 'javascript-time-ago/locale/en';
import classNames from 'classnames/bind';
import styles from './Message.module.scss';
import { AuthContext } from '../../context/AuthContext';
import { ChatContext } from '../../context/ChatContext';
import Tippy from '@tippyjs/react';

const cx = classNames.bind(styles);

TimeAgo.addLocale(en);
// Create formatter (English).
const timeAgo = new TimeAgo('en-US');

const Message = ({ message }) => {
    const ref = useRef();
    const { currentUser } = useContext(AuthContext);
    const { data } = useContext(ChatContext);

    useEffect(() => {
        ref.current?.scrollIntoView({ behavior: 'smooth' });
    }, [message]);
    return (
        <div
            ref={ref}
            className={cx(
                'message',
                `${message.senderId === currentUser.uid && 'owner'}`,
            )}
        >
            <div className={cx('messageInfo')}>
                <img
                    src={
                        message.senderId === currentUser.uid
                            ? currentUser.photoURL
                            : data.user.photoURL
                    }
                    alt=""
                />
            </div>
            <Tippy
                content={'Sent ' + timeAgo.format(message.date.seconds * 1000)}
                delay={100}
            >
                <div className={cx('messageContent')}>
                    {message.text && <p>{message.text}</p>}
                    <div className={cx('wrap-img')}>
                        {message.img && <img src={message.img} alt="" />}
                    </div>
                </div>
            </Tippy>
        </div>
    );
};

export default Message;
