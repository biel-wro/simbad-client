import { Request, Response } from 'express-serve-static-core';
import { CliStatus } from '@simbad-cli-api/gen/models/cli-status';
import { RunCliCommandResponse } from '@simbad-cli-api/gen/models/run-cli-command-response';
import { CliTaskStatus } from '@simbad-cli-api/gen/models/cli-task-status';
import { CliInfo } from '@simbad-cli-api/gen/models/cli-info';

const express = require('express');
export const simbadCliRouter = new express.Router();

const taskId = 'c6f905ab-bd3e-452e-ab84-a0ad7d73be2f';

const taskStatusMap: {[key: string]: CliTaskStatus} = {
    'c6f905ab-bd3e-452e-ab84-a0ad7d73be2f': {
        cliInfo: {
            cpu: 75.6,
            memory: 21.5,
            runtime: 34512
        },
        state: 'PROGRESS',
        status: '',
        startTimestamp: Date.now()
    }
};

function generateCliInfo(): CliInfo {
    return {
        cpu: randomNumberInRange(50, 99),
        memory: randomNumberInRange(10, 30),
        runtime: 123123
    };
}

function randomNumberInRange(min: number, max: number): number {
    return  Math.random() * (max - min) + min;
}
const status: CliStatus = {
    status: 'IDLE',
    taskId
};

simbadCliRouter.get('/status', (req: Request, res: Response) => {
    res.json(status);
});

simbadCliRouter.get('/status/:taskId', (req: Request, res: Response) => {
    console.log(req.params);
    res.json(taskStatusMap[req.params.taskId]);
    setTimeout(() => {
        taskStatusMap[req.params.taskId].cliInfo = generateCliInfo();
    }, 900);
});

simbadCliRouter.post('/run', (req: Request, res: Response) => {
    console.log('Start CLI task: ', req.params);

    const response: RunCliCommandResponse = {
        taskId
    };

    setTimeout(() => {
        status.status = 'BUSY';
        res.json(response);
    }, 100);

    taskStatusMap[taskId].result = undefined;
    taskStatusMap[taskId].startTimestamp = Date.now();

    setTimeout(() => {
        taskStatusMap[taskId].result = {
            artifactPath: '/home/user/dev/simbad/output/SIM_0_CONF_parametric_evolution_3d/cli_out.csv',
            artifactSize: 178.190269,
            executionTime: 128.73994994163513
        };
        taskStatusMap[taskId].state = 'SUCCESS';
        status.status = 'IDLE';
    }, 10000);
});

