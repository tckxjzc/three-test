import React, {Component} from 'react';
import {
    AmbientLight, AxesHelper,
    BoxGeometry, BufferGeometry, DoubleSide, Line, LineBasicMaterial, LineDashedMaterial, LineSegments,
    Mesh,
    MeshBasicMaterial, MeshLambertMaterial,
    PerspectiveCamera, Plane, PlaneGeometry, PointLight, PointLightHelper,
    Scene, SphereGeometry, SpotLight, SpotLightHelper,
    WebGLRenderer
} from "three";
import * as THREE from 'three';
import {OrbitControls} from "three/examples/jsm/controls/OrbitControls";
import {BoxLineGeometry} from "three/examples/jsm/geometries/BoxLineGeometry";

type Props = {};

class GeometryTest extends Component<Props> {
    render() {
        return <div  ref={this.container}>

        </div>
    }
    container=React.createRef<HTMLDivElement>();
    componentDidMount(): void {
        let scene=new Scene();
        //camera
        let camera=new PerspectiveCamera(60,1,0.1,10000);
        camera.position.set(400,400,400);
        camera.lookAt(scene.position);
        //renderer
        let renderer = new WebGLRenderer({
            antialias:true,
        });
        renderer.setClearColor(0xdddddd);
        renderer.setSize(800,600);
        renderer.shadowMap.enabled=true;
        this.container.current.appendChild(renderer.domElement);
        new OrbitControls(camera,renderer.domElement);
        function run(){
            renderer.render(scene,camera);
            requestAnimationFrame(run);
        }
        requestAnimationFrame(run);

        //light
        scene.add(new AmbientLight(0x999999));
        let pointLight = new PointLight(0xffffff);
         let spotLight=new SpotLight(0xffffff);
        spotLight.position.set(400,400,400);

        spotLight.castShadow = true;
        // 设置计算阴影的区域，注意包裹对象的周围
        spotLight.shadow.camera.near = 1;
        spotLight.shadow.camera.far = 3000;
        spotLight.shadow.camera.fov = 35;
        scene.add(spotLight);
        scene.add(new SpotLightHelper(spotLight));
        // scene.add( new PointLightHelper(pointLight));

        //axes
        scene.add(new AxesHelper(1000));
        //geometry
        let box1=new BoxGeometry(50,50,50);
        let sphere1=new SphereGeometry(25,30,30);
        //mesh
        let material1=new MeshLambertMaterial({
            color:'#2184ff',
        });
        let boxMesh1=new Mesh(box1,material1);
        boxMesh1.position.set(0,0,0);
        boxMesh1.castShadow=true;
        scene.add(boxMesh1);

        let material2=new MeshBasicMaterial({
            color:'#8eff6e'
        });
        let material3=new MeshBasicMaterial({
            wireframe:true
        });
        let mesh2 = new Mesh(box1,material2);
        mesh2.position.set(50+25,0,0);
        scene.add(mesh2);

        let mesh3=new Mesh(box1,material3);
        mesh3.position.set(150,0,0);
        scene.add(mesh3);

        let mesh4=new Mesh(sphere1,material1);
        mesh4.position.set(0,75,0);
        mesh4.castShadow=true;
        scene.add(mesh4);

        //line

        // var curve = new THREE.CatmullRomCurve3( [
        //     new THREE.Vector3( -10, 0, 10 ),
        //     new THREE.Vector3( -5, 5, 5 ),
        //     new THREE.Vector3( 0, 0, 0 ),
        //     new THREE.Vector3( 5, -5, 5 ),
        //     new THREE.Vector3( 10, 0, 10 )
        // ] );
        // var points = curve.getPoints( 50 );
        // var geometry = new THREE.BufferGeometry().setFromPoints( box1.vertices );
        let lineMaterial1=new LineDashedMaterial({
            color:'#ff1b3b',
            // dashSize: 8,
            // scale:1,
            // linewidth:1,
            // gapSize: 1,
        });
        let line1 = new Line(new BoxLineGeometry(50,50,50),lineMaterial1);
        line1.position.set(225,0,0);
        line1.computeLineDistances();
        scene.add(line1);


        // let line2=new Line(sphere1,lineMaterial1);
        // let line2=new Line(new BufferGeometry().setFromPoints(sphere1.vertices),lineMaterial1);
        let line2=new Line(new BufferGeometry().setFromObject(mesh4),lineMaterial1);
        line2.position.set(0,150,0);
        line2.computeLineDistances();
        scene.add(line2);

        let plane1=new PlaneGeometry(1000,1000);
        let planeMaterial1=new MeshLambertMaterial({
            color:'#b3e88e',
            side:DoubleSide,
        });
        let planeMesh1=new Mesh(plane1,planeMaterial1);
        planeMesh1.receiveShadow=true;
        planeMesh1.rotateX(-Math.PI/2);
        planeMesh1.position.setY(-25);
        scene.add(planeMesh1);

        console.log(scene);

    }

}

export default GeometryTest;


function convertColor2Number(color) {
    return Number('0x'+color.substr(1));
}
