import cors from 'cors';
import express from 'express';
import morgan from 'morgan';
import dbConnection from './config/db.js';
import { PORT } from './config/env.js';
import { errorHandler, notFoundError } from './middlewares/error-handler.js';
import categoryRoutes from './routes/categoryRoute.js';
import menuRoutes from './routes/menuRoute.js';

const app = express();

app.use(
    cors({
        origin: '*',
        methods: '*',
        maxAge: 3600,
    })
);

app.use(morgan('dev'));
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: true }));

app.use('/menu', menuRoutes);
app.use('/plate-category', categoryRoutes);

app.use(
    '/img',
    express.static('upload/images', {
        extensions: ['jpg', 'jpeg', 'png', 'gif', 'svg'],
    })
);

app.use(notFoundError);
app.use(errorHandler);

dbConnection(() => {
    app.listen(PORT, () => {
        console.log(`Server running at http://localhost:${PORT}/`);
    });
});
