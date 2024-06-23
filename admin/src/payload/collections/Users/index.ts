import type { CollectionConfig } from 'payload/types'

import { isAdminOrSelf } from '../../access/adminOrSelf'
import { admins } from '../../access/admins'
import { anyone } from '../../access/anyone'
import { checkRole } from './checkRole'
import { ensureFirstUserIsAdmin } from './hooks/ensureFirstUserIsAdmin'
import { loginAfterCreate } from './hooks/loginAfterCreate'

const Users: CollectionConfig = {
  slug: 'users',
  labels: {
    singular: {
      en: 'User',
      fr: 'Utilisateur',
    },
    plural: {
      en: 'Users',
      fr: 'Utilisateurs',
    },
  },
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'email'],
    hideAPIURL: true,
  },
  access: {
    read: anyone,
    create: admins,
    update: isAdminOrSelf,
    delete: admins,
    admin: ({ req: { user } }) => checkRole(['user'], user),
  },
  hooks: {
    afterChange: [loginAfterCreate],
  },
  auth: true,
  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
      label: {
        en: 'Name',
        fr: 'Nom',
      },
    },
    {
      label: {
        en: 'Roles',
        fr: 'Rôles',
      },
      name: 'roles',
      type: 'select',
      hasMany: true,
      defaultValue: ['user'],
      options: [
        {
          label: 'admin',
          value: 'admin',
        },
        {
          label: 'user',
          value: 'user',
        },
      ],
      hooks: {
        beforeChange: [ensureFirstUserIsAdmin],
      },
      access: {
        read: admins,
        create: admins,
        update: admins,
      },
    },
    {
      label: {
        en: 'Profile picture',
        fr: 'Photo de profil',
      },
      name: 'picture',
      type: 'upload',
      relationTo: 'media',
      required: false,
    },
    {
      label: {
        en: 'Position',
        fr: 'Position',
      },
      name: 'position',
      type: 'text',
      required: true,
    },
    {
      label: {
        en: 'Email',
        fr: 'Email',
      },
      name: 'email',
      type: 'email',
      required: true,
    },
    {
      label: {
        en: 'Phone numbers',
        fr: 'Numéros de téléphone',
      },
      type: 'array',
      name: 'phones',
      fields: [
        {
          name: 'prefix',
          type: 'text',
          label: {
            en: 'Prefix',
            fr: 'Préfixe',
          },
        },
        {
          name: 'number',
          type: 'text',
          label: {
            en: 'Number',
            fr: 'Numéro',
          },
        },
      ],
    },
    {
      label: {
        en: 'Languages',
        fr: 'Langues',
      },
      name: 'langs',
      type: 'array',
      required: true,
      fields: [
        {
          name: 'lang',
          type: 'text',
          label: {
            en: 'Language',
            fr: 'Langue',
          },
        },
      ],
    },
  ],
  timestamps: true,
}

export default Users
