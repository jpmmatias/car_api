import 'reflect-metadata';
import createConnection from './database';
import express from 'express';
import swagger from 'swagger-ui-express';
import swaggerFile from './swagger.json';
import './shared/container';
import { router } from './routes';

const app = express();

createConnection().then(() => console.log('connected to postgress database'));

app.use(express.json());

app.use('/api-docs', swagger.serve, swagger.setup(swaggerFile));

app.use(router);

app.listen(5000, () => console.log('Server is running at port 5000!'));
