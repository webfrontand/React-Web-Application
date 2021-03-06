import express from 'express';
import controller from './controller';

const router = express.Router();

router.get('/', controller.list);
router.get('/receive/:id', controller.receive);
router.get('/send/:id', controller.send);

export default router;
