

(function () {
  'use strict';

  
  const PI2 = Math.PI * 2;
  const lerp = (a, b, t) => a + (b - a) * t;
  const clamp = (v, lo, hi) => Math.min(Math.max(v, lo), hi);

  
  const RED   = 0xff1a1a;
  const WHITE = 0xfafafa;
  const DARK  = 0x1a0505;

  

  const canvas = document.getElementById('hero-canvas');
  if (!canvas) return;

  const heroSection = canvas.parentElement;
  let W = heroSection.clientWidth;
  let H = heroSection.clientHeight;

  const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.setSize(W, H);
  renderer.setClearColor(0x000000, 0);

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(60, W / H, 0.1, 200);
  camera.position.set(0, 0, 30);

  
  const ambientLight = new THREE.AmbientLight(WHITE, 0.4);
  scene.add(ambientLight);

  const redLight = new THREE.PointLight(RED, 3, 60);
  redLight.position.set(0, 5, 20);
  scene.add(redLight);

  const rimLight = new THREE.PointLight(WHITE, 1.5, 80);
  rimLight.position.set(-20, -10, 10);
  scene.add(rimLight);

  

  const torusMat = new THREE.MeshStandardMaterial({
    color: 0x2a2a2a,
    metalness: 0.9,
    roughness: 0.2,
    emissive: RED,
    emissiveIntensity: 0.08,
    wireframe: false,
  });

  const torusWireMat = new THREE.MeshStandardMaterial({
    color: RED,
    metalness: 0.8,
    roughness: 0.3,
    emissive: RED,
    emissiveIntensity: 0.5,
    wireframe: true,
  });

  
  const torusData = [
    [7.0, 0.4, -18,  4, -10,  1.0,  0.003],
    [5.5, 0.3,  16, -3, -15,  0.9, -0.004],
    [4.0, 0.25, -8, -8, -20,  0.8,  0.005],
    [9.0, 0.5,  10,  8, -25,  1.2, -0.002],
    [3.0, 0.2,  -2, 10, -18,  0.7,  0.006],
  ];

  const tori = torusData.map(([r, tube, x, y, z, s, speed], i) => {
    const geo = new THREE.TorusGeometry(r, tube, 16, 80);
    const mat = i % 2 === 0 ? torusMat.clone() : torusWireMat.clone();
    const mesh = new THREE.Mesh(geo, mat);
    mesh.position.set(x, y, z);
    mesh.scale.setScalar(s);
    mesh.rotation.x = Math.random() * PI2;
    mesh.rotation.y = Math.random() * PI2;
    mesh.userData.speed = speed;
    mesh.userData.floatOffset = Math.random() * PI2;
    mesh.userData.floatSpeed = 0.4 + Math.random() * 0.3;
    scene.add(mesh);
    return mesh;
  });

  

  function createGear(radius, teeth, depth) {
    const shape = new THREE.Shape();
    const teethOuter = radius;
    const teethInner = radius * 0.72;
    const angleStep = PI2 / teeth;

    for (let i = 0; i < teeth; i++) {
      const a0 = i * angleStep;
      const a1 = a0 + angleStep * 0.3;
      const a2 = a0 + angleStep * 0.7;
      const a3 = a0 + angleStep;

      const fn = (a, r) => ({ x: Math.cos(a) * r, y: Math.sin(a) * r });

      const p0 = fn(a0, teethInner);
      const p1 = fn(a1, teethOuter);
      const p2 = fn(a2, teethOuter);
      const p3 = fn(a3, teethInner);

      if (i === 0) shape.moveTo(p0.x, p0.y);
      else shape.lineTo(p0.x, p0.y);
      shape.lineTo(p1.x, p1.y);
      shape.lineTo(p2.x, p2.y);
      shape.lineTo(p3.x, p3.y);
    }
    shape.closePath();

    const hole = new THREE.Path();
    const hr = radius * 0.35;
    hole.absarc(0, 0, hr, 0, PI2, true);
    shape.holes.push(hole);

    const extrudeSettings = { depth, bevelEnabled: true, bevelThickness: 0.05, bevelSize: 0.05, bevelSegments: 2 };
    return new THREE.ExtrudeGeometry(shape, extrudeSettings);
  }

  const gearMat = new THREE.MeshStandardMaterial({
    color: 0x1e1e1e,
    metalness: 0.95,
    roughness: 0.15,
    emissive: RED,
    emissiveIntensity: 0.05,
  });

  const gearData = [
    [3.5, 12, 0.3,  14,  6, -22,  1,  0.007],
    [2.2,  8, 0.2, -14, -5, -18,  1, -0.005],
    [4.8, 16, 0.4,   0, -12, -30, 1,  0.003],
  ];

  const gears = gearData.map(([r, t, d, x, y, z, s, speed]) => {
    const geo = createGear(r, t, d);
    geo.center();
    const mesh = new THREE.Mesh(geo, gearMat.clone());
    mesh.position.set(x, y, z);
    mesh.scale.setScalar(s);
    mesh.userData.speed = speed;
    mesh.userData.floatOffset = Math.random() * PI2;
    scene.add(mesh);
    return mesh;
  });

  

  const PARTICLE_COUNT = 400;
  const positions = new Float32Array(PARTICLE_COUNT * 3);
  const colors    = new Float32Array(PARTICLE_COUNT * 3);
  const sizes     = new Float32Array(PARTICLE_COUNT);
  const speeds    = new Float32Array(PARTICLE_COUNT);

  const colorA = new THREE.Color(RED);
  const colorB = new THREE.Color(0x888888);

  for (let i = 0; i < PARTICLE_COUNT; i++) {
    const i3 = i * 3;
    positions[i3]     = (Math.random() - 0.5) * 80;
    positions[i3 + 1] = (Math.random() - 0.5) * 60;
    positions[i3 + 2] = (Math.random() - 0.5) * 40 - 10;

    const t = Math.random();
    const col = colorA.clone().lerp(colorB, t > 0.7 ? 1 : 0);
    colors[i3]     = col.r;
    colors[i3 + 1] = col.g;
    colors[i3 + 2] = col.b;

    sizes[i]  = 0.05 + Math.random() * 0.15;
    speeds[i] = 0.01 + Math.random() * 0.03;
  }

  const particleGeo = new THREE.BufferGeometry();
  particleGeo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
  particleGeo.setAttribute('color', new THREE.BufferAttribute(colors, 3));
  particleGeo.setAttribute('size', new THREE.BufferAttribute(sizes, 1));

  const particleMat = new THREE.PointsMaterial({
    size: 0.25,
    vertexColors: true,
    transparent: true,
    opacity: 0.7,
    sizeAttenuation: true,
    blending: THREE.AdditiveBlending,
    depthWrite: false,
  });

  const particles = new THREE.Points(particleGeo, particleMat);
  scene.add(particles);

  

  const lineCount = 30;
  const lineGroup = new THREE.Group();
  const lineMat = new THREE.LineBasicMaterial({
    color: RED,
    transparent: true,
    opacity: 0.15,
    blending: THREE.AdditiveBlending,
    depthWrite: false,
  });

  for (let i = 0; i < lineCount; i++) {
    const points = [];
    const x = (Math.random() - 0.5) * 60;
    const y = (Math.random() - 0.5) * 40;
    const z = -20 - Math.random() * 15;
    const len = 2 + Math.random() * 5;
    points.push(new THREE.Vector3(x, y, z));
    points.push(new THREE.Vector3(x + len, y, z));
    const geo = new THREE.BufferGeometry().setFromPoints(points);
    const line = new THREE.Line(geo, lineMat.clone());
    line.userData.speed  = 0.08 + Math.random() * 0.15;
    line.userData.xReset = -35;
    lineGroup.add(line);
  }
  scene.add(lineGroup);

  

  let mouse = { x: 0, y: 0 };
  let targetCam = { x: 0, y: 0 };

  document.addEventListener('mousemove', (e) => {
    mouse.x = (e.clientX / window.innerWidth  - 0.5) * 2;
    mouse.y = (e.clientY / window.innerHeight - 0.5) * 2;
  });

  

  function animateCounters() {
    const counters = document.querySelectorAll('.hero-stat-number[data-target]');
    counters.forEach(el => {
      const target = parseInt(el.dataset.target, 10);
      let current = 0;
      const duration = 2000;
      const step = target / (duration / 16);

      const update = () => {
        current = Math.min(current + step, target);
        el.textContent = Math.floor(current) + (target >= 100 ? '' : target > 10 ? '' : '');
        if (current < target) requestAnimationFrame(update);
        else el.textContent = target + (target === 500 ? '+' : target === 98 ? '%' : '+');
      };

      setTimeout(update, 1500);
    });
  }
  animateCounters();

  

  const clock = new THREE.Clock();
  let frameId;

  function animate() {
    frameId = requestAnimationFrame(animate);
    const t = clock.getElapsedTime();

    
    targetCam.x = lerp(targetCam.x, mouse.x * 3,  0.04);
    targetCam.y = lerp(targetCam.y, mouse.y * -2, 0.04);
    camera.position.x = lerp(camera.position.x, targetCam.x,  0.06);
    camera.position.y = lerp(camera.position.y, targetCam.y,  0.06);
    camera.lookAt(scene.position);

    
    tori.forEach((mesh) => {
      mesh.rotation.x += mesh.userData.speed * 0.7;
      mesh.rotation.y += mesh.userData.speed;
      const floatY = Math.sin(t * mesh.userData.floatSpeed + mesh.userData.floatOffset) * 0.8;
      mesh.position.y += (floatY - mesh.userData.lastFloatY || 0) * 0.5;
      mesh.userData.lastFloatY = floatY;
    });

    
    gears.forEach((mesh) => {
      mesh.rotation.z += mesh.userData.speed;
      const floatY = Math.sin(t * 0.5 + mesh.userData.floatOffset) * 1.2;
      mesh.position.y += (floatY - (mesh.userData.lastFloatY || 0));
      mesh.userData.lastFloatY = floatY;
    });

    
    const pos = particleGeo.attributes.position.array;
    for (let i = 0; i < PARTICLE_COUNT; i++) {
      pos[i * 3 + 1] += speeds[i] * 0.3;
      if (pos[i * 3 + 1] > 35) {
        pos[i * 3 + 1] = -35;
        pos[i * 3]     = (Math.random() - 0.5) * 80;
      }
    }
    particleGeo.attributes.position.needsUpdate = true;

    
    lineGroup.children.forEach(line => {
      line.position.x += line.userData.speed;
      if (line.position.x > 40) {
        line.position.x = -40;
      }
    });

    
    redLight.intensity = 2.5 + Math.sin(t * 1.5) * 0.8;

    renderer.render(scene, camera);
  }

  animate();

  

  const onResize = () => {
    W = heroSection.clientWidth;
    H = heroSection.clientHeight;
    camera.aspect = W / H;
    camera.updateProjectionMatrix();
    renderer.setSize(W, H);
  };
  window.addEventListener('resize', onResize);

  

  const heroContent = document.getElementById('hero-content');
  document.addEventListener('mousemove', (e) => {
    if (!heroContent) return;
    const mx = (e.clientX / window.innerWidth  - 0.5) * 12;
    const my = (e.clientY / window.innerHeight - 0.5) * 6;
    heroContent.style.transform = `translate(${mx * 0.3}px, ${my * 0.3}px)`;
  });

  

  window.addEventListener('beforeunload', () => {
    cancelAnimationFrame(frameId);
    renderer.dispose();
  });

})();
