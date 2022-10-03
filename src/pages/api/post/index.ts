import { NextApiRequest, NextApiResponse } from "next";
import { createRouter } from 'next-connect'
import { nextAdapterMiddleware } from '@main/next-adapters/middleware-adapter'
import { makeAuthMiddleware } from "@main/factories/middlewares/auth-middleware-factory";
import { makeAddPostController } from "@main/factories/controllers/add-post-controller-factory";
import { adapterRoute } from "@main/next-adapters/route-adapter";

const router = createRouter<NextApiRequest, NextApiResponse>()

export default router.use(nextAdapterMiddleware(makeAuthMiddleware()))
  .post(adapterRoute(makeAddPostController())).handler()
