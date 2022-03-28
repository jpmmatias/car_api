import express from 'express';
import { categoriesRoutes } from './routes/categories.routes';

const app = express();

app.use(express.json());

app.use('/categories', categoriesRoutes);

app.listen(5000, () => console.log('Server is running at port 5000!'));
