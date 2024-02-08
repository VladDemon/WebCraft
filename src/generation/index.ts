import * as THREE from 'three';
import { SimplexNoise } from 'three/examples/jsm/Addons.js';

const geometry: THREE.BoxGeometry = new THREE.BoxGeometry(1, 1, 1);
const material: THREE.MeshLambertMaterial = new THREE.MeshLambertMaterial({ color: 'green' });

export interface Data {
    id: number;
    instanceId: null | number;
  }

export class World extends THREE.Group {

    data : Data[][][] = [];
    noisePar = {
        terr:{
            scale: 30,
            magnitude: 0.5,
            offset: 0.2,
        }
    }


    size: { width: number, height: number };
    constructor(size:  { width: number, height: number } = { width: 64, height: 8 }) {
        super();
        this.size = size;
        this.noisePar = this.noisePar;
    }


    generate() : void{
        this.InitializeWorld()
        this.generateWorld();
        this.generateMeshes();
        
    }

    InitializeWorld() : void{
        this.data = [];
        for(let x = 0; x<this.size.width; ++x){
            let sliceW : Data[]  = [];
            for(let y = 0; y<this.size.height; ++y){
                let rowH : Data[] = [];
                for(let z = 0; z<this.size.width; ++z){
                    rowH.push({id: 0,instanceId: null})
                }
                sliceW.push(rowH);
            }
            this.data.push(sliceW);
        }
    }

    generateWorld() : void{
        const simplex = new SimplexNoise();
        for(let x =0; x<this.size.width; ++x){
            for(let z = 0; z<this.size.width; ++z){
                const value = simplex.noise(x / this.noisePar.terr.scale,z / this.noisePar.terr.scale);
                const scaleNoise = this.noisePar.terr.offset + this.noisePar.terr.magnitude*value;
                let height = Math.floor(this.size.height * scaleNoise);
                height = Math.max(5, Math.min(height,this.size.height - 1))
                for(let y = 0 ; y < height ; ++y){
                    this.SetBlockId(x,y,z, 1); 
                }
            }
        }
    }

    generateMeshes(): void {
        this.clear();
        const maxCount: number = this.size.width * this.size.width * this.size.height;
        const mesh: THREE.InstancedMesh = new THREE.InstancedMesh(geometry, material, maxCount);
        mesh.count = 0;

        const matrix: THREE.Matrix4 = new THREE.Matrix4();

        for (let x: number = 0; x < this.size.width; ++x) {
            for (let y: number = 0; y < this.size.height; ++y) {
                for (let z: number = 0; z < this.size.width; ++z) {
                    const blockId = this.GetBLock(x,y,z)?.id;
                    const instanceId = mesh.count;

                    if(blockId !==0){
                        matrix.setPosition(x + 0.5, y + 0.5, z + 0.5);
                        mesh.setMatrixAt(instanceId, matrix);
                        this.SetBlockIntanceId(x,y,z, instanceId);
                        mesh.count++;
                    }

                }
            }
        }
        this.add(mesh);
    }

    SetBlockId = (x : number,y : number,z : number, id : number) : void =>{
        if(this.InBorder(x,y,z)){
            this.data[x][y][z].id = id;
        }
    }
    SetBlockIntanceId = (x : number,y : number,z : number, instanceId: null | number) => {
        if(this.InBorder(x,y,z)){
            this.data[x][y][z].instanceId = instanceId;
        }
    }

    GetBLock = (x : number,y : number,z : number) : Data | null =>{
        if(this.InBorder(x,y,z)){
            return this.data[x][y][z];
        }
        else return null;
    }

    InBorder = (x : number,y : number,z : number) : boolean =>{
        if(x>=0 && x < this.size.width && y>=0 && y<this.size.height && z >= 0 && z< this.size.width){
            return true
        }
        else return false;
    }

}