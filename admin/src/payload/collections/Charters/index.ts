import type { CollectionConfig } from 'payload/types'

import { anyone } from '../../access/anyone'
import { users } from '../../access/users'
import { yachtsAndCharterCommonFields } from '../shared/YachtAndCharterFields'
import { seoField } from '../shared/seo'
import LinkToCustomer from './components/linkToCustomer'
import { generateBrochureHook } from '../../hooks/generateBrochureHook'
import { deleteBrochureHook } from '../../hooks/deleteBrochure'
import DuplicateToSales from './components/duplicate'
import ExcludeCurrentDocRelationship from '../../components/excludeCurrentDocRelationship'

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
  hooks: {
    afterChange: [
      ({ doc, req, previousDoc, operation }) =>
        generateBrochureHook({ doc, req, previousDoc, operation, collection: 'charters' }),
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
    {
      type: 'tabs',
      tabs: [
        {
          label: {
            en: 'Details',
            fr: 'Détails',
          },
          fields: [
            ...yachtsAndCharterCommonFields('charter'),
            seoField,
            {
              label: {
                en: 'Similar Charters',
                fr: 'Charters similaires',
              },
              name: 'similar',
              type: 'relationship',
              required: false,
              relationTo: 'charters',
              hasMany: true,
              admin: {
                components: {
                  Field: ExcludeCurrentDocRelationship,
                },
              },
            },
            {
              type: 'ui',
              name: 'duplicateToSales',
              label: {
                en: 'Duplicate to Sales',
                fr: 'Dupliquer en vente',
              },
              admin: {
                components: {
                  Field: () => DuplicateToSales(),
                },
                position: 'sidebar',
              },
            },
          ],
        },
        {
          label: {
            en: 'Reservations',
            fr: 'Réservations',
          },
          fields: [
            {
              type: 'array',
              name: 'reservations',
              fields: [
                {
                  type: 'date',
                  name: 'from',
                  label: {
                    en: 'From',
                    fr: 'De',
                  },
                  required: true,
                  admin: {
                    date: {
                      pickerAppearance: 'dayOnly',
                    },
                  },
                },
                {
                  type: 'date',
                  name: 'to',
                  label: {
                    en: 'To',
                    fr: 'À',
                  },
                  admin: {
                    date: {
                      pickerAppearance: 'dayOnly',
                    },
                  },
                },
                {
                  name: 'customerName',
                  type: 'text',
                  label: {
                    en: 'Customer',
                    fr: 'Client',
                  },
                  required: false,
                },
                {
                  name: 'customer',
                  type: 'relationship',
                  relationTo: 'archived-customers',
                  required: false,
                  admin: {
                    condition: (data, siblingData, { user }) => siblingData.customer,
                    components: {
                      Field: LinkToCustomer,
                    },
                  },
                },
              ],
              validate: val => {
                if (!val) return true
                // Ensure that the 'from' date is before the 'to' date
                for (let i = 0; i < val.length; i++) {
                  if (val[i].from >= val[i].to) {
                    return 'The "from" date must be before the "to" date'
                  }
                }

                // Check if the new reservation overlaps with any existing reservations
                for (let i = 0; i < val.length; i++) {
                  for (let j = i + 1; j < val.length; j++) {
                    if (
                      (val[i].from <= val[j].from && val[j].from <= val[i].to) ||
                      (val[i].from <= val[j].to && val[j].to <= val[i].to)
                    ) {
                      return 'Reservations cannot overlap'
                    }
                  }
                }

                return true
              },
            },
          ],
        },
      ],
    },
  ],
}
