// ============================================================
// Yes Skill Hub — Main App: Router, Canvas, Animations
// ============================================================

import './css/style.css'
import './css/responsive.css'
import { courses, instructors, categories, getCourseById, getInstructorById } from './js/data.js'
import { getCurrentUser, isLoggedIn, logoutUser } from './js/auth.js'
import { renderHome } from './js/pages/home.js'
import { renderCourses } from './js/pages/courses.js'
import { renderCourseDetails } from './js/pages/course-details.js'
import { renderLogin } from './js/pages/login.js'
import { renderSignup } from './js/pages/signup.js'
import { renderMyClasses } from './js/pages/my-classes.js'
import { renderInstructors } from './js/pages/instructors.js'
import { renderInstructorDetails } from './js/pages/instructor-details.js'
import { renderCoursePlayer } from './js/pages/course-player.js'

// ---- Router ----
const routes = {
  '/': { render: renderHome, onDark: true },
  '/courses': { render: renderCourses, onDark: false },
  '/course/:id': { render: renderCourseDetails, onDark: false },
  '/login': { render: renderLogin, onDark: true, hideHeader: true },
  '/signup': { render: renderSignup, onDark: true, hideHeader: true },
  '/my-classes': { render: renderMyClasses, onDark: false },
  '/instructors': { render: renderInstructors, onDark: false },
  '/instructor/:id': { render: renderInstructorDetails, onDark: false },
  '/player/:id': { render: renderCoursePlayer, onDark: true },
}

function parseRoute() {
  const rawHash = location.hash.replace(/^#/, '') || '/'
  const hash = rawHash.split('?')[0] // strip query params
  const parts = hash.split('/').filter(Boolean)
  if (parts.length === 0) return { path: '/', params: {}, config: routes['/'] }

  for (const [pattern, config] of Object.entries(routes)) {
    const patternParts = pattern.split('/').filter(Boolean)
    if (patternParts.length !== parts.length) continue
    const params = {}
    let match = true
    for (let i = 0; i < patternParts.length; i++) {
      if (patternParts[i].startsWith(':')) {
        params[patternParts[i].slice(1)] = decodeURIComponent(parts[i])
      } else if (patternParts[i] !== parts[i]) {
        match = false
        break
      }
    }
    if (match) return { path: pattern, params, config }
  }
  return { path: '/', params: {}, config: routes['/'] }
}

function navigate(path) {
  location.hash = path
}

window.navigate = navigate

function route() {
  const { path, params, config } = parseRoute()
  const app = document.getElementById('app')
  const header = document.getElementById('site-header')
  const footer = document.querySelector('.footer')

  if (config?.hideHeader) {
    header.style.display = 'none'
    if (footer) footer.style.display = 'none'
  } else {
    header.style.display = ''
    if (footer) footer.style.display = ''
  }

  header.classList.toggle('on-dark', !!config?.onDark)

  // Destroy existing ScrollTriggers and Lenis from previous page
  if (window.ScrollTrigger) {
    ScrollTrigger.getAll().forEach(st => st.kill())
  }
  if (window.__lenis) {
    window.__lenis.destroy()
    window.__lenis = null
  }

  // Scroll to top
  window.scrollTo(0, 0)

  // Render page
  const renderFn = config?.render || routes['/'].render
  app.innerHTML = ''
  renderFn(app, params)

  // Update active nav link
  updateActiveNav(path)

  // Init page-specific JS after DOM is ready
  requestAnimationFrame(() => {
    initPageAnimations()
    initHeaderScroll()
    initMobileNav()
    initNavSearch()
    updateAuthUI()
  })
}

function updateActiveNav(path) {
  document.querySelectorAll('[data-nav]').forEach(el => {
    const target = el.dataset.nav
    const routeMap = { home: '/', courses: '/courses', instructors: '/instructors', 'my-classes': '/my-classes' }
    el.classList.toggle('active', routeMap[target] === path)
  })
}

function updateAuthUI() {
  const user = getCurrentUser()
  const headerActions = document.querySelector('.header-actions')
  if (!headerActions) return
  // Check if already updated
  if (headerActions.querySelector('.user-menu')) return

  if (user) {
    const loginLink = headerActions.querySelector('.text-link')
    const signupBtn = headerActions.querySelector('.button-small')
    if (loginLink) loginLink.remove()
    if (signupBtn) signupBtn.remove()

    const userMenu = document.createElement('div')
    userMenu.className = 'user-menu'
    userMenu.style.cssText = 'display:flex;align-items:center;gap:12px;'
    userMenu.innerHTML = `
      <span style="font-size:14px;font-weight:500;color:var(--navy-900);">${user.name.split(' ')[0]}</span>
      <button class="button button-small button-ghost" id="logout-btn">Log out</button>
    `
    headerActions.insertBefore(userMenu, headerActions.querySelector('.menu-toggle'))
    document.getElementById('logout-btn')?.addEventListener('click', () => {
      logoutUser()
      navigate('/')
      location.reload()
    })
  }
}

// ---- Header scroll effect ----
function initHeaderScroll() {
  const header = document.getElementById('site-header')
  if (!header) return
  let ticking = false
  window.addEventListener('scroll', () => {
    if (!ticking) {
      requestAnimationFrame(() => {
        header.classList.toggle('scrolled', window.scrollY > 20)
        ticking = false
      })
      ticking = true
    }
  }, { passive: true })
}

// ---- Mobile nav ----
function initMobileNav() {
  const toggle = document.querySelector('.menu-toggle')
  if (!toggle || toggle.dataset.bound) return
  toggle.dataset.bound = '1'

  let mobileNav = document.querySelector('.mobile-nav')
  if (!mobileNav) {
    mobileNav = document.createElement('nav')
    mobileNav.className = 'mobile-nav'
    mobileNav.innerHTML = `
      <div class="mobile-search"><input type="text" placeholder="Search courses..." id="mobile-search-input" /></div>
      <a href="#/" data-nav="home">Home</a>
      <a href="#/courses" data-nav="courses">Courses</a>
      <a href="#/instructors" data-nav="instructors">Instructors</a>
      <a href="#/my-classes" data-nav="my-classes">My Classes</a>
      <a href="#/login">Log in</a>
      <div class="mobile-actions"><a href="#/signup" class="button button-small">Sign up <span>↗</span></a></div>
    `
    document.body.appendChild(mobileNav)
    mobileNav.querySelectorAll('a').forEach(a => {
      a.addEventListener('click', () => mobileNav.classList.remove('open'))
    })
    document.getElementById('mobile-search-input')?.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') {
        const q = e.target.value.trim()
        if (q) navigate('/courses?q=' + encodeURIComponent(q))
      }
    })
  }

  toggle.addEventListener('click', () => {
    mobileNav.classList.toggle('open')
  })
}

// ---- Nav search ----
function initNavSearch() {
  const search = document.getElementById('nav-search')
  if (!search || search.dataset.bound) return
  search.dataset.bound = '1'
  search.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
      const q = e.target.value.trim()
      if (q) navigate('/courses?q=' + encodeURIComponent(q))
    }
  })
}

// ---- Page animations (GSAP + ScrollTrigger) ----
function initPageAnimations() {
  if (!window.gsap || !window.ScrollTrigger) return
  gsap.registerPlugin(ScrollTrigger)

  // Init Lenis smooth scroll
  if (window.Lenis) {
    const lenis = new Lenis({
      duration: 1.1,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    })
    window.__lenis = lenis
    lenis.on('scroll', ScrollTrigger.update)
    gsap.ticker.add((time) => lenis.raf(time * 1000))
    gsap.ticker.lagSmoothing(0)
  }

  // Generic data-anim reveals
  document.querySelectorAll('[data-anim]').forEach((el) => {
    const type = el.dataset.anim
    const children = el.dataset.stagger === 'true'
      ? Array.from(el.children)
      : [el]

    if (el.dataset.stagger === 'true') {
      gsap.set(children, { opacity: 0 })
      const offsets = { 'fade-up': { y: 40 }, 'slide-left': { x: -60 }, 'slide-right': { x: 60 }, 'scale-up': { scale: 0.9 }, 'rotate-in': { rotation: 2, y: 30 }, 'stagger-up': { y: 50 }, 'clip-reveal': { clipPath: 'inset(100% 0 0 0)' } }
      const from = offsets[type] || offsets['fade-up']
      gsap.set(children, from)
      ScrollTrigger.create({
        trigger: el,
        start: 'top 82%',
        onEnter: () => gsap.to(children, { opacity: 1, x: 0, y: 0, scale: 1, rotation: 0, clipPath: 'inset(0% 0 0 0)', duration: 0.8, stagger: 0.12, ease: 'power3.out' }),
        onLeaveBack: () => gsap.set(children, { ...from, opacity: 0 }),
      })
    } else {
      ScrollTrigger.create({
        trigger: el,
        start: 'top 85%',
        onEnter: () => el.classList.add('animated'),
        onLeaveBack: () => el.classList.remove('animated'),
      })
    }
  })

  // Counter animations
  document.querySelectorAll('[data-counter]').forEach((el) => {
    const target = parseFloat(el.dataset.counter)
    const decimals = parseInt(el.dataset.decimals || '0')
    const obj = { val: 0 }
    ScrollTrigger.create({
      trigger: el,
      start: 'top 80%',
      onEnter: () => {
        gsap.to(obj, {
          val: target,
          duration: 2,
          ease: 'power1.out',
          onUpdate: () => {
            el.textContent = decimals === 0
              ? Math.round(obj.val).toLocaleString()
              : obj.val.toFixed(decimals)
          },
        })
      },
      onLeaveBack: () => { el.textContent = '0'; obj.val = 0 },
    })
  })

  // Marquee
  document.querySelectorAll('[data-marquee]').forEach((el) => {
    const text = el.querySelector('.marquee-text')
    if (!text) return
    gsap.to(text, {
      xPercent: -50,
      ease: 'none',
      scrollTrigger: { trigger: el, start: 'top bottom', end: 'bottom top', scrub: 1 },
    })
  })

  // Call page-specific init if available
  if (window.__pageInit) {
    window.__pageInit()
    window.__pageInit = null
  }
}

// ---- Toast ----
export function showToast(message) {
  let toast = document.querySelector('.toast')
  if (!toast) {
    toast = document.createElement('div')
    toast.className = 'toast'
    document.body.appendChild(toast)
  }
  toast.textContent = message
  toast.classList.add('show')
  clearTimeout(toast._timer)
  toast._timer = setTimeout(() => toast.classList.remove('show'), 3000)
}

// ---- Shared: course card HTML ----
export function courseCardHTML(course) {
  const instructor = getInstructorById(course.instructorId)
  const discount = course.originalPrice
    ? Math.round((1 - course.price / course.originalPrice) * 100)
    : 0
  return `
    <article class="course-card" data-course-id="${course.id}">
      <a href="#/course/${course.id}" style="display:block;">
        <div class="course-card-thumb">
          <img src="${course.thumbnail}" alt="${course.title}" loading="lazy" />
          <div class="course-card-badges">
            ${course.bestseller ? '<span class="badge badge-bestseller">Bestseller</span>' : ''}
            ${discount > 0 ? `<span class="badge badge-discount">-${discount}%</span>` : ''}
          </div>
        </div>
      </a>
      <div class="course-card-body">
        <div class="course-card-cat">${course.categoryName}</div>
        <a href="#/course/${course.id}"><h3 class="course-card-title">${course.title}</h3></a>
        <p class="course-card-desc">${course.subtitle}</p>
        <div class="course-card-instructor">by ${instructor?.name || 'Unknown'}</div>
        <div class="course-card-meta">
          <span class="star">★ ${course.rating}</span>
          <span>(${course.reviewCount.toLocaleString()})</span>
          <span>· ${course.duration}</span>
          <span>· ${course.lessons} lessons</span>
        </div>
        <div class="course-card-footer">
          <div class="course-card-price">
            <span class="now">$${course.price}</span>
            ${course.originalPrice ? `<span class="was">$${course.originalPrice}</span>` : ''}
          </div>
          <a class="course-card-link" href="#/course/${course.id}">View Details →</a>
        </div>
      </div>
    </article>
  `
}

// ---- Init ----
window.addEventListener('hashchange', route)
window.addEventListener('DOMContentLoaded', () => {
  // Hide loader
  setTimeout(() => {
    const loader = document.getElementById('loader')
    if (loader) loader.classList.add('hidden')
  }, 800)
  route()
})

// If DOM already loaded
if (document.readyState !== 'loading') {
  setTimeout(() => {
    const loader = document.getElementById('loader')
    if (loader) loader.classList.add('hidden')
  }, 800)
  route()
}
