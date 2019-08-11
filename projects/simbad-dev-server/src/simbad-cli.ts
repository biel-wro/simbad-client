import { Request, Response } from 'express-serve-static-core';

const express = require('express');
export const simbadCliRouter = new express.Router();

simbadCliRouter.get('/status', (req: Request, res: Response) => {
    const status = {
        status: 'Running',
        cpu: '80',
        memory: '12',
        uptime: '1111'
    };
    res.json(status);
});

simbadCliRouter.get('/progress', (req: Request, res: Response) => {
    const status = {
        progress: '0.8',
        runningTime: '60'
    };
    res.json(status);
});

simbadCliRouter.put('/run', (req: Request, res: Response) => {
    const status = {
        status: 'OK'
    };

    setTimeout(() => {
        res.json(status);
    }, 100);
});
