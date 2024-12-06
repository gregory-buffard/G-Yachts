import dotenv from 'dotenv'
import path from 'path'

// This file is used to replace `server.ts` when ejecting i.e. `yarn eject`
// See `../eject.ts` for exact details on how this file is used
// See `./README.md#eject` for more information

dotenv.config({
  path: path.resolve(__dirname, '../.env'),
})

import express from 'express'
import payload from 'payload'
import { getBrochure } from './brochures/getBrochure'
import mountSlug from './payload/utilities/mountSlug'

const app = express()
const PORT = process.env.PAYLOAD_PORT || 3000

// Redirect root to the admin panel
app.get('/', (_, res) => {
  res.redirect('/admin')
})

app.get('/brochure/:id', getBrochure)

const start = async (): Promise<void> => {
  await payload.init({
    secret: process.env.PAYLOAD_SECRET || '',
    express: app,
    onInit: () => {
      payload.logger.info(`Payload Admin URL: ${payload.getAdminURL()}`)
    },
  })

  app.listen(PORT, async () => {
    payload.logger.info(`Server started`)
  })

  const sales = await payload.db.collections.yachts.find({}).exec(),
    charters = await payload.db.collections.charters.find({}).exec(),
    newConstructions = await payload.db.collections['new-constructions'].find({}).exec(),
    destinations = await payload.db.collections.destinations.find({}).exec(),
    events = await payload.db.collections.events.find({}).exec(),
    articles = await payload.db.collections.articles.find({}).exec()

  for (const sale of sales) {
    await mountSlug({ operation: 'update', name: sale.name, collection: 'yachts', id: sale._id })
  }

  for (const charter of charters) {
    await mountSlug({
      operation: 'update',
      name: charter.name,
      collection: 'charters',
      id: charter._id,
    })
  }

  for (const newConstruction of newConstructions) {
    await mountSlug({
      operation: 'update',
      name: newConstruction.name,
      collection: 'new-constructions',
      id: newConstruction._id,
    })
  }

  for (const destination of destinations) {
    await mountSlug({
      operation: 'update',
      name: destination.destination,
      collection: 'destinations',
      id: destination._id,
    })
  }

  for (const event of events) {
    await mountSlug({ operation: 'update', name: event.title, collection: 'events', id: event._id })
  }

  for (const article of articles) {
    await mountSlug({
      operation: 'update',
      name: article.title,
      collection: 'articles',
      id: article._id,
    })
  }
}

start()
