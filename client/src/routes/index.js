import CapNhatLop from '~/pages/CapNhatLop';
import CapNhatNhomLop from '~/pages/CapNhatNhomLop';
import CapNhatNhuCauHoc from '~/pages/CapNhatNhuCauHoc';
import Home from '~/pages/Home';
import Login from '~/pages/Login';
import Upload from '~/pages/Upload';

// Không cần đăng nhập vẫn xem được
const publicRouter = [
    { path: '/', component: Home },
    { path: '/upload', component: Upload },
    { path: '/login', component: Login, layout: null },
    { path: '/capnhatlop', component: CapNhatLop },
    { path: '/capnhatnhomlop', component: CapNhatNhomLop },
    { path: '/capnhatnhucauhoc', component: CapNhatNhuCauHoc },
];

// Đăng nhập mới xem được
const privateRouter = [];

export { publicRouter, privateRouter };

