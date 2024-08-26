import { useField } from 'payload/components/forms'
import { useDocumentInfo } from 'payload/dist/admin/components/utilities/DocumentInfo'
import React, { useEffect, useState } from 'react'
import Relationship from 'payload/dist/admin/components/views/Version/RenderFieldsToDiff/fields/Relationship'

const ExcludeCurrentDocRelationship: React.FC<any> = props => {
  const { value } = useField({ path: 'id' }),
    { id } = useDocumentInfo(),
    [query, setQuery] = useState({})

  useEffect(() => {
    if (id) {
      setQuery({ where: { id: { not_equals: id } } })
    }
  }, [id])

  return <Relationship {...props} query={query} />
}

export default ExcludeCurrentDocRelationship
