import { NextApiRequest, NextApiResponse } from "next";
import { createRouter } from 'next-connect'
import { adapterRoute } from "@/backend/main/next-adapters/route-adapter";
import { makeGetPostsController } from "@/backend/main/factories/controllers/get-posts-controller-factory";

const router = createRouter<NextApiRequest, NextApiResponse>()

export default router
  .get(adapterRoute(makeGetPostsController()))
  .handler()