const { Router } = require('express');
const multer = require('multer');
const photoPath = require('path').resolve(__dirname, '../../client/photo-viewer.html');
const storage = multer.diskStorage({destination: 'api/uploads/', filename: filename});
const upload = multer({fileFilter: fileFilter, storage: storage});

const router = Router();

function filename(req, file, cb) {
    cb(null, file.originalname);
}

function fileFilter(req, file, cb) {
    if(file.mimetype !== 'image/png') {
        req.fileValidationError = 'Wrong file type';
        cb(null, false, new Error('Wrong file type'))
    } else {
        cb(null, true);
    }
}

router.post('/upload', upload.single('photo'), (req, res)=> {
    if(req.fileValidationError){
        return res.status(400).json({error: req.fileValidationError});
    }
    return res.status(201).json({success: true});
});

router.get('/photo-viewer', (req, res)=> {
    res.sendFile(photoPath);
});

module.exports = router;