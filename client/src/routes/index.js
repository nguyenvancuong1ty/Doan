import { HeaderOnly } from '~/components/Layout';
import Home from '~/pages/Home';
import Login from '~/pages/Login';
import Upload from '~/pages/Upload';

// Không cần đăng nhập vẫn xem được
const publicRouter = [
    { path: '/', component: Home },
    { path: '/upload', component: Upload, layout: HeaderOnly },
    { path: '/login', component: Login, layout: null },
];

// Đăng nhập mới xem được
const privateRouter = [];

export { publicRouter, privateRouter };
