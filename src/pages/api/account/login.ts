import { NextApiRequest, NextApiResponse } from "next";
import { createRouter } from 'next-connect'
import { makeLoginController } from "@main/factories/controllers/login-controller-factory"
import { adapterRoute } from '@main/next-adapters/route-adapter'

const router = createRouter<NextApiRequest, NextApiResponse>()

export default router.post(adapterRoute(makeLoginController())).handler()
