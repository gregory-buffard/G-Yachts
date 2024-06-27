import { Button } from 'payload/components'
import { useField } from 'payload/components/forms'
import React from 'react'

export default function LinkToCustomer({ path }) {
  const { value } = useField({
    path,
  })
  return (
    <Button url={`/admin/collections/archived-customers/${value}`} el={'anchor'}>
      View Customer
    </Button>
  )
}
