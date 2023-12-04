import React from 'react'
import ReactDOM from 'react-dom/client'
import ElectrodeGeometryWidget from '@hodj/electrode-geometry-widget'
import './index.css'

const exampleElectrodeLocations = [
  {x: 0, y: 0},
  {x: 100, y: 0},
  {x: 0, y: 100},
  {x: 100, y: 100}
]

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ElectrodeGeometryWidget
      width={100}
      height={100}
      electrodeLocations={exampleElectrodeLocations}
    />
  </React.StrictMode>,
)
