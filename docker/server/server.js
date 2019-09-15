const path = require('path');
const express = require('express');
const compression = require('compression');
const proxy = require('http-proxy-middleware');

const CONTEXT = `/${process.env.CONTEXT || 'simbad-client'}`;
const PORT = process.env.PORT || 4000;

const app = express();
const dir = path.resolve(__dirname, '../../dist/projects/simbad-client');
console.log(dir);
app.use(compression());
app.use(CONTEXT, express.static(path.resolve(__dirname, '../../dist/projects/simbad-client')));
app.use('/', express.static(path.resolve(__dirname, '../../dist/projects/simbad-client')));
app.listen(PORT, () => console.log(`App running on http://localhost:${PORT}${CONTEXT}`));
