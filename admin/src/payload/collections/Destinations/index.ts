import { CollectionConfig } from 'payload/types'
import { admins } from '../../access/admins'
import { anyone } from '../../access/anyone'

export const Destinations: CollectionConfig = {
  slug: 'destinations',
  labels: {
    singular: {
      en: 'Destination',
      fr: 'Destination',
    },
    plural: {
      en: 'Destinations',
      fr: 'Destinations',
    },
  },
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'region', 'country'],
    preview: doc => {
      return `${process.env.PAYLOAD_PUBLIC_FRONTEND_URL}/destinations/${doc?.id}`
    },
    hideAPIURL: true,
  },
  hooks: {},
  versions: false,
  access: {
    read: anyone,
    create: admins,
    update: admins,
    delete: admins,
  },
  fields: [
    {
      name: 'destination',
      label: {
        en: 'Destination',
        fr: 'Destination',
      },
      type: 'text',
      localized: true,
      required: true,
    },
    {
      name: 'country',
      label: {
        en: 'Country',
        fr: 'Pays',
      },
      type: 'text',
      required: true,
      localized: true,
    },
    {
      name: 'region',
      label: {
        en: 'Region',
        fr: 'Région',
      },
      type: 'text',
      required: true,
      localized: true,
    },
    {
      name: 'continent',
      label: {
        en: 'Continent',
        fr: 'Continent',
      },
      type: 'text',
      required: true,
      localized: true,
    },
    {
      name: 'photos',
      label: {
        en: 'Photos',
        fr: 'Photos',
      },
      type: 'group',
      fields: [
        {
          name: 'featured',
          label: {
            en: 'Featured Photo',
            fr: 'Photo en vedette',
          },
          type: 'upload',
          relationTo: 'media',
          required: true,
        },
        {
          name: 'destinationPhoto',
          label: {
            en: 'Destination Photo',
            fr: 'Photo de destination',
          },
          type: 'upload',
          relationTo: 'media',
          required: true,
        },
      ],
    },
    {
      name: 'description',
      label: {
        en: 'Description',
        fr: 'Description',
      },
      type: 'textarea',
      required: true,
      localized: true,
    },
    {
      name: 'info',
      label: {
        en: 'Info',
        fr: 'Info',
      },
      type: 'group',
      fields: [
        {
          name: 'bestTimeToVisit',
          label: {
            en: 'Best Time to Visit',
            fr: 'Meilleur moment pour visiter',
          },
          type: 'text',
          required: true,
          localized: true,
        },
        {
          name: 'languages',
          label: {
            en: 'Languages',
            fr: 'Langues',
          },
          type: 'text',
          required: true,
          localized: true,
        },
        {
          name: 'gettingThere',
          label: {
            en: 'Getting There',
            fr: 'Comment y aller',
          },
          type: 'textarea',
          required: true,
          localized: true,
        },
        {
          name: 'currency',
          label: {
            en: 'Currency',
            fr: 'Devise',
          },
          type: 'text',
          required: true,
          localized: true,
        },
      ],
    },
    {
      name: 'coordinates',
      label: {
        en: 'Coordinates',
        fr: 'Coordonnées',
      },
      type: 'point',
      required: false,
      validate: val => {
        if (Math.abs(val[0]) > 90 && Math.abs(val[1]) > 180) {
          return 'Invalid coordinates'
        }
        return true
      },
    },
  ],
}
