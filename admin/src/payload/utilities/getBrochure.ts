import { Request, Response } from 'express'
import puppeteer from 'puppeteer'
import { generateBrochure } from './brochureGeneration/generateBrochure'
import { PDFDocument } from 'pdf-lib'

export const getBrochure = async (req: Request, res: Response) => {
  try {
    // Launch a headless browser
    const browser = await puppeteer.launch({ ignoreHTTPSErrors: true })
    const page = await browser.newPage()

    // Load the HTML template
    const pages = await generateBrochure(req.params.id, 'yachts')
    const allPages = [pages.first, pages.info, ...pages.images, pages.end]

    const pdfs = []

    for (let i = 0; i < allPages.length; i++) {
      await page.setContent(allPages[i], { waitUntil: ['load', 'networkidle0'] })
      await page.setViewport({ width: 1920, height: 1080 })
      // Generate PDF
      const pdfBuffer = await page.pdf({
        format: 'A4',
        landscape: true,
        printBackground: true,
        displayHeaderFooter: false,
        // This number is a bit of a magic number, but it seems to work well
        scale: 0.95,
      })

      pdfs.push(pdfBuffer)
    }

    // Close the browser
    await browser.close()

    // // Combine all PDFs into one
    const mergedPdf = await PDFDocument.create({
      updateMetadata: false,
    })
    for (let i = 0; i < pdfs.length; i++) {
      //   const pdf = await PDFDocument.load(pdfs[i], {
      //     throwOnInvalidObject: true,
      //   })
      //   const copiedPages = await mergedPdf.copyPages(pdf, [0])
      //   for (let j = 0; j < copiedPages.length; j++) {
      //     mergedPdf.addPage(copiedPages[j])
      // }
    }

    // mergedPdf.setTitle(`${pages.name} - Brochure`)
    // mergedPdf.setAuthor('G-Yachts')

    const finalPdf = await mergedPdf.save()

    // Set the response headers and send the PDF
    res.setHeader('Content-Type', 'application/pdf')
    // res.setHeader('Content-Disposition', `attachment; filename=brochure-${pages.name}.pdf`)
    res.send(finalPdf)
    // res.send(pages.info)
  } catch (error) {
    console.error('Error generating PDF:', error)
    res.status(500).send('An error occurred while generating the PDF')
  }
}
