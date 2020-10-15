/* eslint-disable no-tabs */
// eslint-disable-next-line no-use-before-define
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { FiArrowRight, FiPlus } from 'react-icons/fi'
import { Map, TileLayer, Marker, Popup } from 'react-leaflet'

import mapMarkerImg from '../images/map-marker.svg'
import mapIcon from '../utils/mapIcon'
import api from '../services/api'

import '../styles/pages/orphanage-map.css'

interface IOrphanage {
	id: number;
	name: string;
	latitude: number;
	longitude: number;
}

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
function OrphanagesMap () {
  const [orphanages, setOrphanages] = useState<IOrphanage[]>([])

  useEffect(() => {
    api.get('orphanages').then(response => {
      setOrphanages(response.data)
    })
  }, [])

  return (
    <div id="page-map">
      <aside>
        <header>
          <img src={mapMarkerImg} alt="Happy" />

          <h2>Escolha um orfanato no mapa</h2>
          <p>Muitas crianças estão esperando a sua visita :)</p>
        </header>

        <footer>
          <strong>Recife</strong>
          <span>Pernambuco</span>
        </footer>
      </aside>

      <Map
        center={[-8.0244621, -34.957659]}
        zoom={15}
        style={{ width: '100%', height: '100%' }}
      >
        <TileLayer url="https://a.tile.openstreetmap.org/{z}/{x}/{y}.png" />

        {orphanages.map(orphanage => {
          return (
            <Marker
              key={orphanage.id}
              icon={mapIcon}
              position={[orphanage.latitude, orphanage.longitude]}
            >
              <Popup closeButton={false} minWidth={240} maxWidth={240} className="map-popup">
                {orphanage.name}
                <Link to={`/orphanages/${orphanage.id}`}>
                  <FiArrowRight size={20} color="#FFF" />
                </Link>
              </Popup>
            </Marker>
          )
        })}
      </Map>

      <Link to="/orphanages/create" className="create-orphanage">
        <FiPlus size={32} color="#FFF" />
      </Link>
    </div>
  )
}

export default OrphanagesMap
