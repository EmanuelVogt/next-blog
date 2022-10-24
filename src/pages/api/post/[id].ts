import { NextApiRequest, NextApiResponse } from "next";
import { createRouter } from 'next-connect'
import { adapterRoute } from "@/backend/main/next-adapters/route-adapter";
import { makeGetPostController } from "@/backend/main/factories/controllers/get-post-controller-factory";

const router = createRouter<NextApiRequest, NextApiResponse>()

export default router.get(adapterRoute(makeGetPostController())).handler()