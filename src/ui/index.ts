import { GUI } from 'three/addons/libs/lil-gui.module.min.js';


interface WorldPar {
  noisePar : {
    terr:{
        scale: 30,
        magnitude: 0.5,
        offset: 0.2,
    }
  }
  size: {
    width: number;
    height: number;
  };
  generate: () => void;
}

export default function createUI(world: WorldPar): void {
  const gui: GUI = new GUI();
  const size= gui.addFolder('size');
  size.add(world.size, 'width', 8, 128, 1).name('Width');
  size.add(world.size, 'height', 8, 128, 1).name('Height');
  
  const terrain = gui.addFolder('Terrain');
  terrain.add(world.noisePar.terr, 'scale', 10,100).name('Scale');
  terrain.add(world.noisePar.terr, 'magnitude', 0,1).name('Magnitude');
  terrain.add(world.noisePar.terr, 'offset', 0,1).name('Offset');
  
  gui.onChange(() => {
    world.generate();
  });
}