import { Request, Response } from 'express'
import { generateBrochure } from './brochureGeneration/generateBrochure'

export const getBrochure = async (req: Request, res: Response) => {
  try {
    const type = req.query.type as 'yachts' | 'charters' | 'new-constructions'
    if (!type) {
      return res.status(400).send('Missing type query parameter')
    }
    if (type !== 'yachts' && type !== 'charters' && type !== 'new-constructions') {
      return res.status(400).send('Invalid type query parameter')
    }

    // Load the HTML template
    const pdf = await generateBrochure(req.params.id, type)

    // Set the response headers and send the PDF
    res.setHeader('Content-Type', 'application/pdf')
    // res.setHeader('Content-Disposition', `attachment; filename=brochure-${pages.name}.pdf`)
    res.status(200).send(pdf)
    // res.send(pages.info)
  } catch (error) {
    console.error('Error generating PDF:', error)
    res.status(500).send('An error occurred while generating the PDF')
  }
}
