import { Request, Response, NextFunction } from 'express'
import HttpException from '@exceptions/HttpException'

function isOwnerMiddleware(req: Request, res: Response, next: NextFunction) {
    if(req.session.user_id == req.params.id) return next()
    
    throw new HttpException(403 ,'Access denied!')
}

function isAdminMiddleware(req: Request, res: Response, next: NextFunction) {
    if(req.session.role === 'admin') return next()

    throw new HttpException(403 ,'Access denied!')
}

export { isOwnerMiddleware, isAdminMiddleware }