import payload from 'payload'
import type { Yacht } from '../../payload-types'
import type { Charter } from '../../payload-types'
import type { NewConstruction } from '../../payload-types'
import { generateBrochureFirstPage } from './pages/first'
import { generateBrochureDetailsPage } from './pages/detail'
import { generateBrochurePhotoPage } from './pages/photo'
import { generateBrochureLastPage } from './pages/end'
export async function generateBrochure(
  id: string,
  type: 'yachts' | 'charters' | 'new-constructions',
): Promise<{
  name: string
  first: string
  info: string
  images: string[]
  end: string
}> {
  // GEt full data
  const data = await payload.findByID({
    collection: type,
    id: id,
    depth: 5,
    locale: 'en',
  })

  // Generate brochure
  const firstPage = generateBrochureFirstPage(data)
  const secondPage = generateBrochureDetailsPage(data)
  const imagePages = []
  for (let i = 0; i < data.photos.gallery.length; i++) {
    imagePages.push(generateBrochurePhotoPage(data, i))
  }
  const lastPage = generateBrochureLastPage(data)

  return {
    name: data.name,
    first: firstPage,
    info: secondPage,
    images: imagePages,
    end: lastPage,
  }
}
