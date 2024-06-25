import type { CollectionConfig } from 'payload/types'

import { anyone } from '../../access/anyone'
import { users } from '../../access/users'

export const Events: CollectionConfig = {
  slug: 'events',
  labels: {
    singular: {
      en: 'Event',
      fr: 'Événement',
    },
    plural: {
      en: 'Events',
      fr: 'Événements',
    },
  },
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title'],
    hideAPIURL: true,
  },
  versions: false,
  access: {
    read: anyone,
    create: users,
    update: users,
    delete: users,
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      label: {
        en: 'Title',
        fr: 'Titre',
      },
      required: true,
      localized: true,
    },
    {
      type: 'row',
      fields: [
        {
          name: 'fromDate',
          type: 'date',
          label: {
            en: 'From Date',
            fr: 'Date de début',
          },
          required: true,
        },
        {
          name: 'toDate',
          type: 'date',
          label: {
            en: 'To Date',
            fr: 'Date de fin',
          },
          required: true,
        },
      ],
    },
    {
      type: 'group',
      name: 'location',
      label: {
        en: 'Location',
        fr: 'Lieu',
      },
      fields: [
        {
          type: 'text',
          label: {
            en: 'City',
            fr: 'Ville',
          },
          name: 'city',
          required: false,
        },
        {
          type: 'text',
          label: {
            en: 'Country',
            fr: 'Pays',
          },
          name: 'country',
          required: false,
        },
      ],
    },
    {
      type: 'richText',
      name: 'content',
      label: {
        en: 'Content',
        fr: 'Contenu',
      },
      required: false,
      localized: true,
    },
    {
      name: 'image',
      type: 'upload',
      relationTo: 'media',
      label: {
        en: 'Image',
        fr: 'Image',
      },
      required: true,
    },
  ],
}
