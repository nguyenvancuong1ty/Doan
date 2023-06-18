import React, { useState } from 'react';
import classNames from 'classnames/bind';
import styles from './Login.module.scss';
import Button from '~/components/Button';
import images from '~/assets/images';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';import { useDispatch } from 'react-redux';
import { setAvatar } from '~/redux';
const cx = classNames.bind(styles);

function Login() {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [pass, setPass] = useState('');
    const [check, setCheck] = useState(false);
    const dispatch = useDispatch();
    const handleSubmit = () => {
        axios({
            method: 'Post',
            url: 'http://localhost:3000/v1/api/login',
            data: {
                username: email,
                password: pass,
            },
        })
        .then((data) => {
            console.log(data.data);
            dispatch(setAvatar(data.data.data))
            localStorage.setItem('token', data.data.token)
            alert('Login ok... !');
            navigate('/home');
            })
            .catch((error) => {
                alert('invalid username or password');
                console.log(error);
            });
        };
    return (
        <div className={cx('wrapper')}>
            <div className={cx('container')}>
                <h2 className={cx('login-title')}>We will accompany you!</h2>
                <div className={cx('item')}>
                    <div className={cx('item-left')}>
                        <h1 className={cx('item-left__title')}>Group 3</h1>
                        <h4 className={cx('item-left__h4')}>Đăng nhập</h4>
                        <div className={cx('item-left__group')}>
                            <label htmlFor="email">Email/Số điện thoại/Tên đăng nhập:</label>
                            <input
                                type="text"
                                placeholder="..."
                                id="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>
                        <div className={cx('item-left__group')}>
                            <label htmlFor="pass">Mật khẩu:</label>
                            <input
                                type="password"
                                value={pass}
                                onChange={(e) => setPass(e.target.value)}
                                placeholder="..."
                                id="pass"
                            />
                        </div>
                        <div className={cx('item-left__ghinho')}>
                            <input type="checkbox" id="ghinho" checked={check} onChange={() => setCheck(!check)} />
                            <label htmlFor="ghinho">Ghi nhớ tài khoản</label>
                        </div>
                        <Button login onClick={handleSubmit}>
                            Đăng nhập
                        </Button>
                        <p className={cx('item-left__text')}>
                            Anh ngữ chìa khóa thành công - <span>Group 3</span>
                        </p>
                    </div>
                    <div className={cx('item-right')}>
                        <p className={cx('item-right--img')}>
                            <img src={images.loginRight} alt="Welcome" />
                        </p>
                        <div className={cx('item-right--khoi')}>
                            <p className={cx('item-right--khoi__title')}>Welcome</p>
                            <p className={cx('item-right--khoi__text')}>
                                Đồng hành cùng Group 3 - Thành công và vững bước
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Login;

