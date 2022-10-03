import { NextApiRequest } from "next";

export interface NextApiRequestAssign extends NextApiRequest {
  accountId?: string
}