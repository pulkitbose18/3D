import { useState, Suspense } from 'react'
import { Canvas } from '@react-three/fiber'
import { Footprints, ArrowLeft } from 'lucide-react'
import Scene from './Scene'
import './index.css'

const PRODUCTS = [
  { id: 'acoustic', name: 'Acoustic Panel', url: '/textures/acoustic_panel.jpg', color: '#8b5a2b' },
  { id: 'marble', name: 'Marble Finish', url: '/textures/marble.png', color: '#e2e8f0' },
  { id: 'charcoal', name: 'Charcoal Slat', url: '/textures/charcoal.jpg', color: '#1e293b' },
]

function Loader3D() {
  return (
    <div className="loader-overlay">
      <div className="loader-spinner"></div>
      <p>Loading Assets...</p>
    </div>
  )
}

function App() {
  const [viewMode, setViewMode] = useState('3D')
  const [isConfigured, setIsConfigured] = useState(false)
  const [roomType, setRoomType] = useState('living-room')
  const [area, setArea] = useState(10)
  const [shape, setShape] = useState('square')
  const [floorType, setFloorType] = useState('wood') 
  const [wallType, setWallType] = useState('paint') 
  const [activeMaterial, setActiveMaterial] = useState(PRODUCTS[0])

  if (!isConfigured) {
    return (
      <div className="setup-container">
        <div className="setup-card">
          <h1>Configure your room</h1>
          <p>Define the base dimensions and materials for your 3D workspace</p>
          
          <div className="sentence-form">
            I want to create my 
            <select value={roomType} onChange={(e) => setRoomType(e.target.value)} className="inline-select">
              <option value="living-room">living room</option>
              <option value="bedroom">bedroom</option>
              <option value="kitchen">kitchen</option>
            </select>
            , it is approximately 
            <select value={area} onChange={(e) => setArea(Number(e.target.value))} className="inline-select">
              <option value={10}>10 m²</option>
              <option value={20}>20 m²</option>
              <option value={30}>30 m²</option>
            </select>
            and its shape is a 
            <select value={shape} onChange={(e) => setShape(e.target.value)} className="inline-select">
              <option value="square">square</option>
              <option value="rectangle">rectangle</option>
            </select>
            .<br />
            I prefer 
            <select value={floorType} onChange={(e) => setFloorType(e.target.value)} className="inline-select">
              <option value="wood">standard wood</option>
              <option value="grass">artificial grass</option>
            </select>
            flooring and 
            <select value={wallType} onChange={(e) => setWallType(e.target.value)} className="inline-select">
              <option value="paint">white paint</option>
              <option value="acoustic">acoustic panels</option>
            </select>
            materials.
          </div>

          <button className="btn-primary" onClick={() => setIsConfigured(true)}>
            Launch 3D Planner
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="app-container">
      <Suspense fallback={<Loader3D />}>
        <Canvas shadows>
          <Scene 
            viewMode={viewMode} 
            area={area} 
            shape={shape} 
            floorType={floorType} 
            wallType={wallType} 
            activeMaterialUrl={activeMaterial.url} 
          />
        </Canvas>
      </Suspense>

      <div className="header-info">
        <button className="btn-back" onClick={() => setIsConfigured(false)}>
          <ArrowLeft size={16} />
          Back
        </button>
        <h3>
          {roomType.replace('-', ' ')} • {area}m² • 
          {floorType === 'grass' ? ' artificial grass' : ' wood'} / 
          {wallType === 'acoustic' ? ' acoustic panels' : ' paint'}
        </h3>
      </div>

      <aside className="product-sidebar">
        <h4>Interior Solutions</h4>
        <div className="product-list">
          {PRODUCTS.map(product => (
            <button 
              key={product.id}
              className={`product-btn ${activeMaterial.id === product.id ? 'active' : ''}`}
              onClick={() => setActiveMaterial(product)}
            >
              <div className="swatch" style={{ backgroundColor: product.color }}></div>
              <span>{product.name}</span>
            </button>
          ))}
        </div>
      </aside>

      <div className="view-switcher-container">
        <p className="switcher-label">Select your view mode</p>
        <div className="toggle-bar">
          <button
            className={`toggle-btn ${viewMode === '2D' ? 'active' : ''}`}
            onClick={() => setViewMode('2D')}
          >
            2D
          </button>
          <button
            className={`toggle-btn ${viewMode === '3D' ? 'active' : ''}`}
            onClick={() => setViewMode('3D')}
          >
            3D
          </button>
          <button
            className={`toggle-btn icon-btn ${viewMode === 'FP' ? 'active' : ''}`}
            onClick={() => setViewMode('FP')}
          >
            <Footprints size={20} />
          </button>
        </div>
      </div>
    </div>
  )
}

export default App
