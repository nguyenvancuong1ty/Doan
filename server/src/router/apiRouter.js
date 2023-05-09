const express = require('express');
const router = express.Router();
const {
    apiLogin,
    apiCreateAccount,
    apiUpdateAccount,
    apiGetAccount,
    apiDeleteAccount,
} = require('../controllers/AccountController');
const {
    apiGetDiemDanh,
    apiCreateDiemDanh,
    apiUpdateDiemDanh,
    apiDeleteDiemDanh,
} = require('../controllers/DiemDanhController');
const {
    apiGetNhuCauHoc,
    apiCreateNhuCauHoc,
    apiUpdateNhuCauHoc,
    apiDeleteNhuCauHoc,
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
} = require('../controllers/BangDiemController');

// account
router.get('/users', apiGetAccount);
router.post('/users', apiCreateAccount);
router.post('/login', apiLogin);
router.delete('/users', apiDeleteAccount);
router.put('/users/:id', apiUpdateAccount);
// //end

// // DiemDanh
router.get('/attendance', apiGetDiemDanh);
router.post('/attendance', apiCreateDiemDanh);
router.put('/attendance/:id', apiUpdateDiemDanh);
router.delete('/attendance/:id', apiDeleteDiemDanh);
// end

//nhucauhoc
router.get('/nhucauhoc', apiGetNhuCauHoc);
router.post('/nhucauhoc', apiCreateNhuCauHoc);
router.put('/nhucauhoc/:id', apiUpdateNhuCauHoc);
router.delete('/nhucauhoc/:id', apiDeleteNhuCauHoc);
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
// end
module.exports = router;
