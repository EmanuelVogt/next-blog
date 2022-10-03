import { HttpRequest, Middleware } from '@presentation/protocols'
import { NextHandler } from "next-connect"
import { NextApiRequest, NextApiResponse } from "next";

export const nextAdapterMiddleware = (middleware: Middleware) => {
  return async (req: NextApiRequest, res: NextApiResponse, next: NextHandler) => {
    const httpRequest: HttpRequest = {
      headers: req.headers
    }
    const httpResponse = await middleware.handle(httpRequest)
    if (httpResponse.statusCode === 200) {
      Object.assign(req, httpResponse.body)
      next()
    } else {
      res.status(httpResponse.statusCode).json({
        error: httpResponse.body.message
      })
    }
  }
}
