import React from 'react'
import { useFieldType, useFormFields } from 'payload/components/forms'
import { useAuth } from 'payload/components/utilities'

export default function BrochureComponent({ path, validate }) {
  const { value = '', setValue } = useFieldType({
    path,
    validate,
  })

  if (!value) {
    return (
      <span style={{ fontSize: '1.5em' }}>
        Brochure: <span style={{ color: 'orange' }}>Not generated</span>
      </span>
    )
  }
  return (
    <span style={{ fontSize: '1.5em' }}>
      Brochure: <span style={{ color: 'green' }}>Generated</span>
    </span>
  )
}
