import cors from 'cors';
import express from 'express';
import morgan from 'morgan';
import { errorHandler, notFoundError } from './middlewares/error-handler.js';

import dbConnection from './config/db.js';
import { PORT } from './config/env.js';
import menuRoutes from './routes/menuRoute.js';

const app = express();

app.use(cors()); //Cross Origin Resource Sharing(yaati l'acces localhost:3000).
//The :status token will be colored green for success codes, red for server error codes, yellow for client error codes
app.use(morgan('dev')); //utiliser morgan
app.use(express.json({ limit: '50mb' })); //pour analyser app/json
app.use(express.urlencoded({ extended: true })); //pour analyser app/x-www-foem-urlencoded

app.use('/menu', menuRoutes);

app.use(
    '/img',
    express.static('upload/images', {
        extensions: ['jpg', 'jpeg', 'png', 'gif', 'svg'],
    })
);

//utiliser le middleware gestionnaire d'erreurs
app.use(notFoundError);
app.use(errorHandler);

dbConnection(() => {
    app.listen(PORT, () => {
        console.log(`Server running at http://localhost:${PORT}/`);
    });
});
