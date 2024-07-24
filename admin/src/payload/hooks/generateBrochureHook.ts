import payload from 'payload'
import { Operation, PayloadRequest } from 'payload/types'
import { Charter, NewConstruction, Yacht } from '../payload-types'

export const generateBrochureHook = async <T extends Yacht | Charter | NewConstruction>({
  doc,
  req,
  previousDoc,
  operation,
  collection,
}: {
  doc: T
  req: PayloadRequest
  previousDoc: T
  operation: Operation
  collection: 'yachts' | 'charters' | 'new-constructions'
}) => {
  if (operation === 'create' || operation === 'update') {
    generateAndDontBlock({
      doc,
      collection,
    })
  }
}

const generateAndDontBlock = async <T extends Yacht | Charter | NewConstruction>({
  doc,
  collection,
}: {
  doc: T
  collection: 'yachts' | 'charters' | 'new-constructions'
}) => {
  payload.logger.info(`Generating brochure for collection ${collection} with ID ${doc.id}...`)
  await deleteOldBrochure(doc.id, collection)
  if (doc.photos.gallery.length === 0 || !doc.photos.featured) {
    payload.logger.error(`No suitable images found for brochure generation for ${doc.id}`)
    return null
  }
  const resp = await fetch(
    `${process.env.PAYLOAD_PUBLIC_SERVER_URL}/brochure/${doc.id}?type=${collection}`,
  )
  if (resp.status !== 200) {
    console.error(
      `Failed to generate brochure for ${doc.id}, status code: ${
        resp.status
      }, ${await resp.text()}`,
    )
    await payload.db.collections[collection].findByIdAndUpdate(doc.id, {
      brochure: null,
    })
    return
  }
  const pdf = await resp.blob()

  const arrayBuffer = await pdf.arrayBuffer()
  const buffer = Buffer.from(arrayBuffer)

  const name = `brochure-${collection}-${doc.id}.pdf`
  const createdMedia = await payload.create({
    collection: 'media',
    file: {
      data: buffer,
      mimetype: 'application/pdf',
      size: buffer.byteLength,
      name: name,
    },
    data: {
      alt: `${doc.name} brochure`,
    },
  })
  await deleteOldBrochure(doc.id, collection)
  await payload.db.collections[collection].findByIdAndUpdate(doc.id, {
    brochure: createdMedia.id,
  })
  payload.logger.info('Brochure generated.')
}

const deleteOldBrochure = async <T extends Yacht | Charter | NewConstruction>(
  id: string,
  collection: 'yachts' | 'charters' | 'new-constructions',
) => {
  const doc: T = (await payload.findByID({
    collection: collection,
    id: id,
    depth: 5,
    locale: 'en',
  })) as T
  if (doc.brochure) {
    try {
      const exists = await payload.findByID({
        collection: 'media',
        id: typeof doc.brochure === 'string' ? doc.brochure : doc.brochure.id,
      })
      if (exists)
        await payload.delete({
          collection: 'media',
          id: typeof doc.brochure === 'string' ? doc.brochure : doc.brochure.id,
        })
    } catch (e) {
      payload.logger.info('Old brochure not found, skipping deletion')
    }
  }
}
