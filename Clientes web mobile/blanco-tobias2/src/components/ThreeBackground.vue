<template>
  <div class="fixed inset-0 pointer-events-none" style="z-index: 0;">
    <canvas ref="canvasEl" style="width: 100%; height: 100%;"></canvas>
  </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'
import * as THREE from 'three'

const canvasEl = ref(null)
let scene
let camera
let renderer
let particles
let lines
let orb
let animationId

onMounted(() => {
  init()
  animate()
  window.addEventListener('resize', onWindowResize)
})

onBeforeUnmount(() => {
  window.removeEventListener('resize', onWindowResize)
  if (animationId) cancelAnimationFrame(animationId)
  if (renderer) renderer.dispose()
})

function init() {
  const canvas = canvasEl.value
  if (!canvas) return

  scene = new THREE.Scene()

  camera = new THREE.PerspectiveCamera(38, window.innerWidth / window.innerHeight, 0.1, 1000)
  camera.position.set(0, 0, 8)

  renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true })
  renderer.setSize(window.innerWidth, window.innerHeight)
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
  renderer.setClearColor(0x000000, 0)
  renderer.toneMapping = THREE.ACESFilmicToneMapping
  renderer.outputColorSpace = THREE.SRGBColorSpace

  const ambientLight = new THREE.AmbientLight(0xffffff, 0.4)
  scene.add(ambientLight)

  const pointLight = new THREE.PointLight(0x7c3aed, 1.3, 18)
  pointLight.position.set(2, 2.5, 5)
  scene.add(pointLight)

  const particleCount = 120
  const positions = new Float32Array(particleCount * 3)
  const colors = new Float32Array(particleCount * 3)

  for (let i = 0; i < particleCount; i++) {
    positions[i * 3] = (Math.random() - 0.5) * 14
    positions[i * 3 + 1] = (Math.random() - 0.5) * 8
    positions[i * 3 + 2] = (Math.random() - 0.5) * 6

    const color = new THREE.Color().setHSL(0.64 + Math.random() * 0.06, 0.7, 0.72)
    colors[i * 3] = color.r
    colors[i * 3 + 1] = color.g
    colors[i * 3 + 2] = color.b
  }

  const particleGeometry = new THREE.BufferGeometry()
  particleGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3))
  particleGeometry.setAttribute('color', new THREE.BufferAttribute(colors, 3))

  const particleMaterial = new THREE.PointsMaterial({
    size: 0.045,
    vertexColors: true,
    transparent: true,
    opacity: 0.68,
    depthWrite: false
  })

  particles = new THREE.Points(particleGeometry, particleMaterial)
  scene.add(particles)

  const lineVertices = new Float32Array(36 * 3 * 2)
  for (let i = 0; i < lineVertices.length; i += 3) {
    lineVertices[i] = (Math.random() - 0.5) * 12
    lineVertices[i + 1] = (Math.random() - 0.5) * 8
    lineVertices[i + 2] = (Math.random() - 0.5) * 6
  }

  const lineGeometry = new THREE.BufferGeometry()
  lineGeometry.setAttribute('position', new THREE.BufferAttribute(lineVertices, 3))

  const lineMaterial = new THREE.LineBasicMaterial({
    color: 0x22d3ee,
    transparent: true,
    opacity: 0.12
  })

  lines = new THREE.LineSegments(lineGeometry, lineMaterial)
  scene.add(lines)

  const orbGeometry = new THREE.IcosahedronGeometry(2.4, 3)
  const orbMaterial = new THREE.MeshPhysicalMaterial({
    color: 0x7c3aed,
    transparent: true,
    opacity: 0.08,
    roughness: 0.15,
    metalness: 0.75,
    transmission: 0.92,
    clearcoat: 0.7,
    clearcoatRoughness: 0.1
  })

  orb = new THREE.Mesh(orbGeometry, orbMaterial)
  orb.position.set(0, 0, -2)
  scene.add(orb)
}

function onWindowResize() {
  if (!camera || !renderer) return
  camera.aspect = window.innerWidth / window.innerHeight
  camera.updateProjectionMatrix()
  renderer.setSize(window.innerWidth, window.innerHeight)
}

function animate() {
  animationId = requestAnimationFrame(animate)

  if (particles) {
    particles.rotation.y += 0.00035
    particles.rotation.x += 0.00015
  }

  if (lines) {
    lines.rotation.z += 0.00005
  }

  if (orb) {
    orb.rotation.y += 0.00018
    orb.rotation.x += 0.00008
  }

  if (renderer && scene && camera) {
    renderer.render(scene, camera)
  }
}
</script>
