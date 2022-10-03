import { NextApiRequest, NextApiResponse } from "next";
import { createRouter } from 'next-connect'
import { makeSignUpControllerFactory } from "@/backend/main/factories/controllers/signup-controller-factory"
import { adapterRoute } from '@/backend/main/next-adapters/route-adapter'

const router = createRouter<NextApiRequest, NextApiResponse>()

export default router.post(adapterRoute(makeSignUpControllerFactory())).handler()
