import express from "express"
import connectDB from "./frameworks/database/mongodb/connection"
import serverConfig from "./frameworks/webserver/config/server"
import expressConfig from "./frameworks/webserver/config/express"
import { userRouter } from './frameworks/webserver/routes/user'
import { adminRouter } from "./frameworks/webserver/routes/admin"
import { chatRouter } from "./frameworks/webserver/routes/chat"
import http from "http"
import colors from 'colors.ts'
import initializeSocket from "./frameworks/webserver/config/socket"
import errorHandler from "./errors/errorHandler"
import { courseRouter } from "./frameworks/webserver/routes/meditation"

colors?.enable()

const app = express()
const server = http.createServer(app)


connectDB()
initializeSocket(server);

expressConfig(app)

app.use('/api', userRouter)

app.use('/api/admin', adminRouter)
app.use('/api/chat', chatRouter)
app.use('/api/course', courseRouter)

app.use(errorHandler)


serverConfig(server).startServer();

