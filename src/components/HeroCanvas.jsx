import { useEffect, useRef } from "react";
import * as THREE from "three";

function dotTexture() {
  const c = document.createElement("canvas");
  c.width = c.height = 64;
  const g = c.getContext("2d");
  const grd = g.createRadialGradient(32, 32, 0, 32, 32, 32);
  grd.addColorStop(0, "rgba(255,255,255,1)");
  grd.addColorStop(0.45, "rgba(255,255,255,0.9)");
  grd.addColorStop(1, "rgba(255,255,255,0)");
  g.fillStyle = grd;
  g.fillRect(0, 0, 64, 64);
  return new THREE.CanvasTexture(c);
}

/**
 * Latar 3D hero: jaringan partikel emas-cokelat + bentuk wireframe melayang
 * yang bergeser mengikuti mouse. Berhenti saat di luar layar.
 */
export default function HeroCanvas() {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    let renderer;
    try {
      renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true, powerPreference: "low-power" });
    } catch (err) {
      return; // WebGL tidak tersedia: hero tetap tampil tanpa 3D
    }
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.5));
    renderer.setClearColor(0x000000, 0);
    el.appendChild(renderer.domElement);

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(55, 1, 0.1, 100);
    const group = new THREE.Group();
    scene.add(group);

    // ---- partikel + garis penghubung ----
    const N = window.innerWidth < 768 ? 60 : 120;
    const LIM = { x: 15, y: 8, z: 6 };
    const THRESH2 = 3.4 * 3.4;
    const pos = new Float32Array(N * 3);
    const vel = new Float32Array(N * 3);
    for (let i = 0; i < N; i++) {
      pos[i * 3] = (Math.random() * 2 - 1) * LIM.x;
      pos[i * 3 + 1] = (Math.random() * 2 - 1) * LIM.y;
      pos[i * 3 + 2] = (Math.random() * 2 - 1) * LIM.z;
      vel[i * 3] = (Math.random() - 0.5) * 0.014;
      vel[i * 3 + 1] = (Math.random() - 0.5) * 0.014;
      vel[i * 3 + 2] = (Math.random() - 0.5) * 0.008;
    }
    const pGeo = new THREE.BufferGeometry();
    pGeo.setAttribute("position", new THREE.BufferAttribute(pos, 3));
    const tex = dotTexture();
    const pMat = new THREE.PointsMaterial({
      color: 0xb08968, size: 0.32, map: tex, transparent: true,
      opacity: 0.85, depthWrite: false, sizeAttenuation: true,
    });
    group.add(new THREE.Points(pGeo, pMat));

    const MAXSEG = N * 8;
    const lPos = new Float32Array(MAXSEG * 6);
    const lGeo = new THREE.BufferGeometry();
    lGeo.setAttribute("position", new THREE.BufferAttribute(lPos, 3));
    lGeo.setDrawRange(0, 0);
    const lMat = new THREE.LineBasicMaterial({ color: 0xd0ac94, transparent: true, opacity: 0.5 });
    group.add(new THREE.LineSegments(lGeo, lMat));

    // ---- bentuk wireframe emas ----
    const wire = new THREE.MeshBasicMaterial({ color: 0xce9745, wireframe: true, transparent: true, opacity: 0.5 });
    const geos = [
      new THREE.IcosahedronGeometry(1.5, 1),
      new THREE.TorusGeometry(1.1, 0.32, 12, 36),
      new THREE.OctahedronGeometry(1.1, 0),
    ];
    const spots = [[1.5, 5.6, -4], [10.5, -5, -2], [-5, -5.6, -1]];
    const shapes = geos.map((g, i) => {
      const m = new THREE.Mesh(g, wire);
      m.position.set(...spots[i]);
      group.add(m);
      return m;
    });

    const update = () => {
      for (let i = 0; i < N; i++) {
        for (let k = 0; k < 3; k++) {
          const idx = i * 3 + k;
          pos[idx] += vel[idx];
          const lim = k === 0 ? LIM.x : k === 1 ? LIM.y : LIM.z;
          if (pos[idx] > lim || pos[idx] < -lim) vel[idx] *= -1;
        }
      }
      let n = 0;
      for (let i = 0; i < N && n < MAXSEG; i++) {
        for (let j = i + 1; j < N && n < MAXSEG; j++) {
          const dx = pos[i * 3] - pos[j * 3];
          const dy = pos[i * 3 + 1] - pos[j * 3 + 1];
          const dz = pos[i * 3 + 2] - pos[j * 3 + 2];
          if (dx * dx + dy * dy + dz * dz < THRESH2) {
            lPos.set([pos[i * 3], pos[i * 3 + 1], pos[i * 3 + 2], pos[j * 3], pos[j * 3 + 1], pos[j * 3 + 2]], n * 6);
            n++;
          }
        }
      }
      pGeo.attributes.position.needsUpdate = true;
      lGeo.attributes.position.needsUpdate = true;
      lGeo.setDrawRange(0, n * 2);
      shapes.forEach((s, i) => {
        s.rotation.x += 0.004 + i * 0.001;
        s.rotation.y += 0.006;
      });
    };

    // ---- interaksi mouse ----
    let mx = 0, my = 0;
    const onMove = (e) => {
      mx = (e.clientX / window.innerWidth) * 2 - 1;
      my = (e.clientY / window.innerHeight) * 2 - 1;
    };
    window.addEventListener("pointermove", onMove, { passive: true });

    const render = () => renderer.render(scene, camera);
    const resize = () => {
      const w = el.clientWidth, h = el.clientHeight;
      if (!w || !h) return;
      renderer.setSize(w, h, false);
      camera.aspect = w / h;
      camera.position.z = camera.aspect < 1.1 ? 22 : 14;
      camera.updateProjectionMatrix();
      render();
    };
    const ro = new ResizeObserver(resize);
    ro.observe(el);
    resize();

    let visible = true;
    const io = new IntersectionObserver(([entry]) => (visible = entry.isIntersecting));
    io.observe(el);

    let raf = 0;
    const loop = () => {
      raf = requestAnimationFrame(loop);
      if (!visible) return;
      group.rotation.y += (mx * 0.3 - group.rotation.y) * 0.04;
      group.rotation.x += (-my * 0.18 - group.rotation.x) * 0.04;
      update();
      render();
    };
    if (!reduce) loop();

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      io.disconnect();
      window.removeEventListener("pointermove", onMove);
      [pGeo, lGeo, ...geos].forEach((g) => g.dispose());
      [pMat, lMat, wire].forEach((m) => m.dispose());
      tex.dispose();
      renderer.dispose();
      if (renderer.domElement.parentNode === el) el.removeChild(renderer.domElement);
    };
  }, []);

  return <div className="hero-canvas" ref={ref} aria-hidden="true"></div>;
}
