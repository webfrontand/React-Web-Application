import express from 'express';
import auth from './auth';
import user from './user';
import post from './post';
import star from './star';
import comment from './comment';
import share from './share';
import authMiddleware from '../middlewares/auth';

const router = express.Router();

router.use('/auth', auth);

router.use('/', authMiddleware);
router.use('/post', post);
router.use('/user', user);
router.use('/star', star);
router.use('/comment', comment);
router.use('/share', share);

export default router;
