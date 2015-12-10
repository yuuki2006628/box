var scene,
    width = window.innerWidth,
    height = window.innerHeight,
    camera,
    fov = 50,
    aspect = width/height,
    near = 1,
    far = 100000,
    renderer;
//ボックスの数
const MAX = 125;
var cubes = [],
    movecube = [];

init();
animation1();

var flag = true;
window.onmousedown = function (ev){
  flag?animation2():animation3();
}

function init(){
  scene = new THREE.Scene();

  camera = new THREE.PerspectiveCamera(fov,aspect,near,far);
  camera.position.set( 1000, 1000, 1000);
  camera.lookAt(new THREE.Vector3(0,0,0));
  renderer = new THREE.WebGLRenderer();
  renderer.setSize( width, height );
  document.body.appendChild( renderer.domElement );

  var directionalLight = new THREE.AmbientLight( 0xffffff);
  directionalLight.position.set( 0, 0, 0 );
  scene.add( directionalLight );

  var geometry = new THREE.CubeGeometry( 5, 5, 5 );
  var material = new THREE.MeshPhongMaterial( { 
      color: 0xffffff ,
       wireframe: true  } );
  var y = -2;
  var z = -2;
  for(var i = 0;i<MAX;i++){
    var x = Math.floor(i%5)-2;
    cubes[i] = new THREE.Mesh( geometry, material );
    cubes[i].position.x = x*5;
    cubes[i].position.y = y*5;
    cubes[i].position.z = z*5;
    movecube[i] = {
      x:Math.random()*40-20,
      y:Math.random()*40-20,
      z:Math.random()*40-20,
      vx:0,
      vy:0,
      vz:0,
      ex_x:x*5,
      ex_y:y*5,
      ex_z:z*5
    }
    if(x==2)y += 1;
    if(y==3){
      y=-2;
      z += 1;
    }
    scene.add(cubes[i]);
    }

}

var _animation1,_animation2,_animation3;

var u = 0;

function animation1 () {
  u += 0.01;
  _animation1 =  requestAnimationFrame(animation1); 
  camera.position.x =  100*Math.cos(u);
  camera.position.z = 100* Math.sin(u);
  camera.position.y = 100* Math.cos(u);
  camera.lookAt(new THREE.Vector3(0,0,0));
  renderer.render( scene, camera );
}

var PI = Math.PI;

function animation2(){
  _animation2 = requestAnimationFrame(animation2); 
  flag = false;
  for(var i =0; i<MAX; i++){

   movecube[i].vx += movecube[i].x / 30000;
   movecube[i].vy += movecube[i].y / 30000;
   movecube[i].vz += movecube[i].z / 30000;

   cubes[i].rotation.x += 0.05*Math.random();
   cubes[i].rotation.y += 0.05*Math.random();
   cubes[i].rotation.z += 0.05*Math.random();
   cubes[i].position.x += movecube[i].vx ;
   cubes[i].position.y += movecube[i].vy ;
   cubes[i].position.z += movecube[i].vz ;


 }
 renderer.render( scene, camera );
}

function animation3(){

  cancelAnimationFrame(_animation2); 
  _animation3 = requestAnimationFrame(animation3);
  var v = 0.01;
  var flag01,flag02,flag03,flag04,flag05,flag06;
  for(var i =0; i<MAX; i++){
    var distancex = v*distanceTo(cubes[i].position.x,movecube[i].ex_x);
    distancex<0.01?flag01=true:flag01=false;

    var distancey = v*distanceTo(cubes[i].position.y,movecube[i].ex_y);
    distancey<0.01?flag02=true:flag02=false;

    var distancez = v*distanceTo(cubes[i].position.z,movecube[i].ex_z );
    distancez<0.01?flag03=true:flag03=false;

    cubes[i].position.x += distancex;
    cubes[i].position.y +=distancey;
    cubes[i].position.z += distancez;
    cubes[i].rotation.x += v*distanceTo(cubes[i].rotation.x,0);
    cubes[i].rotation.x<0.01?flag04=true:flag04=false;

    cubes[i].rotation.y += v*distanceTo(cubes[i].rotation.y,0);
    cubes[i].rotation.y<0.01?flag05=true:flag05=false;

    cubes[i].rotation.z += v*distanceTo(cubes[i].rotation.z,0);
    cubes[i].rotation.z<0.01?flag06=true:flag06=false;

  }
  if(flag01&&flag02&&flag03&&flag04&&flag04&&flag05&&flag06){
    
   cancelAnimationFrame(_animation3); 
   flag = true;
   reset();
 }
 renderer.render( scene, camera );
}

function reset(){
  for(var i =0; i<MAX; i++){
    cubes[i].position.x = movecube[i].ex_x;
    cubes[i].position.y = movecube[i].ex_y;
    cubes[i].position.z = movecube[i].ex_z;
    cubes[i].rotation.x = 0;
    cubes[i].rotation.y = 0;
    cubes[i].rotation.z = 0;
  }
}
function distanceTo(point1,point2){
  return point2-point1;
}
