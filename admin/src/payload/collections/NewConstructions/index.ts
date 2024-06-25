import type { CollectionConfig } from 'payload/types'

import { anyone } from '../../access/anyone'
import { users } from '../../access/users'
import { yachtsAndCharterCommonFields } from '../YachtAndCharterFields'

export const NewConstructions: CollectionConfig = {
  slug: 'new-constructions',
  labels: {
    singular: {
      en: 'New Construction',
      fr: 'Nouvelle construction',
    },
    plural: {
      en: 'New Constructions',
      fr: 'Nouvelles constructions',
    },
  },
  admin: {
    useAsTitle: 'name',
    hideAPIURL: true,
  },
  hooks: {},
  versions: false,
  access: {
    read: anyone,
    create: users,
    update: users,
    delete: users,
  },
  fields: [
    {
      type: 'text',
      name: 'delivery',
      label: {
        en: 'Delivery year',
        fr: 'Livraison année',
      },
      required: true,
    },
    ...yachtsAndCharterCommonFields,
  ],
}
