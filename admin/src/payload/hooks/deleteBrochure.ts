import { Operation, PayloadRequest } from 'payload/types'
import { Charter, NewConstruction, Yacht } from '../payload-types'
import payload from 'payload'

export const deleteBrochureHook = async <T extends Yacht | Charter | NewConstruction>({
  doc,
  req,
}: {
  doc: T
  req: PayloadRequest
}) => {
  if (doc.brochure) {
    await req.payload.delete({
      collection: 'media',
      id: typeof doc.brochure === 'string' ? doc.brochure : doc.brochure.id,
    })
    payload.logger.info('Brochure deleted')
  }
  doc.brochure = null
  return doc
}
