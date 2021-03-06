import 'dotenv/config'
import 'reflect-metadata'

import express, { Request, Response, NextFunction } from 'express'
import 'express-async-errors'
import { router } from './routes/index'
import '../typeorm'
import '../../container'
import { AppError } from '../../errors/AppError'
import createConnection from '../typeorm/index'

createConnection()

const app = express()
app.use(express.json())

app.use(router)

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
    if (err instanceof AppError) {
        return res.status(err.statusCode).json({ message: err.message })
    }
    return res.status(500).json({ status: 'error', message: `internal server error - ${err.message}` })
})

export { app }
