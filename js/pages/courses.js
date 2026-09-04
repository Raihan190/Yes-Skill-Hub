// ============================================================
// Courses Page
// ============================================================

import { courses, categories, getInstructorById } from '../data.js'
import { courseCardHTML } from '../../main.js'

export function renderCourses(container, params) {
  // Check for query params (search from navbar)
  const hash = location.hash
  const queryStr = hash.includes('?') ? hash.split('?')[1] : ''
  const urlParams = new URLSearchParams(queryStr)
  const initialSearch = urlParams.get('q') || ''
  const initialCat = urlParams.get('cat') || ''

  container.innerHTML = `
    <section class="page-hero">
      <div class="container">
        <span class="section-label">All Courses</span>
        <h1>Find your next course</h1>
        <p>Browse our complete catalog of project-based courses. Filter by category, difficulty, or price to find exactly what you need.</p>
      </div>
    </section>

    <section class="courses-page">
      <div class="container">
        <!-- Search + filters -->
        <div class="courses-toolbar">
          <div class="search-box">
            <span>⌕</span>
            <input type="text" id="course-search" placeholder="Search courses by title or description..." value="${initialSearch}" />
          </div>
          <select class="filter-select" id="filter-difficulty">
            <option value="">All Levels</option>
            <option value="Beginner">Beginner</option>
            <option value="Intermediate">Intermediate</option>
            <option value="Advanced">Advanced</option>
          </select>
          <select class="filter-select" id="filter-price">
            <option value="">All Prices</option>
            <option value="free">Free</option>
            <option value="under50">Under $50</option>
            <option value="50to100">$50 - $100</option>
            <option value="over100">Over $100</option>
          </select>
        </div>

        <!-- Category chips -->
        <div class="filter-chips" id="filter-chips">
          <button class="chip ${!initialCat ? 'active' : ''}" data-cat="">All Categories</button>
          ${categories.map(c => `<button class="chip ${initialCat === c.id ? 'active' : ''}" data-cat="${c.id}">${c.name}</button>`).join('')}
        </div>

        <!-- Results -->
        <div class="courses-results-bar">
          <span id="results-count">${courses.length} courses</span>
          <select class="filter-select" id="filter-sort">
            <option value="popular">Most Popular</option>
            <option value="rating">Highest Rated</option>
            <option value="price-low">Price: Low to High</option>
            <option value="price-high">Price: High to Low</option>
          </select>
        </div>

        <div class="course-grid" id="course-grid">
          ${courses.map(c => courseCardHTML(c)).join('')}
        </div>

        <div class="no-results" id="no-results" style="display:none;">
          <h3>No courses found</h3>
          <p>Try adjusting your filters or search terms.</p>
        </div>

        <div class="load-more-wrap" id="load-more-wrap" style="display:none;">
          <button class="button button-outline" id="load-more">Load more courses</button>
        </div>
      </div>
    </section>
  `

  // ---- Filtering logic ----
  window.__pageInit = () => {
    let visibleCount = 6
    const grid = document.getElementById('course-grid')
    const noResults = document.getElementById('no-results')
    const resultsCount = document.getElementById('results-count')
    const loadMoreWrap = document.getElementById('load-more-wrap')

    const state = {
      search: initialSearch.toLowerCase(),
      category: initialCat,
      difficulty: '',
      price: '',
      sort: 'popular',
    }

    function filterCourses() {
      let filtered = courses.filter(c => {
        if (state.search) {
          const text = (c.title + ' ' + c.subtitle + ' ' + c.description).toLowerCase()
          if (!text.includes(state.search)) return false
        }
        if (state.category && c.category !== state.category) return false
        if (state.difficulty && c.difficulty !== state.difficulty) return false
        if (state.price) {
          if (state.price === 'free' && c.price > 0) return false
          if (state.price === 'under50' && c.price >= 50) return false
          if (state.price === '50to100' && (c.price < 50 || c.price > 100)) return false
          if (state.price === 'over100' && c.price <= 100) return false
        }
        return true
      })

      // Sort
      if (state.sort === 'rating') filtered.sort((a, b) => b.rating - a.rating)
      else if (state.sort === 'price-low') filtered.sort((a, b) => a.price - b.price)
      else if (state.sort === 'price-high') filtered.sort((a, b) => b.price - a.price)
      else filtered.sort((a, b) => b.studentCount - a.studentCount)

      return filtered
    }

    function render() {
      const filtered = filterCourses()
      resultsCount.textContent = `${filtered.length} course${filtered.length !== 1 ? 's' : ''}`

      if (filtered.length === 0) {
        grid.innerHTML = ''
        noResults.style.display = 'block'
        loadMoreWrap.style.display = 'none'
        return
      }

      noResults.style.display = 'none'
      const toShow = filtered.slice(0, visibleCount)
      grid.innerHTML = toShow.map(c => courseCardHTML(c)).join('')

      if (filtered.length > visibleCount) {
        loadMoreWrap.style.display = 'block'
      } else {
        loadMoreWrap.style.display = 'none'
      }
    }

    // Event listeners
    document.getElementById('course-search').addEventListener('input', (e) => {
      state.search = e.target.value.toLowerCase()
      visibleCount = 6
      render()
    })

    document.getElementById('filter-difficulty').addEventListener('change', (e) => {
      state.difficulty = e.target.value
      visibleCount = 6
      render()
    })

    document.getElementById('filter-price').addEventListener('change', (e) => {
      state.price = e.target.value
      visibleCount = 6
      render()
    })

    document.getElementById('filter-sort').addEventListener('change', (e) => {
      state.sort = e.target.value
      render()
    })

    document.querySelectorAll('#filter-chips .chip').forEach(chip => {
      chip.addEventListener('click', () => {
        document.querySelectorAll('#filter-chips .chip').forEach(c => c.classList.remove('active'))
        chip.classList.add('active')
        state.category = chip.dataset.cat
        visibleCount = 6
        render()
      })
    })

    document.getElementById('load-more')?.addEventListener('click', () => {
      visibleCount += 6
      render()
    })

    render()
  }
}
