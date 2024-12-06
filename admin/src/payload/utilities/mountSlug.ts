import payload from 'payload'

const format = (val: string | { en: string; fr: string }): string => {
  if (typeof val === 'object') {
    return val.en
      .trim()
      .replace(/\s+/g, '-')
      .replace(/[^\w-]+/g, '')
      .toLowerCase()
  } else {
    return val
      .trim()
      .replace(/\s+/g, '-')
      .replace(/[^\w-]+/g, '')
      .toLowerCase()
  }
}

const mountSlug = async ({ operation, name, collection, id }) => {
  if (operation === 'create' || operation === 'update') {
    await payload.db.collections[collection].findByIdAndUpdate(id, {
      slug: format(name),
    })
  }

  payload.logger.info('Url slug mounted')
  // if (value && typeof value === 'string') {
  //   // Use the provided value if it's a string
  //   return format(value)
  // }
  //
  // if (operation === 'create' && data?.name) {
  //   // Automatically generate a slug from the 'name' field if it's a 'create' operation
  //   return format(data.name)
  // }
  //
  // if (operation === 'update' && data?.name && !value) {
  //   // For updates, generate the slug only if no slug is explicitly provided
  //   return format(data.name)
  // }
  //
  // return value // Fallback: return the existing slug if nothing else matches
}

export default mountSlug
