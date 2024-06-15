import type { AccessArgs } from 'payload/config'

import { checkRole } from '../collections/Users/checkRole'
import type { User } from '../payload-types'

type isUser = (args: AccessArgs<unknown, User>) => boolean

export const users: isUser = ({ req: { user } }) => {
  return checkRole(['user'], user)
}
