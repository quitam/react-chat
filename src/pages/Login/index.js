import React, { useState } from 'react';

import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../firebase';
import { useNavigate, Link } from 'react-router-dom';
import classNames from 'classnames/bind';
import styles from './Login.module.scss';
import { toast, ToastContainer } from 'react-toastify';
const cx = classNames.bind(styles);

const Login = () => {
    const navigate = useNavigate();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = async (e) => {
        e.preventDefault();

        try {
            await signInWithEmailAndPassword(auth, email, password);
            navigate('/');
        } catch (error) {
            console.log(error);
            toast.dark('Sai tên tài khoản hoặc mật khẩu');
        }
    };
    return (
        <div className={cx('container')}>
            <ToastContainer autoClose={3000} />
            <div className={cx('wrapper')}>
                <span className="logo" style={{ fontSize: '24px' }}>
                    TamY Chat
                </span>
                <span className={cx('title')}>Đăng nhập</span>
                <form onSubmit={handleLogin}>
                    <input
                        type="email"
                        value={email}
                        placeholder="Email"
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <input
                        type="password"
                        value={password}
                        placeholder="Password"
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <button className={cx('login-btn')} type="submit">
                        Đăng nhập
                    </button>
                </form>
                <p>
                    Nếu bạn chưa có tài khoản?{' '}
                    <Link to="/register">Đăng ký</Link>
                </p>
            </div>
        </div>
    );
};

export default Login;
