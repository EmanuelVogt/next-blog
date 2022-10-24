import { Controller, HttpRequest } from '@/backend/presentation/protocols'
import type { NextApiRequest, NextApiResponse } from 'next'


export const adapterRoute = (controller: Controller) => {
  return async (req: NextApiRequest, res: NextApiResponse) => {
    const httpRequest: HttpRequest = {
      body: req.body,
      headers: req.headers,
      query: req.query
    }
    const httpResponse = await controller.handle(httpRequest)
    if (httpResponse.statusCode >= 200 && httpResponse.statusCode <= 299) {
      res.status(httpResponse.statusCode).json(httpResponse.body)
    } else {
      res.status(httpResponse.statusCode).json({
        error: httpResponse.body.message
      })
    }
  }
}
