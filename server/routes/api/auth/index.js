import express from 'express';
import controller from './controller';
import authMiddleware from '../../middlewares/auth';
import multer from 'multer';

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'public/thumbnail')
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname)
    }
});
const upload = multer({ storage: storage });


const router = express.Router();

router.post('/register', controller.register);
router.post('/login', controller.login);
router.post('/put', controller.put)

router.post('/upload', upload.single('myfile'), function(req,res){
      console.log(req.body); //form fields
      console.log(req.file); //form files
      res.status(204).end();
});

router.use('/token', authMiddleware);
router.get('/token', controller.token);

export default router;
