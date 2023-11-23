import express from 'express';
import mongoose from 'mongoose';

import dotenv from 'dotenv';
dotenv.config();

import http from "http";
import { ReasonPhrases, StatusCodes } from 'http-status-codes';

import { errorHandler } from './errors/errorHandler';

const app = express();
const host = process.env.HOST || 'localhost';
const port = Number(process.env.PORT || 8000);
const httpServer = http.createServer(app);

const db = String(process.env.DATABASE_CONNECTION).replace(
    '<PASSWORD>', String(process.env.DATABASE_PASSWORD)
);

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

const startServer = async () => {
    const initializeDatabaseConnection = async () => {
        try {
            await mongoose.connect(db);
            console.log(`[DATABASE] - Database connection has been established successfully.`);
            console.log(`- - - - - - - - - -`);

            app.use(errorHandler);

            try {
                httpServer.listen(port, host, () => {
                    console.log(`🌟 🛠️  [SERVER] - Server is listening on http://${host}:${port}`);
                });
            } catch(error){
                console.log(`[SERVER] - Failed to start. Encountered an error during startup.`, error);
            }
        } catch(error) {
            console.log(`[DATABASE] - Server not started due to database connection error.`, error);
        }
    };
        
     initializeDatabaseConnection();
};

startServer();
