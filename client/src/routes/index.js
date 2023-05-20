import CapNhatHocVien from '~/pages/CapNhatHocVien';
import CapNhatLop from '~/pages/CapNhatLop';
import CapNhatNhomLop from '~/pages/CapNhatNhomLop';
import CapNhatNhuCauHoc from '~/pages/CapNhatNhuCauHoc';
import DangKyLichHoc from '~/pages/DangKyLichHoc';
import DangKyNhuCauHoc from '~/pages/DangKyNhuCauHoc';
import DiemDanh from '~/pages/DiemDanh';
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
    { path: '/capnhathocvien', component: CapNhatHocVien },
    { path: '/dangkynhucauhoc', component: DangKyNhuCauHoc },
    { path: '/dangkylichhoc', component: DangKyLichHoc },
    { path: '/diemdanh', component: DiemDanh },
];

// Đăng nhập mới xem được
const privateRouter = [];

export { publicRouter, privateRouter };

