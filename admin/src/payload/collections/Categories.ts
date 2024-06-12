import type { CollectionConfig } from 'payload/types'

const Categories: CollectionConfig = {
  slug: 'categories',
  labels: {
    singular: {
      en: 'Category',
      fr: 'Catégorie',
    },
    plural: {
      en: 'Categories',
      fr: 'Catégories',
    },
  },
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title'],
    hideAPIURL: true,
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      label: {
        en: 'Title',
        fr: 'Titre',
      },
      localized: true,
    },
  ],
}

export default Categories
