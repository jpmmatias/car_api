import express from 'express';
import { categoriesRoutes, specificationRoutes } from './routes';

const app = express();

app.use(express.json());

app.use('/categories', categoriesRoutes);
app.use('/specifications', specificationRoutes);

app.listen(5000, () => console.log('Server is running at port 5000!'));
