import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();
import http from "http";
import { ReasonPhrases, StatusCodes } from 'http-status-codes';
import bodyParser from 'body-parser';
import { errorMiddleware } from './middleware/errorMiddleware';
import authRouter from './auth/routers/authRouter';
import userRouter from './user/routers/userRouter';
import productRouter from './product/routers/productRouter';
import cartRouter from './carts/routers/cartRouter';

const app = express();
const host = process.env.HOST || 'localhost';
const port = Number(process.env.PORT || 8000);
const httpServer = http.createServer(app);

const db = String(process.env.DATABASE_CONNECTION).replace(
    '<password>', String(process.env.DATABASE_PASSWORD)
);

app.use(bodyParser.json());

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

app.use('/api/v1/auth', authRouter);
app.use('/api/v1/users', userRouter);
app.use('/api/v1/products', productRouter);
app.use('/api/v1/carts', cartRouter);

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

            app.use(errorMiddleware);

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

export default app;
