import { NextApiRequest, NextApiResponse } from "next";
import { createRouter } from 'next-connect'
import { nextAdapterMiddleware } from '@/backend/main/next-adapters/middleware-adapter'
import { makeAuthMiddleware } from "@/backend/main/factories/middlewares/auth-middleware-factory";
import { makeAddPostController } from "@/backend/main/factories/controllers/add-post-controller-factory";
import { adapterRoute } from "@/backend/main/next-adapters/route-adapter";
import { makeGetPostsController } from "@/backend/main/factories/controllers/get-posts-controller-factory";

const router = createRouter<NextApiRequest, NextApiResponse>()

export default router.use(nextAdapterMiddleware(makeAuthMiddleware()))
  .post(adapterRoute(makeAddPostController()))
  .get(adapterRoute(makeGetPostsController()))
  .handler()