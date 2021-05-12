import {
  ArcRotateCamera, Color3, CubeTexture, Engine, HemisphericLight, Light, Mesh,
  MeshBuilder, Scene, StandardMaterial, Texture, Vector3,
} from 'babylonjs';

export default class App {
  private engine: Engine;
  private scene: Scene;
  private camera: ArcRotateCamera;
  private light: Light;

  constructor(private canvas: HTMLCanvasElement) {
    this.engine = new Engine(this.canvas, true);
  }

  /**
   * Creates the BABYLONJS Scene
   */
  createScene(): void {
    this.scene = new Scene(this.engine);
    this.camera = new ArcRotateCamera(
      "Camera",
      0,
      Math.PI / 3,
      8,
      Vector3.Zero(),
      this.scene
    );
    this.camera.attachControl(this.canvas, true);

    this.light = new HemisphericLight(
      "Light",
      new Vector3(0, 1, 0),
      this.scene
    );

    let skybox = Mesh.CreateBox(name, 1000.0, this.scene);
    let skyboxMaterial = new StandardMaterial(name, this.scene);
    skyboxMaterial.backFaceCulling = false;
    skyboxMaterial.reflectionTexture = new CubeTexture(
      "./assets/TropicalSunnyDay",
      this.scene
    );
    skyboxMaterial.reflectionTexture.coordinatesMode = Texture.SKYBOX_MODE;
    skyboxMaterial.diffuseColor = new Color3(0, 0, 0);
    skyboxMaterial.specularColor = new Color3(0, 0, 0);
    skyboxMaterial.disableLighting = true;
    skybox.material = skyboxMaterial;

    let mat = this.createMaterial();

    let box = MeshBuilder.CreateBox("Box", { size: 2 }, this.scene);
    box.position.z = -2;
    box.material = mat;

    let polyhedron = MeshBuilder.CreatePolyhedron(
      "Shape",
      { type: 2, size: 1 },
      this.scene
    );
    polyhedron.position.z = 2;
    polyhedron.material = mat;
  }

  /**
   * TODO: Implement this method to return a `ShaderMaterial` as described in
   * README.md
   */
  createMaterial() {
    let mat = new StandardMaterial("Takehome Material", this.scene);
    return mat;
  }

  /**
   * Starts the render loop
   */
  start(): void {
    this.engine.runRenderLoop(() => {
      this.scene.render();
    });

    window.addEventListener("resize", () => {
      this.engine.resize();
    });
  }
}
