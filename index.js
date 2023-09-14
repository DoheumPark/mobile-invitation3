import dotenv from 'dotenv';
import express from 'express';
import expressLayout from 'express-ejs-layouts';

import passport from './src/passport/index.js';
import path from 'path';
import { fileURLToPath } from 'url';
import invitationController from './src/routes/invitation/InvitationController.js';
import authController from './src/routes/auth/AuthController.js'

import models from './models/index.js';

passport();
dotenv.config();

const app = express();
const port = process.env.SERVER_PORT;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// app.use(express.json());
app.use(express.static(path.join(__dirname,'public')));

app.use(expressLayout)
    .set('layout', 'layouts/layout')
    .set('layout extractScripts', true);

app.set('view engine', 'ejs')
    .set('views', path.join(__dirname, '/src/views'));
    // .set('views', './views');


app.get('/', (req, res) => {
    res.send('Node.js + Express Server');
});

app.use('/invitation', invitationController);
app.use('/auth', authController);

app.listen(port, () => {
    // tslint:disable-next-line:no-console
    console.log(`[server]: Server is running at <https://localhost>:${port}`);
});