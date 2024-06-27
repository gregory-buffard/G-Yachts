import { Payload } from 'payload'
import { Message } from '../../../payload-types'

export const validateCharertDates = async (
  value: any,
  {
    data,
    payload,
  }: {
    data: Message
    payload: Payload
  },
) => {
  if (!payload) return true
  if (data.type !== 'charter') return true
  if (!value.from || !value.to) return 'Both start and end dates are required'
  if (value.from && value.to) {
    if (new Date(value.from) > new Date(value.to)) {
      return 'The start date must be before the end date'
    }
  }
  const { reservations } = await payload.findByID({
    collection: 'charters',
    id: typeof data.charter === 'string' ? data.charter : data.charter.id.toString(),
  })

  // Check if the new reservation overlaps with any existing reservations
  for (let i = 0; i < reservations.length; i++) {
    for (let j = i + 1; j < reservations.length; j++) {
      if (
        (reservations[i].from <= reservations[j].from &&
          reservations[j].from <= reservations[i].to) ||
        (reservations[i].from <= reservations[j].to && reservations[j].to <= reservations[i].to)
      ) {
        return 'Reservations cannot overlap'
      }
    }
  }
  return true
}
