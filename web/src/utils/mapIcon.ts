import Leaflet from 'leaflet'

import mapMarkerImg from '../images/map-marker.svg'

const mapIcon = Leaflet.icon({
  iconUrl: mapMarkerImg,
  iconSize: [46, 62],
  iconAnchor: [23, 62],
  popupAnchor: [170, 2]
})

export default mapIcon
