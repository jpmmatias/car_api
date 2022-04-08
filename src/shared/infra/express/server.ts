import 'reflect-metadata';
import createConnection from './database/typeorm';
import express from 'express';
import 'express-async-errors';
import swagger from 'swagger-ui-express';
import swaggerFile from '../../../swagger.json';
import '@shared/container';
import { router } from './routes';
import { errorTreatment } from '@shared/infra/express/middlewares/errorTreatment';

const app = express();

createConnection().then(() => console.log('connected to postgress database'));

app.use(express.json());

app.use('/api-docs', swagger.serve, swagger.setup(swaggerFile));

app.use(router);

app.use(errorTreatment);

app.listen(5000, () => console.log('Server is running at port 5000!'));
