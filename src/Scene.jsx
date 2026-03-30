import { OrbitControls, MapControls, PerspectiveCamera, OrthographicCamera, Sky, ContactShadows } from '@react-three/drei'
import Room from './components/Room'
import FirstPersonControls from './components/FirstPersonControls'

export default function Scene({ viewMode, area, shape, floorType, wallType, activeMaterialUrl }) {
  return (
    <>
      <Sky sunPosition={[100, 20, 100]} />
      <ContactShadows opacity={0.4} scale={20} blur={2.4} />

      <ambientLight intensity={0.5} />
      <directionalLight position={[10, 10, 5]} intensity={1} castShadow />

      {/* 2D View: Top-down and flat */}
      {viewMode === '2D' && (
        <>
          <OrthographicCamera makeDefault position={[0, 10, 0]} zoom={50} />
          <MapControls enableRotate={false} />
        </>
      )}

      {/* 3D View: Classic perspective rotation */}
      {viewMode === '3D' && (
        <>
          <PerspectiveCamera makeDefault position={[5, 5, 5]} fov={50} />
          <OrbitControls makeDefault enableDamping dampingFactor={0.05} />
        </>
      )}

      {/* First Person: Locked inside */}
      {viewMode === 'FP' && (
        <>
          <PerspectiveCamera makeDefault position={[0, 1.6, 0]} fov={75} />
          <FirstPersonControls />
        </>
      )}

      {/* Dynamic Room Model */}
      <Room 
        area={area} 
        shape={shape} 
        floorType={floorType} 
        wallType={wallType} 
        wallTextureUrl={activeMaterialUrl} 
      />
    </>
  )
}
