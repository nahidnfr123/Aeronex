// ------------------------------------------------------
// Scene
// ------------------------------------------------------

const scene = new THREE.Scene();

// ------------------------------------------------------
// Camera
// ------------------------------------------------------

let fieldOfView = 75,
    aspectRatio = window.innerWidth/window.innerHeight,
    near = 0.1,
    far = 400;

const camera = new THREE.PerspectiveCamera( fieldOfView, aspectRatio, near, far );
camera.position.z = 300;

// ------------------------------------------------------
// Lights
// ------------------------------------------------------

const light = new THREE.DirectionalLight( 0xffffff );
light.position.set( 1, 0, 1 ).normalize();
scene.add(light);
 
// ------------------------------------------------------
// Mesh
// ------------------------------------------------------

// jupiter
// ---------
let jupiterRadius = 140,
    jupiterWidthSegments = 50,
    jupiterHeightSegments = 50;

let jupiterMaterial = new THREE.MeshPhongMaterial( {} );
let loader = new THREE.ImageLoader();

loader.load( "https://raw.githubusercontent.com/afonsopacifer/cdn/master/jupitermap.jpg", ( image ) => {
  let texture = new THREE.Texture();
  texture.image = image;
  texture.needsUpdate = true;
  
  jupiterMaterial.map = texture;
  jupiterMaterial.needsUpdate = true;
});

const jupiterGeometry = new THREE.SphereGeometry( jupiterRadius, jupiterWidthSegments, jupiterHeightSegments );

const jupiter = new THREE.Mesh( jupiterGeometry, jupiterMaterial );



// earth
// ---------
let earthRadius = 12,
    earthWidthSegments = 10,
    earthHeightSegments =10;

let earthMaterial = new THREE.MeshPhongMaterial( {} );
let loader2 = new THREE.ImageLoader();

loader2.load( "https://raw.githubusercontent.com/afonsopacifer/cdn/master/earthmap1k.jpg", ( image ) => {
  let texture = new THREE.Texture();
  texture.image = image;
  texture.needsUpdate = true;
  
  earthMaterial.map = texture;
  earthMaterial.needsUpdate = true;
});

const earthGeometry = new THREE.SphereGeometry( earthRadius, earthWidthSegments, earthHeightSegments );

const earth = new THREE.Mesh( earthGeometry, earthMaterial );


scene.add( jupiter, earth );


// ------------------------------------------------------
// render
// ------------------------------------------------------

const renderer = new THREE.WebGLRenderer({antialias: true});
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );

const render = () => {
  
    earth.position.set( -230, 0, 0 );

  // ------------------------------------------------------
  // animation
  // ------------------------------------------------------
  
  requestAnimationFrame( render );
  jupiter.rotation.y += 0.002;
  earth.rotation.y += 0.025;
  
  renderer.render( scene, camera );
  
};

render();