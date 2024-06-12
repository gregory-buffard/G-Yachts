import path from 'path'
import type { CollectionConfig } from 'payload/types'

export const Media: CollectionConfig = {
  slug: 'media',
  labels: {
    singular: {
      en: 'Media',
      fr: 'Média',
    },
    plural: {
      en: 'Media',
      fr: 'Médias',
    },
  },
  admin: {
    useAsTitle: 'alt',
    defaultColumns: ['alt'],
    hideAPIURL: true,
  },
  versions: false,
  upload: {
    staticDir: path.resolve(__dirname, '../../../media'),
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      label: {
        en: 'Alt Text',
        fr: 'Texte alternatif',
      },
      name: 'alt',
      type: 'text',
      required: false,
    },
  ],
}
