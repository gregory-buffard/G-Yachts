import type { CollectionConfig } from 'payload/types'

import { anyone } from '../../access/anyone'
import { users } from '../../access/users'
import { seoField } from '../shared/seo'

export const Sold: CollectionConfig = {
  slug: 'solds',
  labels: {
    singular: {
      en: 'Sold',
      fr: 'Vendu',
    },
    plural: {
      en: 'Solds',
      fr: 'Vendus',
    },
  },
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'price', 'builder'],
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
      name: 'name',
      label: {
        en: 'Name',
        fr: 'Nom',
      },
      type: 'text',
      required: true,
    },
    {
      name: 'price',
      label: {
        en: 'Price',
        fr: 'Prix',
      },
      type: 'number',
      required: true,
    },
    {
      label: {
        en: 'Year Built',
        fr: 'Année de construction',
      },
      name: 'yearBuilt',
      type: 'number',
      required: true,
    },
    {
      label: {
        en: 'Length',
        fr: 'Longueur',
      },
      name: 'length',
      type: 'number',
      required: true,
    },
    {
      label: {
        en: 'Sleeps',
        fr: 'Dort',
      },
      name: 'sleeps',
      type: 'number',
      required: true,
    },
    {
      label: {
        en: 'Builder',
        fr: 'Constructeur',
      },
      name: 'builder',
      type: 'text',
      required: true,
    },
    {
      label: {
        en: 'Picture',
        fr: 'Photo',
      },
      name: 'picture',
      type: 'upload',
      relationTo: 'media',
      required: false,
    },
    seoField,
  ],
}
