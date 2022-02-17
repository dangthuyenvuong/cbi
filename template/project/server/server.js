const express = require('express');
const fs = require('fs');
const path = require('path');
const { createProxyMiddleware } = require('http-proxy-middleware');
// const cors = require('cors');
const next = require('next')

const hostname = 'localhost'
const { PORT, PROXY_URL, CHECK_ROBOT, NODE_ENV } = process.env;

const port = PORT || 3000;
// const favicon = require('serve-favicon');
var compression = require('compression');

const envPath = path.join(process.cwd(), './.env');
require('dotenv').config({ path: envPath });


const dev = NODE_ENV !== 'production'

const nextApp = next({ dev, hostname, port })

const handle = nextApp.getRequestHandler()

nextApp.prepare().then(() => {

    const app = express();

   
    app.disable('x-powered-by');
    // app.use(favicon(path.join(__dirname, 'favicon.ico')));
    // app.use(cors());
    app.use(compression());
    // let proxyOptions = {
    //     changeOrigin: true,
    //     proxyTimeout: 30000,
    // };

    // app.use(
    //     '/api',
    //     createProxyMiddleware('/api', { target: PROXY_URL || 'http://localhost:5000', ...proxyOptions }),
    // );

    app.use('/api/env', (req, res) => {
        res.status(200).end({
            PORT,
            PROXY_URL,
            CHECK_ROBOT,
        });
    });

    app.use('/config/env', (req, res) => {
        res.status(200).json({
            PORT,
            PROXY_URL,
            CHECK_ROBOT,
        });
    });

    app.use('/healthz/readiness', (req, res) => {
        res.status(200).end('Ok');
    });

    if (CHECK_ROBOT === 'true') {
        const robotTxt = fs.readFileSync(path.join(__dirname, './robots.txt'), 'utf-8');
        app.use('/robots.txt', (req, res) => {
            return res.send(robotTxt);
        });
    }

    const distDir = path.join(__dirname, '../dist');
    // const htmlTemplate = fs.readFileSync(path.join(distDir, 'index.html'), 'utf-8');
    app.use(express.static(distDir));

    // app.use('/', (req, res) => {
    //     const { access_token } = req.headers;
    //     res.cookie('access_token', access_token);
    //     return res.send(htmlTemplate);
    // });

   


    app.get('*', (req, res) => {
        return handle(req, res)
    })

    app.use((error, req, res) => {
        res.status(500);
        res.render('error', { error });
    });

    app.listen(port, () => {
        console.info(`Listened at http://localhost:${port}`);
    });
})
