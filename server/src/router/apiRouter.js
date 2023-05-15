const express = require('express');
const router = express.Router();
const {
    apiLogin,
    apiCreateAccount,
    apiUpdateAccount,
    apiGetAccount,
    apiDeleteAccount,
    apiAccountPagination,
} = require('../controllers/AccountController');
const {
    apiGetDiemDanh,
    apiCreateDiemDanh,
    apiUpdateDiemDanh,
    apiDeleteDiemDanh,
    apiDiemDanhPagination,
} = require('../controllers/DiemDanhController');
const {
    apiGetNhuCauHoc,
    apiCreateNhuCauHoc,
    apiUpdateNhuCauHoc,
    apiDeleteNhuCauHoc,
    apiNhuCauHocPagination,
} = require('../controllers/NhuCauHocController');
const {
    apiGetDangKyNhuCau,
    apiCreateDangKyNhuCau,
    apiUpdateDangKyNhuCau,
    apiDeleteDangKyNhuCau,
} = require('../controllers/DangKiNhuCauController');
const {
    apiGetBangDiem,
    apiCreateBangDiem,
    apiUpdateBangDiem,
    apiDeleteBangDiem,
    apiBangDiemPagination,
} = require('../controllers/BangDiemController');
const { apiUploadAvatar } = require('../controllers/UpLoadAvatarController');
const {
    apiGetStudent,
    apiCreateStudent,
    apiUpdateStudent,
    apiDeleteStudent,
    apiStudentPagination,
} = require('../controllers/StudentController');
const {
    apiGetTeacher,
    apiCreateTeacher,
    apiUpdateTeacher,
    apiDeleteTeacher,
} = require('../controllers/TeacherController');
const {
    apiGetCourse,
    apiCreateCourse,
    apiUpdateCourse,
    apiDeleteCourse,
    apiCoursePagination,
} = require('../controllers/CourseController');
const { apiGetLop, apiCreateLop, apiUpdateLop, apiDeleteLop, apiLopPagination, apiGetLopByName } = require('../controllers/LopController');
const { apiGetNhomLop, apiCreateNhomLop, apiUpdateNhomLop, apiDeleteNhomLop, apiNhomLopPagination } = require('../controllers/NhomLopController');

// account
router.get('/users', apiGetAccount);
router.post('/users', apiCreateAccount);
router.post('/login', apiLogin);
router.delete('/users', apiDeleteAccount);
router.put('/users/:id', apiUpdateAccount);
router.post('/users/upload/:id', apiUploadAvatar);
router.get('/users/pagination', apiAccountPagination);
// //end

// // DiemDanh
router.get('/attendance', apiGetDiemDanh);
router.post('/attendance', apiCreateDiemDanh);
router.put('/attendance/:id', apiUpdateDiemDanh);
router.delete('/attendance/:id', apiDeleteDiemDanh);
router.get('/attendance/pagination', apiDiemDanhPagination);
// end

// // Course
router.get('/course', apiGetCourse);
router.post('/course', apiCreateCourse);
router.put('/course/:id', apiUpdateCourse);
router.delete('/course/:id', apiDeleteCourse);
router.get('/course/pagination', apiCoursePagination);

// end

//nhucauhoc
router.get('/nhucauhoc', apiGetNhuCauHoc);
router.post('/nhucauhoc', apiCreateNhuCauHoc);
router.put('/nhucauhoc/:id', apiUpdateNhuCauHoc);
router.delete('/nhucauhoc/:id', apiDeleteNhuCauHoc);
router.get('/nhucauhoc/pagination', apiNhuCauHocPagination);
// end

//dknhucau
router.get('/dknhucau', apiGetDangKyNhuCau);
router.post('/dknhucau', apiCreateDangKyNhuCau);
router.put('/dknhucau/:id', apiUpdateDangKyNhuCau);
router.delete('/dknhucau/:id', apiDeleteDangKyNhuCau);
// end

//BangDiem
router.get('/bangdiem', apiGetBangDiem);
router.post('/bangdiem', apiCreateBangDiem);
router.put('/bangdiem/:id', apiUpdateBangDiem);
router.delete('/bangdiem/:id', apiDeleteBangDiem);
router.get('/bangdiem/pagination', apiBangDiemPagination);
// end

//Lop
router.get('/lop', apiGetLop);
router.post('/lop', apiCreateLop);
router.put('/lop/:id', apiUpdateLop);
router.delete('/lop/:id', apiDeleteLop);
router.get('/lop/pagination', apiLopPagination);
router.get('/lop/search', apiGetLopByName);
// end

//Nhomlop
router.get('/nhomlop', apiGetNhomLop);
router.post('/nhomlop', apiCreateNhomLop);
router.put('/nhomlop/:id', apiUpdateNhomLop);
router.delete('/nhomlop/:id', apiDeleteNhomLop);
router.get('/nhomlop/pagination', apiNhomLopPagination);
// end

//Student
router.get('/student', apiGetStudent);
router.post('/student', apiCreateStudent);
router.put('/student/:id', apiUpdateStudent);
router.delete('/student/:id', apiDeleteStudent);
router.get('/student/pagination', apiStudentPagination);

// end

//Teacher
router.get('/teacher', apiGetTeacher);
router.post('/teacher', apiCreateTeacher);
router.put('/teacher/:id', apiUpdateTeacher);
router.delete('/teacher/:id', apiDeleteTeacher);
router.get('/teacher/pagination', apiStudentPagination);
// end
module.exports = router;
