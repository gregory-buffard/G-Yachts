import type { CollectionConfig } from 'payload/types'

import { anyone } from '../../access/anyone'
import { users } from '../../access/users'
import { yachtsAndCharterCommonFields } from '../shared/YachtAndCharterFields'
import { seoField } from '../shared/seo'
import { generateBrochureHook } from '../../hooks/generateBrochureHook'
import { deleteBrochureHook } from '../../hooks/deleteBrochure'
import DuplicateToCharter from './components/duplicate'

export const Yachts: CollectionConfig = {
  slug: 'yachts',
  labels: {
    singular: {
      en: 'Yacht',
      fr: 'Yacht',
    },
    plural: {
      en: 'Yachts',
      fr: 'Yachts',
    },
  },
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'model', 'price', 'region'],
    preview: doc => {
      return `${process.env.PAYLOAD_PUBLIC_FRONTEND_URL}/yacht/${doc?.id}`
    },
    hideAPIURL: true,
  },
  hooks: {
    afterChange: [
      ({ doc, req, previousDoc, operation }) =>
        generateBrochureHook({ doc, req, previousDoc, operation, collection: 'yachts' }),
    ],
    afterDelete: [({ doc, req }) => deleteBrochureHook({ doc, req })],
  },
  versions: false,
  access: {
    read: anyone,
    create: users,
    update: users,
    delete: users,
  },
  fields: [
    ...yachtsAndCharterCommonFields('yacht'),
    seoField,
    {
      type: 'ui',
      name: 'duplicateToCharter',
      label: {
        en: 'Duplicate to Charter',
        fr: 'Dupliquer en location',
      },
      admin: {
        components: {
          Field: () => DuplicateToCharter(),
        },
        position: 'sidebar',
      }
    },
  ],
}
