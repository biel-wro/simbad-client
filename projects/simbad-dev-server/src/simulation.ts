import { Request, Response } from 'express-serve-static-core';
import { simulation } from './mocks/simulation';

const express = require('express');
export const simulationRouter = new express.Router();

simulationRouter.get('/latest', (req: Request, res: Response) => {
    res.json(simulation);
});
