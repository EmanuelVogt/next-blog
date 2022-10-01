// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'

import { IncomingForm } from 'formidable'

import s3Service from '@backend/services/s3Service';


export const config = {
  api: {
    bodyParser: false,
  }
};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {

  const data: any = await new Promise((resolve, reject) => {
    const form = new IncomingForm({ keepExtensions: true })
    form.parse(req, (err, fields, files) => {
      if (err) return reject(err)
      resolve({ fields, files })
    })
  })
  if (!data.fields.s3Path) {
    return res.status(400).json({ message: 'invalid path' })
  }
  const url = await s3Service.uploadFile(
    data.files.arquivo.newFilename,
    data.files.arquivo.filepath,
    data.files.arquivo.mimetype,
    data.fields.s3Path
  )
  if (!url) {
    res.status(404).end()
  }
  res.status(201).json({ url })
}