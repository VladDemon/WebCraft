import Core from './core/index.ts'
import StatsModule from 'three/examples/jsm/libs/stats.module'
import { World } from './generation/index.ts'
import { OrbitControls } from '@three-ts/orbit-controls';
import createUI from './ui/index.ts'

const core: Core = new Core();
const camera: any = core.camera;
const scene: any = core.scene;
const renderer: any = core.renderer;


const stats: any = new StatsModule();
document.body.append(stats.dom);


const orbit: any = new OrbitControls(camera, renderer.domElement);
orbit.target.set(16,0,16);

orbit.update();


const world: World = new World();
world.generate();
scene.add(world)

createUI(world);

function Animate(): void {
    requestAnimationFrame(Animate);

     
    stats.update()
    renderer.render(scene, camera)
}
Animate();