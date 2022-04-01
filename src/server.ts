import 'reflect-metadata';
import express from 'express';
import swagger from 'swagger-ui-express';
import swaggerFile from './swagger.json';
import './database';
import { router } from './routes';

const app = express();

app.use(express.json());

app.use('/api-docs', swagger.serve, swagger.setup(swaggerFile));

app.use(router);

app.listen(5000, () => console.log('Server is running at port 5000!'));
