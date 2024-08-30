import {
  Yacht,
  Charter,
  Shipyard,
  Destination,
  Partner,
  NewConstruction,
  User,
} from '../../payload-types'

export const queryCollection = async <
  T extends Yacht | Charter | User | Shipyard | Destination | Partner | NewConstruction,
>(
  query: string,
  collection:
    | 'yachts'
    | 'charters'
    | 'users'
    | 'shipyards'
    | 'destinations'
    | 'partners'
    | 'new-constructions',
  locale: 'en' | 'fr',
  limit?: number,
): Promise<T[]> => {
  const response = await fetch(
    `/api/${collection}?locale=${locale}&depth=0&where[and][1][or][0][name][like]=${encodeURIComponent(
      query,
    )}&limit=${limit || 10}`,
  )
  const data = await response.json()
  console.log(data)
  return data.docs
}
