import React, {Component} from 'react';
import * as  THREE from 'three';
import {AnimationUtils, Mesh, MeshNormalMaterial, Scene, Vector3} from "three";

type Props = {};


class A20181119 extends Component<Props> {
    /**
     * lifecycle
     */

    render() {
        return <div ref={this.container}>

        </div>;
    }

    /**
     *properties
     */
    mounted: boolean;
    container = React.createRef<HTMLDivElement>();

    /**
     *method
     */
    componentDidMount() {
        this.r1();
    }

    r1 = () => {
        let scene = new Scene();
        let camera = new THREE.PerspectiveCamera(50, 1, 0.1, 1000);
        // camera.up.set(0,1,0);
        camera.position.set(9, 9, 9);
        camera.lookAt(0, 0, 0);//lookAt在position之后设置才正常
        // console.log(scene.position)

        let renderer = new THREE.WebGLRenderer();
        renderer.setSize(500, 500);
        this.container.current.appendChild(renderer.domElement);
        let boxGeometry = new THREE.BoxGeometry(1, 1, 1);
        console.log(boxGeometry)

        let material = new MeshNormalMaterial();
        console.log(material)
        let mesh = new Mesh(boxGeometry, material);
        console.log(mesh)

        let geometry = new THREE.Geometry();
        geometry.vertices.push(new Vector3(0, 0, 0), new Vector3(9, 9, 9));
        // geometry.colors.push(new THREE.Color(0xff0000),new THREE.Color(0xff0000));
        var line = new THREE.Line(geometry, new THREE.LineBasicMaterial());
        scene.add(new THREE.AxesHelper(200));
        scene.add(line);
        // mesh.position.z=-0.5;
        scene.add(mesh);


        function r() {
            requestAnimationFrame(r);
            renderer.render(scene, camera);
        }

        r();
        let controls = new THREE.OrbitControls(camera);
    };
}

export default A20181119;
