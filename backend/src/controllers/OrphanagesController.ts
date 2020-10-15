/* eslint-disable camelcase */
import { Express, Request, Response } from 'express'
import { getRepository } from 'typeorm'
import { createValidation } from '../helpers/validator'
import { IImage } from '../models/Image'
import Orphanage, { IOrphanage } from '../models/Orphanage'
import orphanageView from '../views/orphanages_view'

export default {
  async index (request: Request, response: Response): Promise<Response> {
    const orphanagesRepository = getRepository(Orphanage)

    const orphanages = await orphanagesRepository.find({
      relations: ['images']
    })

    return response.json(orphanageView.renderMany(orphanages))
  },

  async show (request: Request, response: Response): Promise<Response> {
    const { id } = request.params

    const orphanagesRepository = getRepository(Orphanage)

    const orphanage = await orphanagesRepository.findOneOrFail(id, {
      relations: ['images']
    })

    return response.json(orphanageView.render(orphanage))
  },

  async create (request: Request, response: Response): Promise<Response> {
    const {
      name,
      latitude,
      longitude,
      about,
      instructions,
      opening_hours,
      open_on_weekends
    } = request.body

    const orphanagesRepository = getRepository(Orphanage)

    const requestImages = request.files as Express.Multer.File[]

    const images = requestImages.map(image => {
      return { path: image.filename } as IImage
    })

    const data: IOrphanage = {
      name,
      latitude,
      longitude,
      about,
      instructions,
      opening_hours,
      open_on_weekends: open_on_weekends === 'true',
      images
    }

    await createValidation(data)

    const orphanage = orphanagesRepository.create(data)

    await orphanagesRepository.save(orphanage)

    return response.status(201).json(orphanage)
  }
}
