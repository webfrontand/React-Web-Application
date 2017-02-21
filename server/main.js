import express from 'express';
import path from 'path';

import webpack from 'webpack';
import WebpackDevServer from 'webpack-dev-server';

import morgan from 'morgan';
import bodyParser from 'body-parser';

import mongoose from 'mongoose';

import passport from 'passport';

import api from './routes/api';
import config from './helper/config';

const app = express();
const port = 3000;
const devPort = 4000;
console.log('test');
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded())
const db = mongoose.connection;
db.on('error', console.error);
db.once('open', () => { console.log('Connected to mongodb server'); });

mongoose.connect(config.mongodbUrl);

app.set('jwt-secret', config.secret);

app.use('/', express.static(path.join(__dirname, './../public')));

app.use('/api', api);


app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, './../public/index.html'));
});

app.listen(port, () => {
    console.log('Express is listening on port', port);
});

if(process.env.NODE_ENV == 'development') {
    console.log('Server is running on development mode');
    const config = require('../webpack.dev.config');
    const compiler = webpack(config);
    const devServer = new WebpackDevServer(compiler, config.devServer);
    devServer.listen(
        devPort, () => {
            console.log('webpack-dev-server is listening on port', devPort);
        }
    );
}
