import express from 'express';
import controller from './controller';

const router = express.Router();

router.get('/', controller.info);
router.delete('/', controller.unregister);
router.put('/', controller.update);

router.get('/admin', controller.admin);
export default router;
