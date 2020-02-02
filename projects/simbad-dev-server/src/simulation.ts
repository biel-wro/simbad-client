import { Request, Response } from 'express';
import { simulation, simpleSimulations } from './mocks/simulation';

const express = require('express');
export const simulationRouter = new express.Router();

simulationRouter.get('/latest', (req: Request, res: Response) => {
    res.json(simulation);
});

simulationRouter.get('/range/latest', (req: Request, res: Response) => {
    res.json(simpleSimulations);
});

