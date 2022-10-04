import { NextApiRequest, NextApiResponse } from "next";
import { createRouter } from 'next-connect'
import { adapterRoute } from '@/backend/main/next-adapters/route-adapter'
import { makeTokenLoginController } from "@/backend/main/factories/controllers/token-login-factory";

const router = createRouter<NextApiRequest, NextApiResponse>()

export default router.post(adapterRoute(makeTokenLoginController())).handler()
