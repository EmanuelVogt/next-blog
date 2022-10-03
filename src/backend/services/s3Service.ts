import fs from 'fs'

import AWS from 'aws-sdk'

class s3Service {
  async uploadFile(fileName: any, filePath: any, fileMimetype: any, s3Path: any) {
    const s3 = new AWS.S3({
      accessKeyId: process.env.AWS_ACCESS_KEY_ID,
      secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
      region: process.env.AWS_REGION
    })
    const fileContent = fs.readFileSync(filePath)

    const params = {
      Bucket: process.env.AWS_S3_BUCKET,
      Key: s3Path ? `${s3Path}/${fileName}` : filePath,
      Body: fileContent,
      ContentType: fileMimetype
    }

    await s3.upload(params as any).promise()
    return `${process.env.FILE_PRE_LINK}${s3Path}/${fileName}`
  }
}
export default new s3Service()
