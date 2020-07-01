import { Request, Response, NextFunction } from 'express'
import HttpException from '@exceptions/HttpException'

function authMiddleware(req: Request, res: Response, next: NextFunction) {
    if(req.session?.loggedin) return next()

    throw new HttpException(403, 'Access denied!')
}

export default authMiddleware