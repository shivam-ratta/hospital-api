import * as express from 'express';
const router = express.Router();
import AppointmentController from '../controllers/AppointmentController';

/*
 * GET
 */
router.get('/', AppointmentController.list);

/*
 * GET
 */
router.get('/unpaid/:id?', AppointmentController.unpaid);

/*
 * GET
 */
router.get('/:id', AppointmentController.show);

/*
 * POST
 */
router.post('/', AppointmentController.create);

/*
 * PUT
 */
router.put('/:id', AppointmentController.update);

/*
 * DELETE
 */
router.delete('/:id', AppointmentController.remove);

export = router;
