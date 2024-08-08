import { Response } from 'express'
import { PayloadRequest } from 'payload/types'
import payload from 'payload'

export async function importYatcoYacht(req: PayloadRequest, res: Response) {
  if (!req.user) {
    return res.status(401).json({ message: 'Unauthorized' })
  }
  const result = await importYacht(req.body, req.user.id)
  return res.json({ message: 'Yacht imported', id: result.id })
}

const importYacht = async (yacht: any, userId: string) => {
  const photo = await fetch(yacht.photos.featured)
  const contentType = photo.headers.get('Content-Type').toLowerCase()
  const blob = await photo.blob()
  const arrayBuffer = await blob.arrayBuffer()
  const buffer = Buffer.from(arrayBuffer)
  const media = await payload.create({
    collection: 'media',
    file: {
      name: `${yacht.name} - imported photo`,
      size: buffer.length,
      data: buffer,
      mimetype: contentType,
    },
    data: {
      alt: `${yacht.name} - imported photo`,
    },
  })
  delete yacht.id
  yacht.photos = {
    featured: media.id,
    gallery: [{ image: media.id }],
  }
  yacht.broker = userId
  yacht.keyFeatures = ['price']
  try {
    const result = await payload.create({
      collection: 'yachts',
      data: yacht,
    })
    payload.logger.info(`Yacht imported: ${yacht.name}`)
    return result
  } catch (err) {
    payload.logger.error(`Error importing yacht: ${yacht.name}, deleting media`)
    console.log(err)
    await payload.delete({
      collection: 'media',
      id: media.id,
    })
  }
}
