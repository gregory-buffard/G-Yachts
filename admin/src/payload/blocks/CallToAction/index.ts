import type { Block } from 'payload/types'

import { invertBackground } from '../../fields/invertBackground'
import richText from '../../fields/richText'

export const CallToAction: Block = {
  slug: 'cta',
  labels: {
    singular: 'Call to Action',
    plural: 'Calls to Action',
  },
  fields: [invertBackground, richText()],
}
