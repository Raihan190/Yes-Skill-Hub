// ============================================================
// Instructors Directory Page
// ============================================================

import { instructors } from '../data.js'

export function renderInstructors(container) {
  container.innerHTML = `
    <section class="page-hero">
      <div class="container">
        <span class="section-label">Our Instructors</span>
        <h1>Learn from practitioners</h1>
        <p>Our instructors are engineers, designers, and data scientists who ship real products every day. They teach the patterns, tools, and workflows they actually use.</p>
      </div>
    </section>

    <section class="section">
      <div class="container">
        <div class="instructors-grid" data-anim="stagger-up" data-stagger="true">
          ${instructors.map(inst => `
            <div class="instructor-card">
              <a href="#/instructor/${inst.id}">
                <img src="${inst.photo}" alt="${inst.name}" loading="lazy" />
              </a>
              <div>
                <a href="#/instructor/${inst.id}"><h3>${inst.name}</h3></a>
                <div class="title">${inst.title}</div>
                <p class="bio">${inst.shortBio}</p>
                <div class="instructor-stats">
                  <div class="instructor-stat">
                    <div class="num">${inst.courseCount}</div>
                    <div class="lbl">Courses</div>
                  </div>
                  <div class="instructor-stat">
                    <div class="num">${inst.studentCount.toLocaleString()}</div>
                    <div class="lbl">Students</div>
                  </div>
                  <div class="instructor-stat">
                    <div class="num">★ ${inst.rating}</div>
                    <div class="lbl">Rating</div>
                  </div>
                </div>
                <div class="instructor-expertise">
                  ${inst.expertise.map(e => `<span class="expertise-tag">${e}</span>`).join('')}
                </div>
                <a href="#/instructor/${inst.id}" class="button button-outline button-small">View profile →</a>
              </div>
            </div>
          `).join('')}
        </div>
      </div>
    </section>
  `

  window.__pageInit = () => {}
}
