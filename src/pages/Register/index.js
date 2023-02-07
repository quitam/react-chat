import React, { useState } from 'react';

import { useNavigate, Link } from 'react-router-dom';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import { doc, setDoc } from 'firebase/firestore';
import { auth, storage, db } from '../../firebase';
import { toast, ToastContainer } from 'react-toastify';
import classNames from 'classnames/bind';
import styles from './Register.module.scss';
import AddImg from '../../img/addImg.png';

const cx = classNames.bind(styles);

const Register = () => {
    const navigate = useNavigate();
    const [displayName, setDisplayName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [avatar, setAvatar] = useState();
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            //tạo tài khoản
            const res = await createUserWithEmailAndPassword(
                auth,
                email,
                password,
            );

            const storageRef = ref(storage, displayName);

            await uploadBytesResumable(storageRef, avatar).then(() => {
                getDownloadURL(storageRef).then(async (downloadURL) => {
                    try {
                        //update ảnh
                        await updateProfile(res.user, {
                            displayName,
                            photoURL: downloadURL,
                        });
                        //tạo user trên firestore
                        await setDoc(doc(db, 'users', res.user.uid), {
                            uid: res.user.uid,
                            displayName,
                            email,
                            photoURL: downloadURL,
                        });
                        //tạo user chats trên firestore
                        await setDoc(doc(db, 'userChats', res.user.uid), {});

                        navigate('/login');
                    } catch (error) {
                        console.log(error);
                        toast.dark('Tạo tài khoản thất bại');
                    }
                });
            });
        } catch (error) {
            console.log(error);
            toast.dark('Tạo tài khoản thất bại');
        }
    };
    const handleUpload = (e) => {
        const file = e.target.files[0];
        setAvatar(file);
    };

    return (
        <div className={cx('container')}>
            <ToastContainer autoClose={3000} />
            <div className={cx('wrapper')}>
                <span className="logo" style={{ fontSize: '24px' }}>
                    TamY Chat
                </span>
                <span className={cx('title')}>Đăng ký tài khoản</span>
                <form onSubmit={handleSubmit}>
                    <input
                        type="text"
                        placeholder="Display Name"
                        value={displayName}
                        onChange={(e) => setDisplayName(e.target.value)}
                    />
                    <input
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <input
                        style={{ display: 'none' }}
                        type="file"
                        id="file"
                        onChange={handleUpload}
                    />
                    <label htmlFor="file">
                        <img src={AddImg} alt="img" />
                        {avatar ? (
                            <span>{avatar.name}</span>
                        ) : (
                            <span>Thêm avatar</span>
                        )}
                    </label>
                    <button className={cx('signup-btn')} type="submit">
                        Đăng ký
                    </button>
                </form>
                <p>
                    Nếu bạn đã có tài khoản? <Link to="/login">Đăng nhập</Link>
                </p>
            </div>
        </div>
    );
};

export default Register;
