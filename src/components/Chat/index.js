import React, { useContext } from 'react';
import { FaVideo, FaUserPlus } from 'react-icons/fa';
import { TfiMoreAlt } from 'react-icons/tfi';
import MessageBody from '../MessageBody';
import Input from '../Input';

import classNames from 'classnames/bind';
import styles from './Chat.module.scss';
import { ChatContext } from '../../context/ChatContext';

const cx = classNames.bind(styles);

const Chat = () => {
    const { data } = useContext(ChatContext);
    return (
        <div className={cx('chat')}>
            <div className={cx('chatInfo')}>
                <span>{data.user?.displayName}</span>
                <div className={cx('chatIcons')}>
                    <FaVideo className={cx('icon')} />
                    <FaUserPlus className={cx('icon')} />
                    <TfiMoreAlt className={cx('icon')} />
                </div>
                <div className="border-bottom"></div>
            </div>
            <MessageBody />
            <Input />
        </div>
    );
};

export default Chat;
