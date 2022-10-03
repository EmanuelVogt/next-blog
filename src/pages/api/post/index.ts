import { NextApiRequest, NextApiResponse } from "next";
import { createRouter } from 'next-connect'
import { nextAdapterMiddleware } from '@main/next-adapters/middleware-adapter'
import { makeAuthMiddleware } from "@main/factories/middlewares/auth-middleware-factory";

const router = createRouter<NextApiRequest, NextApiResponse>()

export default router.use(nextAdapterMiddleware(makeAuthMiddleware()))
  .post((req: NextApiRequest, res: NextApiResponse) => {
    return res.send('ok')
  }).handler()
