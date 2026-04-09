let scene = new THREE.Scene()

let camera = new THREE.PerspectiveCamera(
75,
window.innerWidth/window.innerHeight,
1,
1100
)

let renderer = new THREE.WebGLRenderer()

renderer.setSize(window.innerWidth,window.innerHeight)

document.getElementById("container").appendChild(renderer.domElement)

let texture = new THREE.TextureLoader().load("assets/panorama.jpg")

let geometry = new THREE.SphereGeometry(500,60,40)

geometry.scale(-1,1,1)

let material = new THREE.MeshBasicMaterial({map:texture})

let mesh = new THREE.Mesh(geometry,material)

scene.add(mesh)

let lon=0
let lat=0

let isUserInteracting=false
let onPointerDownLon=0
let onPointerDownLat=0
let onPointerDownX=0
let onPointerDownY=0

document.addEventListener("pointerdown",function(event){

isUserInteracting=true

onPointerDownX=event.clientX
onPointerDownY=event.clientY

onPointerDownLon=lon
onPointerDownLat=lat

})

document.addEventListener("pointermove",function(event){

if(isUserInteracting){

lon=(onPointerDownX-event.clientX)*0.1+onPointerDownLon
lat=(event.clientY-onPointerDownY)*0.1+onPointerDownLat

}

})

document.addEventListener("pointerup",function(){

isUserInteracting=false

})

function animate(){

requestAnimationFrame(animate)

lat=Math.max(-85,Math.min(85,lat))

let phi=THREE.MathUtils.degToRad(90-lat)
let theta=THREE.MathUtils.degToRad(lon)

camera.target=new THREE.Vector3()

camera.target.x=500*Math.sin(phi)*Math.cos(theta)
camera.target.y=500*Math.cos(phi)
camera.target.z=500*Math.sin(phi)*Math.sin(theta)

camera.lookAt(camera.target)

renderer.render(scene,camera)

}

animate()

document.getElementById("upload").addEventListener("change",function(e){

let file=e.target.files[0]

if(file){

let url=URL.createObjectURL(file)

let loader=new THREE.TextureLoader()

loader.load(url,function(tex){

mesh.material.map=tex
mesh.material.needsUpdate=true

})

}

})
