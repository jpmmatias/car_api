import { Router } from 'express';
import { authenticationRoutes } from './authentication.routes';
import { carsRoutes } from './cars.routes';
import { categoriesRoutes } from './categories.routes';
import { specificationRoutes } from './specifications.routes';
import { usersRoutes } from './users.routes';

const router = Router();

router.use('/categories', categoriesRoutes);
router.use('/specifications', specificationRoutes);
router.use('/users', usersRoutes);
router.use('/authentication', authenticationRoutes);
router.use('/cars', carsRoutes);

export { router };
