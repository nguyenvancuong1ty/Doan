const express = require('express');
const router = express.Router();
const {
    apiLogin,
    apiCreateAccount,
    apiUpdateAccount,
    apiGetAccount,
    apiDeleteAccount,
    apiAccountPagination,
    apiGetAccountByName,
} = require('../controllers/AccountController');
const {
    apiGetDiemDanh,
    apiCreateDiemDanh,
    apiUpdateDiemDanh,
    apiDeleteDiemDanh,
    apiDiemDanhPagination,
    apiGetDiemDanhById,
    apiGetDiemDanhByName,
} = require('../controllers/DiemDanhController');
const {
    apiGetNhuCauHoc,
    apiCreateNhuCauHoc,
    apiUpdateNhuCauHoc,
    apiDeleteNhuCauHoc,
    apiNhuCauHocPagination,
    apiGetNhuCauHocByName,
    apiGetNhuCauHocById,
} = require('../controllers/NhuCauHocController');
const {
    apiGetDangKyNhuCau,
    apiCreateDangKyNhuCau,
    apiUpdateDangKyNhuCau,
    apiDeleteDangKyNhuCau,
    apiGetDangKyNhuCauByName,
    apiGetDangKyNhuCauById,
} = require('../controllers/DangKiNhuCauController');
const {
    apiGetBangDiem,
    apiCreateBangDiem,
    apiUpdateBangDiem,
    apiDeleteBangDiem,
    apiBangDiemPagination,
    apiGetBangDiemByName,
    apiGetBangDiemById,
} = require('../controllers/BangDiemController');
const { apiUploadAvatar } = require('../controllers/UpLoadAvatarController');
const {
    apiGetStudent,
    apiCreateStudent,
    apiUpdateStudent,
    apiDeleteStudent,
    apiStudentPagination,
    apiGetStudentByName,
    apiGetStudentById,
} = require('../controllers/StudentController');
const {
    apiGetTeacher,
    apiCreateTeacher,
    apiUpdateTeacher,
    apiDeleteTeacher,
    apiGetTeacherByName,
    apiGetTeacherById,
} = require('../controllers/TeacherController');
const {
    apiGetCourse,
    apiCreateCourse,
    apiUpdateCourse,
    apiDeleteCourse,
    apiCoursePagination,
    apiGetCourseByName,
    apiGetCourseById,
} = require('../controllers/CourseController');
const {
    apiGetLop,
    apiCreateLop,
    apiUpdateLop,
    apiDeleteLop,
    apiLopPagination,
    apiGetLopByName,
    apiGetLopById,
} = require('../controllers/LopController');
const {
    apiGetNhomLop,
    apiCreateNhomLop,
    apiUpdateNhomLop,
    apiDeleteNhomLop,
    apiNhomLopPagination,
    apiGetNhomLopByName,
    apiGetNhomLopById,
} = require('../controllers/NhomLopController');

// account
router.get('/users', apiGetAccount);
router.post('/users', apiCreateAccount);
router.post('/login', apiLogin);
router.patch('/users/:id', apiDeleteAccount);
router.put('/users/:id', apiUpdateAccount);
router.post('/users/upload/:id', apiUploadAvatar);
router.get('/users/pagination', apiAccountPagination);
router.get('/users/search', apiGetAccountByName);
// //end

// // DiemDanh
router.get('/attendance/search', apiGetDiemDanhByName);
router.get('/attendance', apiGetDiemDanh);
router.get('/attendance/:id', apiGetDiemDanhById);
router.post('/attendance', apiCreateDiemDanh);
router.put('/attendance/:id', apiUpdateDiemDanh);
router.patch('/attendance/:id', apiDeleteDiemDanh);
router.get('/attendance/pagination', apiDiemDanhPagination);
// end

// // Course
router.get('/course', apiGetCourse);
router.post('/course', apiCreateCourse);
router.put('/course/:id', apiUpdateCourse);
router.get('/course/search', apiGetCourseByName);
router.get('/course/:id', apiGetCourseById);
router.patch('/course/:id', apiDeleteCourse);
router.get('/course/pagination', apiCoursePagination);

// end

//nhucauhoc
router.get('/nhucauhoc', apiGetNhuCauHoc);
router.post('/nhucauhoc', apiCreateNhuCauHoc);
router.put('/nhucauhoc/:id', apiUpdateNhuCauHoc);
router.patch('/nhucauhoc/:id', apiDeleteNhuCauHoc);
router.get('/nhucauhoc/pagination', apiNhuCauHocPagination);
router.get('/nhucauhoc/search', apiGetNhuCauHocByName);
router.get('/nhucauhoc/:id', apiGetNhuCauHocById);
// end

//dknhucau
router.get('/dknhucau', apiGetDangKyNhuCau);
router.post('/dknhucau', apiCreateDangKyNhuCau);
router.put('/dknhucau/:id', apiUpdateDangKyNhuCau);
router.patch('/dknhucau/:id', apiDeleteDangKyNhuCau);
router.get('/dknhucau/search', apiGetDangKyNhuCauByName);
router.get('/dknhucau/:id', apiGetDangKyNhuCauById);
// end

//BangDiem
router.get('/bangdiem/search', apiGetBangDiemByName);
router.get('/bangdiem/:id', apiGetBangDiemById);
router.get('/bangdiem', apiGetBangDiem);
router.post('/bangdiem', apiCreateBangDiem);
router.put('/bangdiem/:id', apiUpdateBangDiem);
router.patch('/bangdiem/:id', apiDeleteBangDiem);
router.get('/bangdiem/pagination', apiBangDiemPagination);
// end

//Lop
router.get('/lop', apiGetLop);
router.post('/lop', apiCreateLop);
router.put('/lop/:id', apiUpdateLop);
router.patch('/lop/:id', apiDeleteLop);
router.get('/lop/pagination', apiLopPagination);
router.get('/lop/search', apiGetLopByName);
router.get('/lop/:id', apiGetLopById);
// end

//Nhomlop
router.get('/nhomlop', apiGetNhomLop);
router.post('/nhomlop', apiCreateNhomLop);
router.put('/nhomlop/:id', apiUpdateNhomLop);
router.patch('/nhomlop/:id', apiDeleteNhomLop);
router.get('/nhomlop/pagination', apiNhomLopPagination);
router.get('/nhomlop/search', apiGetNhomLopByName);
router.get('/nhomlop/:id', apiGetNhomLopById);
// end

//Student
router.get('/student', apiGetStudent);
router.post('/student', apiCreateStudent);
router.put('/student/:id', apiUpdateStudent);
router.patch('/student/:id', apiDeleteStudent);
router.get('/student/search', apiGetStudentByName);
router.get('/student/:id', apiGetStudentById);
router.get('/student/pagination', apiStudentPagination);

// end

//Teacher
router.get('/teacher', apiGetTeacher);
router.post('/teacher', apiCreateTeacher);
router.put('/teacher/:id', apiUpdateTeacher);
router.patch('/teacher/:id', apiDeleteTeacher);
router.get('/teacher/pagination', apiStudentPagination);
router.get('/teacher/search', apiGetTeacherByName);
router.get('/teacher/:id', apiGetTeacherById);
// end
module.exports = router;
