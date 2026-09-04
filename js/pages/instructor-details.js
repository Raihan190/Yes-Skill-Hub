// ============================================================
// Instructor Details Page
// ============================================================

import { getInstructorById, getCourseById, getReviewsByCourse } from '../data.js'
import { courseCardHTML } from '../../main.js'

export function renderInstructorDetails(container, params) {
  const inst = getInstructorById(params.id)

  if (!inst) {
    container.innerHTML = `
      <section class="page-hero"><div class="container">
        <h1>Instructor not found</h1>
        <a href="#/instructors" class="button" style="margin-top:24px;">View all instructors →</a>
      </div></section>
    `
    return
  }

  const instructorCourses = inst.courses.map(id => getCourseById(id)).filter(c => c)
  const allReviews = instructorCourses.flatMap(c => getReviewsByCourse(c.id)).slice(0, 4)

  container.innerHTML = `
    <section class="instructor-detail-hero">
      <div class="container">
        <div class="breadcrumb" style="margin-bottom:24px;">
          <a href="#/">Home</a><span class="sep">/</span>
          <a href="#/instructors">Instructors</a><span class="sep">/</span>
          <span>${inst.name}</span>
        </div>
        <div style="display:grid;grid-template-columns:200px 1fr;gap:40px;align-items:center;">
          <img src="${inst.photo}" alt="${inst.name}" loading="lazy" />
          <div>
            <h1>${inst.name}</h1>
            <div class="title">${inst.title}</div>
            <div style="display:flex;gap:24px;flex-wrap:wrap;font-size:15px;color:var(--text-on-dark-muted);">
              <span>📚 ${inst.courseCount} course${inst.courseCount > 1 ? 's' : ''}</span>
              <span>👥 ${inst.studentCount.toLocaleString()} students</span>
              <span>★ ${inst.rating} rating</span>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section class="section">
      <div class="container">
        <div class="instructor-detail-body">
          <div class="instructor-bio">
            <h2 class="section-heading" style="font-size:24px;margin-bottom:20px;">About ${inst.name.split(' ')[0]}</h2>
            <p>${inst.bio}</p>

            <h2 style="font-size:20px;margin-top:40px;margin-bottom:16px;">Qualifications</h2>
            <ul class="qualifications-list">
              ${inst.qualifications.map(q => `<li>${q}</li>`).join('')}
            </ul>

            <h2 style="font-size:20px;margin-top:40px;margin-bottom:16px;">Skills & expertise</h2>
            <div class="skills-grid">
              ${inst.skills.map(s => `<span class="skill-tag">${s}</span>`).join('')}
            </div>

            <h2 style="font-size:20px;margin-top:40px;margin-bottom:16px;">Courses by ${inst.name.split(' ')[0]}</h2>
            <div class="course-grid" style="grid-template-columns:repeat(2,1fr);">
              ${instructorCourses.map(c => courseCardHTML(c)).join('')}
            </div>

            ${allReviews.length > 0 ? `
              <h2 style="font-size:20px;margin-top:40px;margin-bottom:16px;">Student reviews</h2>
              <div class="reviews-list">
                ${allReviews.map(r => `
                  <div class="review-card">
                    <div class="review-header">
                      <img src="${r.studentPhoto}" alt="${r.studentName}" loading="lazy" />
                      <div>
                        <div class="name">${r.studentName}</div>
                        <div class="date">${r.date}</div>
                      </div>
                      <div class="review-stars">${'★'.repeat(r.rating)}</div>
                    </div>
                    <p class="review-text">${r.text}</p>
                  </div>
                `).join('')}
              </div>
            ` : ''}
          </div>

          <div>
            <div class="purchase-card" style="position:sticky;top:calc(var(--header-h) + 24px);">
              <h3 style="font-size:18px;margin-bottom:20px;">Connect</h3>
              <div style="display:flex;flex-direction:column;gap:12px;">
                ${inst.social.twitter ? `<a href="${inst.social.twitter}" class="button button-outline" style="width:100%;justify-content:center;">Twitter / X</a>` : ''}
                ${inst.social.linkedin ? `<a href="${inst.social.linkedin}" class="button button-outline" style="width:100%;justify-content:center;">LinkedIn</a>` : ''}
                ${inst.social.github ? `<a href="${inst.social.github}" class="button button-outline" style="width:100%;justify-content:center;">GitHub</a>` : ''}
                ${inst.social.dribbble ? `<a href="${inst.social.dribbble}" class="button button-outline" style="width:100%;justify-content:center;">Dribbble</a>` : ''}
              </div>
              <div style="margin-top:24px;padding-top:24px;border-top:1px solid var(--border);">
                <h4 style="font-size:14px;font-weight:700;margin-bottom:14px;">Quick stats</h4>
                <div style="display:flex;flex-direction:column;gap:14px;">
                  <div style="display:flex;justify-content:space-between;font-size:14px;"><span style="color:var(--text-muted);">Courses</span><span style="font-weight:700;">${inst.courseCount}</span></div>
                  <div style="display:flex;justify-content:space-between;font-size:14px;"><span style="color:var(--text-muted);">Students</span><span style="font-weight:700;">${inst.studentCount.toLocaleString()}</span></div>
                  <div style="display:flex;justify-content:space-between;font-size:14px;"><span style="color:var(--text-muted);">Rating</span><span style="font-weight:700;">★ ${inst.rating}</span></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  `

  window.__pageInit = () => {}
}
