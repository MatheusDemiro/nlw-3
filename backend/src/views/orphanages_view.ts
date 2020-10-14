import Orphanage from '../models/Orphanage'
import imageView from './images_view'

export default {
  render (orphanage: Orphanage): any {
    return {
      id: orphanage.id,
      name: orphanage.name,
      latitude: orphanage.latitude,
      longitude: orphanage.longitude,
      about: orphanage.about,
      instructions: orphanage.instructions,
      opening_hours: orphanage.opening_hours,
      open_on_weekend: orphanage.open_on_weekends,
      images: imageView.renderMany(orphanage.images)
    }
  },

  renderMany (orphanages: Orphanage[]): any {
    return orphanages.map(orphanage => this.render(orphanage))
  }
}
