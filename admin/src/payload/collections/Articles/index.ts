import type { CollectionConfig } from 'payload/types'

import { populatePublishedAt } from '../../hooks/populatePublishedAt'
import { revalidatePost } from './hooks/revalidatePost'
import { users } from '../../access/users'
import { anyone } from '../../access/anyone'

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
    afterChange: [revalidatePost],
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
          pickerAppearance: 'dayAndTime',
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
      defaultValue: ({ user }) => user.id,
      required: true,
      admin: {
        position: 'sidebar',
      },
      hidden: true,
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
  ],
}
