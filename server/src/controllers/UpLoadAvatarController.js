const path = require('path');

const multer = require('multer');
const { uploadAvatar } = require('../model/UpLoadAvatar');
const apiUploadAvatar = async (req, res) => {
    const storage = multer.diskStorage({
        destination: (req, file, callBack) => {
            callBack(null, './src/public/img/');
        },
        filename: (req, file, callBack) => {
            callBack(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
        },
    });

    const upload = multer({
        storage: storage,
        limits: {
            fileSize: 1000000, //max 500kb
        },
    });

    upload.single('image')(req, res, async (err) => {
        if (err) {
            console.log(err);
            return res.status(500).json({ message: err.message });
        }
        if (!req.file) {
            console.log('No file upload');
            return res.status(400).json({ message: 'No file uploaded' });
        } else {
            const imgsrc = 'http://localhost:3000/img/' + req.file.filename;
            const { id } = req.params;
            const result = await uploadAvatar({ imgsrc, id });
            if (result.error) {
                throw Error;
            } else {
                return res.status(200).json({ message: 'File uploaded', src: imgsrc });
            }
        }
    });
};
module.exports = {
    apiUploadAvatar,
};
