import { CollectionConfig } from 'payload/types'
import { admins } from '../../access/admins'
import { users } from '../../access/users'
import { anyone } from '../../access/anyone'
import e from 'express'
import { yachtsAndCharterCommonFields } from '../YachtAndCharterFields'

export const Charters: CollectionConfig = {
  slug: 'charters',
  labels: {
    singular: {
      en: 'Charter',
      fr: 'Charter',
    },
    plural: {
      en: 'Charters',
      fr: 'Charters',
    },
  },
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'model', 'price', 'region'],
    preview: doc => {
      return `${process.env.PAYLOAD_PUBLIC_FRONTEND_URL}/charters/${doc?.id}`
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