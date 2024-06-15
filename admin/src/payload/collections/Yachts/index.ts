import { CollectionConfig } from 'payload/types'
import { users } from '../../access/users'
import { anyone } from '../../access/anyone'
import { yachtsAndCharterCommonFields } from '../YachtAndCharterFields'

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
      return `${process.env.PAYLOAD_PUBLIC_FRONTEND_URL}/yachts/${doc?.id}`
    },
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
  fields: [...yachtsAndCharterCommonFields],
}
