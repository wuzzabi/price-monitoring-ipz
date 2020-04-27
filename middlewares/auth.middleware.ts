import { Request, Response, NextFunction } from 'express'

function authMiddleware(req: Request, res: Response, next: NextFunction) {
    if(req.session?.loggedin) {
        next()
    } else {
        return res.status(403).send('You need to login')
    }
}

export default authMiddleware