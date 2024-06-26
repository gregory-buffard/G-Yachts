import type { CollectionConfig } from 'payload/types'

import { anyone } from '../../access/anyone'
import { users } from '../../access/users'
import { populatePublishedAt } from '../../hooks/populatePublishedAt'
import { seoField } from '../shared/seo'

export const Articles: CollectionConfig = {
  slug: 'articles',
  labels: {
    singular: {
      en: 'Article',
      fr: 'Article',
    },
    plural: {
      en: 'Articles',
      fr: 'Articles',
    },
  },
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'category', 'author', 'updatedAt'],
    preview: doc => {
      return `${process.env.PAYLOAD_PUBLIC_FRONTEND_URL}/news/${doc?.id}`
    },
    hideAPIURL: true,
  },
  hooks: {
    beforeChange: [
      populatePublishedAt,
      ({ data, req: { user } }) => {
        // Set the author to the current user
        data.author = user.id
        return data
      },
    ],
    beforeValidate: [
      ({ data, req: { user } }) => {
        // Set the author to the current user
        data.author = user.id
        return data
      },
    ],
  },
  versions: false,
  access: {
    read: anyone,
    update: users,
    create: users,
    delete: users,
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
      localized: true,
      label: {
        en: 'Title',
        fr: 'Titre',
      },
    },
    {
      label: {
        en: 'Category',
        fr: 'Catégorie',
      },
      name: 'category',
      type: 'relationship',
      relationTo: 'categories',
      hasMany: false,
      admin: {
        position: 'sidebar',
      },
      required: true,
    },
    {
      name: 'date',
      type: 'date',
      defaultValue: () => new Date(),
      required: true,
      label: {
        en: 'Date',
        fr: 'Date',
      },
      admin: {
        position: 'sidebar',
        date: {
          pickerAppearance: 'dayOnly',
        },
      },
      hooks: {
        beforeChange: [
          ({ siblingData, value }) => {
            if (siblingData._status === 'published' && !value) {
              return new Date()
            }
            return value
          },
        ],
      },
    },
    {
      name: 'author',
      type: 'relationship',
      relationTo: 'users',
      hasMany: false,
      required: true,
      admin: {
        position: 'sidebar',
      },
      defaultValue: ({ user }) => user?.id || null,
      hooks: {
        beforeChange: [
          ({ req }) => {
            return req.user.id
          },
        ],
        beforeValidate: [
          ({ req }) => {
            return req.user.id
          },
        ],
      },
      // hidden: true,
      label: {
        en: 'Author',
        fr: 'Auteur',
      },
    },
    {
      type: 'richText',
      name: 'content',
      label: {
        en: 'Content',
        fr: 'Contenu',
      },
      required: true,
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
    seoField,
  ],
}
