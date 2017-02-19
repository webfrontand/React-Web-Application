import express from 'express';
import controller from './controller';
const router = express.Router();

router.get('/', controller.list);
router.get('/:id', controller.listdetail);
router.get('/addlist/:id', controller.addlist);

export default router;
