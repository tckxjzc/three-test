import React, {Component} from 'react';
import * as THREE from 'three';
import {
    AmbientLight, CatmullRomCurve3,
    CubicBezierCurve3,
    CurvePath,
    Line,
    Mesh, MeshPhongMaterial, PointLight,
    PointsMaterial,
    Scene,
    TubeGeometry,
    Vector3,
    WebGLRenderer
} from 'three';



type Props = {};

class Curve extends Component<Props> {
    /**
     * lifecycle
     */
    mounted = false;

    constructor(props) {
        super(props);
    }

    componentDidMount() {
        this.mounted = true;
        this.start();
    }

    componentWillUnmount() {
        this.mounted = false;
    }

    render() {
        return <React.Fragment>
            <div ref={this.container}>

            </div>
        </React.Fragment>;
    }

    /**
     *properties
     */
    size = 480;
    container = React.createRef<HTMLDivElement>();
    /**
     *method
     */
    start = () => {
        let render = new WebGLRenderer({antialias: true});
        render.setSize(this.size,this.size);
        this.container.current.appendChild(render.domElement);
        let scene = new Scene();
        let axesHelper = new THREE.AxesHelper(300);
        scene.add(axesHelper);
        let pointLight = new PointLight(0xffffff);
        pointLight.position.set(400,300,200);
        scene.add(pointLight);
        let ambientLight = new AmbientLight(0xdddddd);
        scene.add(ambientLight);


        let camera = new THREE.PerspectiveCamera(50,1,0.1,1000);


        camera.lookAt(0,0,0);
        camera.position.set(9,9,9);

        let romCurve3 = new CatmullRomCurve3([
            new Vector3(-2,0,1),
            new Vector3(-1,2,2),
            new Vector3(1,4,3),
        ]);


        let bezierCurve3 = new CubicBezierCurve3(
            new Vector3(1, 0, 0),
            new Vector3(-1, 0, 0),
            new Vector3(3, 2, 3),
            new Vector3(3, -2, 3),
        );
        let geometry = new THREE.Geometry();
        geometry.setFromPoints(bezierCurve3.getPoints(100));
        let material = new PointsMaterial({color: 0xff0000});
        let mesh = new Line(geometry,material);
        scene.add(mesh);
        let curvePath = new CurvePath();
        // curvePath.curves.push(bezierCurve3);
        curvePath.curves.push(romCurve3);

        // @ts-ignore
        let tubeGeometry = new TubeGeometry(curvePath,50,0.5,50,false);
        let phongMaterial = new MeshPhongMaterial({color:0xee0000,side:THREE.DoubleSide});
        let mesh1 = new Mesh(tubeGeometry,phongMaterial);
        scene.add(mesh1);




        let box=new THREE.BoxGeometry(1,1,1);
        let normalMaterial = new THREE.MeshNormalMaterial();
        let mesh2 = new Mesh(box,normalMaterial);
        scene.add(mesh2);


        function r(){
            requestAnimationFrame(r);
            render.render(scene,camera);
        }
        r();
        document.body.onclick=()=>{
            console.log(camera)
            console.log(camera.position)
        };
        let controls = new THREE.OrbitControls(camera);

    };

}


export default Curve;