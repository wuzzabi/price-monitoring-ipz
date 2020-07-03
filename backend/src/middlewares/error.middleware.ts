import { Request, Response, NextFunction } from 'express'
import HttpException from '@exceptions/HttpException'

function errorMiddleware(error: HttpException, req: Request, res: Response, next: NextFunction) {
    const status: number = error.status || 500
    const message: string = error.message || 'Something went wrong'
    
    console.error('[ERROR] ', status, message)

    res.status(status).json({ error: message })
}

function notFoundMiddleware(req: Request, res: Response, next: NextFunction) {
    next(new HttpException(404, 'Not Found!'))
}

export { errorMiddleware, notFoundMiddleware }