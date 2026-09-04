// ============================================================
// Home Page
// ============================================================

import { courses, instructors, categories, stats, benefits, testimonials, getFeaturedCourses, getInstructorById } from '../data.js'
import { courseCardHTML, showToast } from '../../main.js'

export function renderHome(container) {
  const featured = getFeaturedCourses()
  const user = getCurrentUserSafe()

  container.innerHTML = `
    <!-- Hero -->
    <section class="hero-standalone" id="hero">
      <div class="hero-content">
        <span class="hero-label">Yes Skill Hub — Learn what moves you forward</span>
        <h1 class="hero-heading">
          <span class="word"><span>Master</span></span>
          <span class="word"><span>skills</span></span>
          <span class="word"><span>that</span></span>
          <br>
          <span class="word"><span class="accent">move</span></span>
          <span class="word"><span class="accent">you</span></span>
          <span class="word"><span class="accent">forward</span></span>
        </h1>
        <p class="hero-tagline">Practical, project-based courses taught by industry experts. Build real things, earn certificates, and advance your career — at your own pace.</p>
        <div class="hero-ctas">
          <a href="#/courses" class="button button-large">Explore Courses <span>→</span></a>
          <a href="#/signup" class="button button-outline button-large">Start Learning</a>
        </div>
      </div>
      <div class="scroll-indicator">
        <span>Scroll</span>
        <div class="line"></div>
      </div>
    </section>

    <!-- Canvas scroll section -->
    <section class="canvas-section" id="canvas-section">
      <canvas id="hero-canvas"></canvas>
      <div class="canvas-overlay-text">
        <div class="inner">
          <h2>Learning that feels cinematic</h2>
          <p>Scroll to explore the experience</p>
        </div>
      </div>
      <div class="canvas-progress"><i id="canvas-progress-bar"></i></div>
    </section>

    <!-- Marketing section -->
    <section class="section section-alt">
      <div class="container">
        <div style="display:grid;grid-template-columns:1fr 1fr;gap:80px;align-items:center;">
          <div data-anim="slide-left">
            <span class="section-label">001 / Why Yes Skill Hub</span>
            <h2 class="section-heading">Education should feel like building, not watching.</h2>
            <p class="section-sub" style="margin-bottom:32px;">We built Yes Skill Hub for people who learn by doing. Every course is project-based, every instructor ships products for a living, and every certificate means you built something real.</p>
            <a href="#/courses" class="button">Browse all courses <span>→</span></a>
          </div>
          <div data-anim="slide-right" style="display:grid;grid-template-columns:1fr 1fr;gap:20px;">
            <div style="padding:32px;border-radius:var(--radius-lg);background:#fff;border:1px solid var(--border);">
              <div style="font-size:36px;font-weight:800;font-family:var(--font-display);background:var(--grad-primary);-webkit-background-clip:text;-webkit-text-fill-color:transparent;">${courses.length}+</div>
              <div style="font-size:14px;color:var(--text-muted);margin-top:4px;">Expert-led courses</div>
            </div>
            <div style="padding:32px;border-radius:var(--radius-lg);background:#fff;border:1px solid var(--border);">
              <div style="font-size:36px;font-weight:800;font-family:var(--font-display);background:var(--grad-cyan);-webkit-background-clip:text;-webkit-text-fill-color:transparent;">${instructors.length}</div>
              <div style="font-size:14px;color:var(--text-muted);margin-top:4px;">Industry instructors</div>
            </div>
            <div style="padding:32px;border-radius:var(--radius-lg);background:#fff;border:1px solid var(--border);">
              <div style="font-size:36px;font-weight:800;font-family:var(--font-display);background:var(--grad-purple);-webkit-background-clip:text;-webkit-text-fill-color:transparent;">47K+</div>
              <div style="font-size:14px;color:var(--text-muted);margin-top:4px;">Active students</div>
            </div>
            <div style="padding:32px;border-radius:var(--radius-lg);background:#fff;border:1px solid var(--border);">
              <div style="font-size:36px;font-weight:800;font-family:var(--font-display);background:var(--grad-primary);-webkit-background-clip:text;-webkit-text-fill-color:transparent;">92%</div>
              <div style="font-size:14px;color:var(--text-muted);margin-top:4px;">Completion rate</div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Featured courses carousel -->
    <section class="featured-section">
      <div class="container">
        <div class="featured-header">
          <div class="left" data-anim="fade-up">
            <span class="section-label">002 / Featured Courses</span>
            <h2 class="section-heading">Hand-picked courses to get you started</h2>
          </div>
          <a href="#/courses" class="button button-outline" data-anim="fade-up">View all courses →</a>
        </div>
      </div>
      <div class="container">
        <div class="course-carousel" id="featured-carousel">
          <div class="course-carousel-track" id="featured-track">
            ${featured.map(c => courseCardHTML(c)).join('')}
          </div>
          <div class="carousel-nav">
            <button class="carousel-btn" id="carousel-prev" aria-label="Previous">←</button>
            <button class="carousel-btn" id="carousel-next" aria-label="Next">→</button>
          </div>
        </div>
      </div>
    </section>

    <!-- Categories -->
    <section class="categories-section">
      <div class="container">
        <div style="text-align:center;margin-bottom:56px;" data-anim="fade-up">
          <span class="section-label">003 / Categories</span>
          <h2 class="section-heading">Find your path</h2>
          <p class="section-sub" style="margin:0 auto;">Explore courses by category and find the right track for your goals.</p>
        </div>
        <div class="categories-grid" data-anim="stagger-up" data-stagger="true">
          ${categories.map(cat => `
            <a href="#/courses?cat=${cat.id}" class="category-card">
              <div class="category-icon">${cat.icon}</div>
              <div>
                <h3>${cat.name}</h3>
                <p>${cat.count} course${cat.count > 1 ? 's' : ''}</p>
              </div>
            </a>
          `).join('')}
        </div>
      </div>
    </section>

    <!-- Benefits -->
    <section class="benefits-section">
      <div class="container">
        <div style="text-align:center;margin-bottom:16px;" data-anim="scale-up">
          <span class="section-label">004 / Why Learn Here</span>
          <h2 class="section-heading">Built for people who learn by doing</h2>
        </div>
        <div class="benefits-grid" data-anim="stagger-up" data-stagger="true">
          ${benefits.map(b => `
            <div class="benefit-item">
              <div class="benefit-icon">${b.icon}</div>
              <h3>${b.title}</h3>
              <p>${b.description}</p>
            </div>
          `).join('')}
        </div>
      </div>
    </section>

    <!-- Stats section (dark overlay) -->
    <section class="stats-section">
      <div class="stats-grid" data-anim="stagger-up" data-stagger="true">
        ${stats.map(s => `
          <div class="stat">
            <div>
              <span class="stat-number" data-counter="${s.value}" data-decimals="0">0</span>
              <span class="stat-suffix">${s.suffix}</span>
            </div>
            <span class="stat-label">${s.label}</span>
          </div>
        `).join('')}
      </div>
    </section>

    <!-- Testimonials -->
    <section class="testimonials-section">
      <div class="container">
        <div style="text-align:center;margin-bottom:56px;" data-anim="rotate-in">
          <span class="section-label">005 / Student Stories</span>
          <h2 class="section-heading">Learners who changed their trajectory</h2>
        </div>
        <div class="testimonials-grid" data-anim="stagger-up" data-stagger="true">
          ${testimonials.map(t => `
            <div class="testimonial-card">
              <div class="testimonial-stars">${'★'.repeat(t.rating)}</div>
              <p class="testimonial-text">"${t.text}"</p>
              <div class="testimonial-author">
                <img src="${t.studentPhoto}" alt="${t.studentName}" loading="lazy" />
                <div>
                  <div class="name">${t.studentName}</div>
                  <div class="course">${t.course}</div>
                </div>
              </div>
            </div>
          `).join('')}
        </div>
      </div>
    </section>

    <!-- Instructor promo -->
    <section class="instructor-promo">
      <div class="container">
        <div class="instructor-promo-grid">
          <div data-anim="slide-left">
            <span class="section-label">006 / Learn from the best</span>
            <h2 class="section-heading">Instructors who ship, not just teach.</h2>
            <p class="section-sub" style="margin-bottom:32px;">Our instructors are practitioners — engineers, designers, and data scientists who build real products every day. They teach the patterns, tools, and workflows they actually use on the job.</p>
            <a href="#/instructors" class="button">Meet the instructors <span>→</span></a>
          </div>
          <div class="instructor-promo-images" data-anim="scale-up">
            ${instructors.slice(0, 3).map(i => `<img src="${i.photo}" alt="${i.name}" loading="lazy" />`).join('')}
          </div>
        </div>
      </div>
    </section>

    <!-- Marquee -->
    <section class="marquee-section" data-marquee>
      <div class="marquee-wrap">
        <div class="marquee-text">
          Learn <span class="solid">Build</span> Ship <span class="solid">Grow</span> Learn <span class="solid">Build</span> Ship <span class="solid">Grow</span>
        </div>
        <div class="marquee-text" aria-hidden="true">
          Learn <span class="solid">Build</span> Ship <span class="solid">Grow</span> Learn <span class="solid">Build</span> Ship <span class="solid">Grow</span>
        </div>
      </div>
    </section>

    <!-- Final CTA -->
    <section class="final-cta" data-persist="true">
      <div class="container">
        <span class="section-label" data-anim="fade-up">Ready to begin?</span>
        <h2 data-anim="fade-up" style="margin-top:16px;">Your next skill is one click away.</h2>
        <p data-anim="fade-up">Join 47,000+ students learning by building. Start free, upgrade when you're ready.</p>
        <div class="hero-ctas" data-anim="fade-up">
          <a href="#/signup" class="button button-large">Sign up free <span>→</span></a>
          <a href="#/courses" class="button button-outline button-large">Browse courses</a>
        </div>
      </div>
    </section>
  `

  // ---- Carousel ----
  window.__pageInit = () => {
    initCarousel()
    initCanvasAnimation()
  }
}

function getCurrentUserSafe() {
  try {
    return JSON.parse(localStorage.getItem('ysh_session'))
  } catch {
    return null
  }
}

function initCarousel() {
  const track = document.getElementById('featured-track')
  const prev = document.getElementById('carousel-prev')
  const next = document.getElementById('carousel-next')
  if (!track || !prev || !next) return

  let index = 0
  const cards = track.querySelectorAll('.course-card')
  const cardWidth = cards[0]?.offsetWidth + 24 || 384
  const visibleCards = Math.floor(track.parentElement.offsetWidth / cardWidth)
  const maxIndex = Math.max(0, cards.length - visibleCards)

  function update() {
    track.style.transform = `translateX(-${index * cardWidth}px)`
    prev.disabled = index === 0
    next.disabled = index >= maxIndex
  }

  prev.addEventListener('click', () => { index = Math.max(0, index - 1); update() })
  next.addEventListener('click', () => { index = Math.min(maxIndex, index + 1); update() })
  update()
}

// ---- Canvas scroll animation ----
function initCanvasAnimation() {
  const canvas = document.getElementById('hero-canvas')
  if (!canvas) return
  const ctx = canvas.getContext('2d')
  const canvasSection = document.getElementById('canvas-section')
  const progressBar = document.getElementById('canvas-progress-bar')

  const dpr = Math.min(window.devicePixelRatio || 1, 2)
  let frameCount = 0
  const frames = []
  let currentFrame = 0
  let bgColor = '#0c1f2e'
  let useFrames = false

  function resizeCanvas() {
    canvas.width = canvas.offsetWidth * dpr
    canvas.height = canvas.offsetHeight * dpr
    if (useFrames && frames[currentFrame]) drawFrame(currentFrame)
    else drawGradient(0)
  }
  resizeCanvas()
  window.addEventListener('resize', resizeCanvas)

  // ---- Frame loading ----
  async function loadFrames() {
    const maxFrames = 200
    let available = 0
    for (let i = 1; i <= maxFrames; i++) {
      const padded = String(i).padStart(4, '0')
      try {
        const res = await fetch(`/frames/frame_${padded}.webp`, { method: 'HEAD' })
        if (res.ok) available++
        else break
      } catch { break }
    }

    if (available === 0) { useFrames = false; drawGradient(0); return }

    useFrames = true
    frameCount = available
    const firstBatch = Math.min(10, frameCount)
    for (let i = 0; i < firstBatch; i++) await loadFrame(i)
    drawFrame(0)
    for (let i = firstBatch; i < frameCount; i++) loadFrame(i)
  }

  function loadFrame(index) {
    return new Promise((resolve) => {
      const img = new Image()
      const padded = String(index + 1).padStart(4, '0')
      img.src = `/frames/frame_${padded}.webp`
      img.onload = () => {
        frames[index] = img
        if (index === 0) sampleBgColor(img)
        resolve()
      }
      img.onerror = () => resolve()
    })
  }

  function sampleBgColor(img) {
    try {
      const sc = document.createElement('canvas')
      sc.width = 4; sc.height = 4
      const sctx = sc.getContext('2d')
      sctx.drawImage(img, 0, 0, 4, 4)
      const d = sctx.getImageData(0, 0, 4, 4).data
      bgColor = `rgb(${d[0]},${d[1]},${d[2]})`
    } catch { bgColor = '#0c1f2e' }
  }

  const IMAGE_SCALE = 0.85

  function drawFrame(index) {
    const img = frames[index]
    if (!img) return
    const cw = canvas.width, ch = canvas.height
    const iw = img.naturalWidth, ih = img.naturalHeight
    const scale = Math.max(cw / iw, ch / ih) * IMAGE_SCALE
    const dw = iw * scale, dh = ih * scale
    const dx = (cw - dw) / 2, dy = (ch - dh) / 2
    ctx.fillStyle = bgColor
    ctx.fillRect(0, 0, cw, ch)
    ctx.drawImage(img, dx, dy, dw, dh)
  }

  // ---- Gradient fallback ----
  const gradients = [
    ['#07141d', '#0c2333', '#112a3d'],
    ['#0c1f2e', '#1a3a52', '#2470d8'],
    ['#112a3d', '#1d5fb0', '#14c4d8'],
    ['#0c2333', '#6b3fa0', '#9268d8'],
    ['#07141d', '#0ea5b8', '#4fdde9'],
  ]

  function lerpColor(c1, c2, t) {
    const r1 = parseInt(c1.slice(1, 3), 16), g1 = parseInt(c1.slice(3, 5), 16), b1 = parseInt(c1.slice(5, 7), 16)
    const r2 = parseInt(c2.slice(1, 3), 16), g2 = parseInt(c2.slice(3, 5), 16), b2 = parseInt(c2.slice(5, 7), 16)
    return `rgb(${Math.round(r1+(r2-r1)*t)},${Math.round(g1+(g2-g1)*t)},${Math.round(b1+(b2-b1)*t)})`
  }

  function drawGradient(progress) {
    const cw = canvas.width, ch = canvas.height
    const t = Math.max(0, Math.min(1, progress))
    const gradIdx = Math.floor(t * (gradients.length - 1))
    const localT = t * (gradients.length - 1) - gradIdx
    const g1 = gradients[gradIdx]
    const g2 = gradients[Math.min(gradIdx + 1, gradients.length - 1)]

    const grad = ctx.createLinearGradient(0, 0, cw, ch)
    grad.addColorStop(0, lerpColor(g1[0], g2[0], localT))
    grad.addColorStop(0.5, lerpColor(g1[1], g2[1], localT))
    grad.addColorStop(1, lerpColor(g1[2], g2[2], localT))
    ctx.fillStyle = grad
    ctx.fillRect(0, 0, cw, ch)

    for (let i = 0; i < 5; i++) {
      const x = (Math.sin(t * Math.PI * 2 + i * 1.3) * 0.3 + 0.5) * cw
      const y = (Math.cos(t * Math.PI * 2 + i * 0.7) * 0.3 + 0.5) * ch
      const r = (0.15 + Math.sin(t * Math.PI + i) * 0.05) * Math.min(cw, ch)
      const radial = ctx.createRadialGradient(x, y, 0, x, y, r)
      const colors = ['rgba(20,196,216,0.15)', 'rgba(59,138,232,0.12)', 'rgba(146,104,216,0.1)']
      radial.addColorStop(0, colors[i % colors.length])
      radial.addColorStop(1, 'transparent')
      ctx.fillStyle = radial
      ctx.fillRect(0, 0, cw, ch)
    }

    ctx.save()
    ctx.fillStyle = 'rgba(255,255,255,0.04)'
    ctx.font = `800 ${Math.min(cw, ch) * 0.15}px sans-serif`
    ctx.textAlign = 'center'
    ctx.textBaseline = 'middle'
    ctx.fillText('YS', cw / 2, ch / 2)
    ctx.restore()
  }

  // ---- Single ScrollTrigger for both modes ----
  const FRAME_SPEED = 2.0

  function onScroll(progress) {
    const accelerated = Math.min(progress * FRAME_SPEED, 1)
    if (useFrames && frameCount > 0) {
      const index = Math.min(Math.floor(accelerated * frameCount), frameCount - 1)
      if (index !== currentFrame && frames[index]) {
        currentFrame = index
        requestAnimationFrame(() => drawFrame(currentFrame))
      }
    } else {
      drawGradient(accelerated)
    }
    if (progressBar) progressBar.style.width = (progress * 100) + '%'
  }

  // ---- Circle-wipe reveal: canvas starts hidden, reveals via clip-path ----
  const heroSection = document.getElementById('hero')
  if (heroSection && window.gsap && window.ScrollTrigger) {
    gsap.set(canvasSection, { clipPath: 'circle(0% at 50% 50%)' })

    ScrollTrigger.create({
      trigger: heroSection,
      start: 'top top',
      end: 'bottom top',
      scrub: 1,
      onUpdate: (self) => {
        const reveal = Math.min(self.progress * 1.5, 1)
        gsap.set(canvasSection, { clipPath: `circle(${reveal * 150}% at 50% 50%)` })
      },
    })

    // Frame animation scroll trigger
    ScrollTrigger.create({
      trigger: canvasSection,
      start: 'top top',
      end: 'bottom bottom',
      scrub: true,
      onUpdate: (self) => onScroll(self.progress),
    })
  } else {
    drawGradient(0)
  }

  loadFrames()
}
