import express from 'express';
import PatientRoutes from './PatientRoutes';
import AppointmentRoutes from './AppointmentRoutes';
import HospitalRoutes from './HospitalRoutes';
import swaggerUi from 'swagger-ui-express';
import swaggerDocument from '../swagger.json';

const router = express.Router()

router.use('/patient', PatientRoutes)
router.use('/appointment', AppointmentRoutes)
router.use('/hospital', HospitalRoutes)

router.use(
    '/swagger',
    swaggerUi.serve,
    swaggerUi.setup(swaggerDocument, { swaggerOptions: { defaultModelsExpandDepth: -1 } })
);

router.use('/', (req, res) => {
    res.send('App working');
})

router.use('*', (req, res) => {
    res.status(400).json({
        message: "Route not found"
    })
})

export default router