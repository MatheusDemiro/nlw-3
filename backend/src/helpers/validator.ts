import * as Yup from 'yup'
import { IOrphanage } from '../models/Orphanage'

export const createValidation = async (orphanage: IOrphanage): Promise<void> => {
  const schema = Yup.object().shape({
    name: Yup.string().required(),
    latitude: Yup.number().required(),
    longitude: Yup.number().required(),
    about: Yup.string().required().max(300),
    instructions: Yup.string().required(),
    opening_hours: Yup.string().required(),
    open_on_weekends: Yup.boolean().required(),
    images: Yup.array(Yup.object().shape({
      path: Yup.string().required()
    }))

  })

  await schema.validate(orphanage, {
    abortEarly: false
  })
}
