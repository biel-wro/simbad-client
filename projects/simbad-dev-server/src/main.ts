import { simbadCliRouter } from './simbad-cli';

const fileUpload: any = require('express-fileupload');
const express = require('express');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(
    fileUpload({
        limits: { fileSize: 50 * 1024 }
    })
);

app.enable('case sensitive routing');
app.enable('strict routing');

app.use('/api/cli', simbadCliRouter);

const port = 8000;

app.listen(port, () => {
    console.log(`The Swagger is now running at http://localhost:${port}/api`);
});
