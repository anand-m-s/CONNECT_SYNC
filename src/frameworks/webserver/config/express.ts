import express, { Application, Request } from 'express'
import morgan from 'morgan'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import session from 'express-session';


declare module 'express-session' {
    interface SessionData {

        otp?: string;
        otpGeneratedTime?: number;
        email: string;
    }
}
const expressConfig = (app: Application) => {
    const sessionSecret = process.env.SESSION_SECRET || "default_secret_key";
    app.use(session({
        secret: sessionSecret,
        resave: false,
        saveUninitialized: true,
        proxy:true,
        name:'connect-sync',
        cookie: {
            maxAge: 24 * 60 * 60 * 1000,
            secure: true,
            httpOnly: true,
            sameSite: 'none'
        }
    }))

    
    app.use(morgan('dev'))
    app.use(cookieParser())
    app.use(cors({
        origin: process.env.ORIGIN,
        credentials: true
    }));
    app.use(express.json())
    app.use(express.urlencoded({ extended: true }))

}

export default expressConfig