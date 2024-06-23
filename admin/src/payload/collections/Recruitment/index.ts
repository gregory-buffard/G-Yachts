import type { CollectionConfig } from 'payload/types'

import { anyone } from '../../access/anyone'
import { users } from '../../access/users'

export const Recruitment: CollectionConfig = {
  slug: 'recruitment',
  labels: {
    singular: {
      en: 'Recruitment',
      fr: 'Recrutement',
    },
    plural: {
      en: 'Recruitments',
      fr: 'Recrutements',
    },
  },
  admin: {
    useAsTitle: 'title',
    hideAPIURL: true,
  },
  access: {
    read: anyone,
    create: users,
    update: users,
    delete: users,
  },
  fields: [
    {
      name: 'title',
      label: {
        en: 'Title',
        fr: 'Titre',
      },
      type: 'text',
      required: true,
      localized: true,
    },
    {
      name: 'description',
      label: {
        en: 'Description',
        fr: 'Description',
      },
      type: 'richText',
      required: true,
      localized: true,
    },
  ],
}
