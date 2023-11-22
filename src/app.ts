import express from 'express';

import dotenv from 'dotenv';
dotenv.config();

import http from "http";
import { ReasonPhrases, StatusCodes } from 'http-status-codes';

const app = express();
const host = process.env.HOST || 'localhost';
const port = Number(process.env.PORT || 8000);
const httpServer = http.createServer(app);

app.get('/', (req, res) => {
    return  res.status(StatusCodes.OK).json({
        success: true,
        data: `${ReasonPhrases.OK} : Homepage`,
    });
});

app.get('/api', (req, res) => {
    return  res.status(StatusCodes.OK).json({
        success: true,
        data: `${ReasonPhrases.OK} : API`,
    });
});

app.get('/api/v1', (req, res) => {
    return  res.status(StatusCodes.OK).json({
        success: true,
        data: `${ReasonPhrases.OK} : API - v1`,
    });
});

app.all('*', (req, res) => {
    return res.status(StatusCodes.NOT_FOUND).json({
        success: false,
        data: `Can't find ${req.originalUrl} on this server.`,
    });
});

const server = async () => {
    try {
        httpServer.listen(port, host, () => {
            console.log(`🌟 🛠️  [SERVER] - Server is listening on http://${host}:${port}`);
        });
    }
    catch(error) {
        console.log(`🔥  [SERVER] - Error starting the server`, error);
    }
};

server(); 
