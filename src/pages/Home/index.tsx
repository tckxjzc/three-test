import React, {Component} from 'react';
import {connect} from 'react-redux';
import * as THREE from 'three';
import {
    BoxGeometry, BufferGeometry,
    Mesh, MeshLambertMaterial,
    MeshNormalMaterial,
    PerspectiveCamera,
    PointLight,
    Scene,
    SphereGeometry, Vector2,
    Vector3
} from "three";

type Props = {
    // dispatch
}

class Home extends Component<Props> {
    /**
     * lifecycle
     */
    mounted = false;

    constructor(props) {
        super(props);
    }

    componentDidMount() {
        this.mounted = true;
        // this.start();
        this.testD()
    }

    componentWillUnmount() {
        this.mounted = false;
    }

    render() {
        return <div data-container style={{backgroundColor: '#ddd'}} ref={this.container}>

        </div>
    }

    /**
     *properties
     */
    container = React.createRef<HTMLDivElement>();
    /**
     *method
     */

    testD=()=>{
        let rect = this.container.current.getBoundingClientRect();
        const scene = new Scene();

        const camera = new PerspectiveCamera(50, rect.width / rect.height, 0.01, 1000);

        /**
         * 此处z最小值为物体最边缘(z+near)+
         */
        camera.position.z = 5;//当cube w,h,d=0.5时，z>0.26+

        const render = new THREE.WebGLRenderer({antialias: true});
        render.setSize(rect.width, rect.height);
        this.container.current.appendChild(render.domElement);

        let cube=new BoxGeometry(1,1,1);
        let cubeMaterial=new MeshNormalMaterial();
        let mesh=new Mesh(cube,cubeMaterial);

        console.log(scene);
        console.log(cube);
        console.log(cubeMaterial);
        console.log(mesh);
    };

    start = () => {
        let rect = this.container.current.getBoundingClientRect();
        const scene = new Scene();

        const camera = new PerspectiveCamera(50, rect.width / rect.height, 0.01, 1000);
        /**
         * 此处z最小值为物体最边缘(z+near)+
         */
        camera.position.z = 5;//当cube w,h,d=0.5时，z>0.26+

        const render = new THREE.WebGLRenderer({antialias: true});
        render.setSize(rect.width, rect.height);
        this.container.current.appendChild(render.domElement);


        let cube=new BoxGeometry(0.5,0.5,0.5);
        cube.translate(0,1.5,0);
        let cubeMaterial=new MeshNormalMaterial();
        let mesh=new Mesh(cube,cubeMaterial);
        scene.add(mesh);

        this.testB(scene);


        render.render(scene, camera);

        /**
         * 默认从相机位置看向正前方
         */
        // animateA();
        function animateA() {
            camera.position.z += 0.01;
            if (camera.position.z < 7) {
                requestAnimationFrame(animateA);
            }
            console.log(camera.position.z);
            render.render(scene, camera);
        }

        // animateB();
        // function animateB(){
        //     requestAnimationFrame(animateB);
        //     cube.rotateY(0.01);
        //     cube.rotateX(0.01);
        //     render.render(scene,camera);
        // }


        // this.testA()
    };
    testC = (scene) => {
        // Set up the sphere vars
        const RADIUS = 50;
        const SEGMENTS = 16;
        const RINGS = 16;

// Create a new mesh with
// sphere geometry - we will cover
// the sphereMaterial next!
        // create the sphere's material
        const sphereMaterial =
            new THREE.MeshLambertMaterial(
                {
                    color: 0xCC0000
                });
        const sphere = new THREE.Mesh(
            new THREE.SphereGeometry(
                RADIUS,
                SEGMENTS,
                RINGS),

            sphereMaterial);

// Move the Sphere back in Z so we
// can see it.
        sphere.position.z = -300;

// Finally, add the sphere to the scene.
        scene.add(sphere);

        // create a point light
        const pointLight =
            new THREE.PointLight(0xFFFFFF);

// set its position
        pointLight.position.x = 10;
        pointLight.position.y = 50;
        pointLight.position.z = 130;

// add to the scene
        scene.add(pointLight);
    };
    testB = (scene) => {
        let sphere = new SphereGeometry(50, 16, 16);
        let sphereMaterial = new MeshNormalMaterial();
        let sphereMesh = new Mesh(sphere, sphereMaterial);
        sphereMesh.position.z = -200;

        scene.add(sphereMesh);

        const pointLight = new PointLight(0xff0000);
        pointLight.position.x = 10;
        pointLight.position.y = 10;
        pointLight.position.z = 10;
        scene.add(pointLight);

    };
    testA = () => {
        var camera, scene, renderer;
        var geometry, material, mesh;

        init();
        animate();

        function init() {

            camera = new THREE.PerspectiveCamera(70, window.innerWidth / window.innerHeight, 0.01, 10);
            camera.position.z = 1;

            scene = new THREE.Scene();

            geometry = new THREE.BoxGeometry(0.2, 0.2, 0.2);
            material = new THREE.MeshNormalMaterial();

            mesh = new THREE.Mesh(geometry, material);
            scene.add(mesh);

            renderer = new THREE.WebGLRenderer({antialias: true});
            renderer.setSize(window.innerWidth, window.innerHeight);
            document.body.appendChild(renderer.domElement);

        }

        function animate() {

            requestAnimationFrame(animate);

            mesh.rotation.x += 0.01;
            mesh.rotation.y += 0.02;

            renderer.render(scene, camera);

        }
    };

}

export default connect((state) => {
    return state;
}, (dispatch) => {
    return {dispatch}
})(Home);