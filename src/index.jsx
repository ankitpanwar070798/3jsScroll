import './style.css'
import ReactDOM from 'react-dom/client'
import { Canvas } from '@react-three/fiber'
import Experience from './Experience.jsx'
import { Leva } from 'leva'
import Demo from './Demo.jsx'

const root = ReactDOM.createRoot(document.querySelector('#root'))

root.render(
    <>
    <Leva collapsed/>
    <Canvas
    shadows
    camera={ {
        fov: 45,
        near: 0.1,
        far: 200,
        position: [ - 4, 3, 6 ]
    } }
>
<Demo/>

  
</Canvas>
    </>

)