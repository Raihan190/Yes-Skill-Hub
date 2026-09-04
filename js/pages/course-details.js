// ============================================================
// Course Details Page
// ============================================================

import { getCourseById, getInstructorById, getReviewsByCourse, getRelatedCourses } from '../data.js'
import { courseCardHTML, showToast } from '../../main.js'
import { isLoggedIn, enrollInCourse, isEnrolled, toggleBookmark, isBookmarked } from '../auth.js'

export function renderCourseDetails(container, params) {
  const course = getCourseById(params.id)

  if (!course) {
    container.innerHTML = `
      <section class="page-hero"><div class="container">
        <h1>Course not found</h1>
        <p>The course you're looking for doesn't exist or has been removed.</p>
        <a href="#/courses" class="button" style="margin-top:24px;">Browse courses →</a>
      </div></section>
    `
    return
  }

  const instructor = getInstructorById(course.instructorId)
  const reviews = getReviewsByCourse(course.id)
  const related = getRelatedCourses(course.id)
  const enrolled = isEnrolled(course.id)
  const bookmarked = isBookmarked(course.id)
  const discount = course.originalPrice ? Math.round((1 - course.price / course.originalPrice) * 100) : 0
  const totalLessons = course.curriculum.reduce((sum, s) => sum + s.lessons.length, 0)

  container.innerHTML = `
    <section class="course-detail-hero">
      <div class="container">
        <div>
          <div class="breadcrumb" style="margin-bottom:24px;">
            <a href="#/">Home</a><span class="sep">/</span>
            <a href="#/courses">Courses</a><span class="sep">/</span>
            <span>${course.categoryName}</span>
          </div>
          <span class="section-label">${course.categoryName}</span>
          <h1>${course.title}</h1>
          <p class="subtitle">${course.subtitle}</p>
          <div class="course-detail-hero-meta">
            <span><span class="star">★</span> ${course.rating} (${course.reviewCount.toLocaleString()} reviews)</span>
            <span>👥 ${course.studentCount.toLocaleString()} students</span>
            <span>⏱ ${course.duration}</span>
            <span>📚 ${totalLessons} lessons</span>
            <span>📊 ${course.difficulty}</span>
          </div>
          <div class="course-detail-hero-actions">
            ${enrolled
              ? `<a href="#/player/${course.id}" class="button button-large">Continue Learning →</a>`
              : `<button class="button button-large" id="enroll-btn">Enroll Now — $${course.price}</button>`
            }
            <button class="button button-outline" id="bookmark-btn">${bookmarked ? '★ Saved' : '☆ Save'}</button>
          </div>
        </div>
        <div class="course-detail-video-card">
          <img src="${course.thumbnail}" alt="${course.title}" />
          <div class="play-btn">▶</div>
        </div>
      </div>
    </section>

    <section class="course-detail-page">
      <div class="container">
        <div class="course-detail-body">
          <!-- Main content -->
          <div class="course-detail-main">
            <h2>About this course</h2>
            <p>${course.description}</p>

            <h2>What you'll learn</h2>
            <ul class="learn-list">
              ${course.whatYouWillLearn.map(item => `<li>${item}</li>`).join('')}
            </ul>

            <h2>Course curriculum</h2>
            <div class="curriculum-list" id="curriculum-list">
              ${course.curriculum.map((section, si) => `
                <div class="curriculum-section-item">
                  <div class="curriculum-section-header" data-section="${si}">
                    <span>${section.section}</span>
                    <span class="count">${section.lessons.length} lessons</span>
                  </div>
                  <div class="curriculum-lessons" id="curriculum-${si}">
                    ${section.lessons.map(lesson => `
                      <div class="curriculum-lesson">
                        <span>${lesson.title}</span>
                        <span class="type">${lesson.type}</span>
                        <span class="dur">${lesson.duration}</span>
                      </div>
                    `).join('')}
                  </div>
                </div>
              `).join('')}
            </div>

            <h2>Requirements</h2>
            <ul class="requirements-list">
              ${course.requirements.map(r => `<li>${r}</li>`).join('')}
            </ul>

            <h2>Downloadable resources</h2>
            <div class="documents-list">
              ${course.documents.map(doc => `
                <div class="document-item">
                  <div class="doc-icon">${doc.type}</div>
                  <div class="doc-info">
                    <div class="name">${doc.name}</div>
                    <div class="meta">${doc.type} · ${doc.size}</div>
                  </div>
                  <a class="doc-download" href="#" onclick="event.preventDefault()">Download ↓</a>
                </div>
              `).join('')}
            </div>

            <h2>Student reviews</h2>
            <div class="reviews-list">
              ${reviews.map(r => `
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

            <h2>Frequently asked questions</h2>
            <div class="faq-list" id="faq-list">
              <div class="faq-item">
                <div class="faq-question">How long do I have access to the course? <span class="icon">+</span></div>
                <div class="faq-answer"><p>You get lifetime access to the course content, including all future updates and new lessons. Learn at your own pace, whenever you want.</p></div>
              </div>
              <div class="faq-item">
                <div class="faq-question">Do I get a certificate? <span class="icon">+</span></div>
                <div class="faq-answer"><p>Yes! When you complete all lessons in the course, you'll receive a completion certificate that you can share on LinkedIn and your resume.</p></div>
              </div>
              <div class="faq-item">
                <div class="faq-question">What if the course is too hard? <span class="icon">+</span></div>
                <div class="faq-answer"><p>Each course lists its prerequisites clearly. If you get stuck, our community forum and Q&A sections are there to help. You can also revisit any lesson anytime.</p></div>
              </div>
              <div class="faq-item">
                <div class="faq-question">Can I get a refund? <span class="icon">+</span></div>
                <div class="faq-answer"><p>We offer a 30-day money-back guarantee on all courses. If you're not satisfied, contact our support team for a full refund.</p></div>
              </div>
            </div>
          </div>

          <!-- Sidebar -->
          <div>
            <div class="purchase-card">
              <div class="purchase-price">
                <span class="now">$${course.price}</span>
                ${course.originalPrice ? `<span class="was">$${course.originalPrice}</span><span class="save">${discount}% OFF</span>` : ''}
              </div>
              ${enrolled
                ? `<a href="#/player/${course.id}" class="button">Go to Course Player →</a>`
                : `<button class="button" id="purchase-btn">Enroll Now</button>`
              }
              <div class="purchase-secure">30-day money-back guarantee · Secure checkout</div>
              <div class="purchase-includes">
                <h4>This course includes:</h4>
                <ul>
                  <li>${totalLessons} on-demand video lessons</li>
                  <li>${course.duration} of content</li>
                  <li>${course.documents.length} downloadable resources</li>
                  <li>Full lifetime access</li>
                  <li>Completion certificate</li>
                  <li>Access on mobile and desktop</li>
                </ul>
              </div>
            </div>

            <div class="instructor-mini">
              <img src="${instructor.photo}" alt="${instructor.name}" loading="lazy" />
              <div>
                <div class="name">${instructor.name}</div>
                <div class="title">${instructor.title}</div>
              </div>
            </div>
            <a href="#/instructor/${instructor.id}" class="button button-outline" style="width:100%;justify-content:center;margin-top:12px;">View instructor profile</a>
          </div>
        </div>
      </div>
    </section>

    ${related.length > 0 ? `
      <section class="related-section">
        <div class="container">
          <h2 class="section-heading" style="margin-bottom:32px;">Related courses</h2>
          <div class="course-grid">
            ${related.map(c => courseCardHTML(c)).join('')}
          </div>
        </div>
      </section>
    ` : ''}
  `

  // ---- Page interactions ----
  window.__pageInit = () => {
    // Curriculum accordion
    document.querySelectorAll('.curriculum-section-header').forEach(header => {
      header.addEventListener('click', () => {
        const idx = header.dataset.section
        document.getElementById(`curriculum-${idx}`).classList.toggle('open')
      })
    })

    // FAQ accordion
    document.querySelectorAll('.faq-item').forEach(item => {
      item.querySelector('.faq-question').addEventListener('click', () => {
        item.classList.toggle('open')
      })
    })

    // Enroll / purchase
    const enrollBtn = document.getElementById('enroll-btn')
    const purchaseBtn = document.getElementById('purchase-btn')
    const action = (btn) => {
      if (!isLoggedIn()) {
        showToast('Please log in to enroll in courses.')
        setTimeout(() => location.hash = '#/login', 1000)
        return
      }
      openCheckoutModal(course)
    }
    enrollBtn?.addEventListener('click', () => action(enrollBtn))
    purchaseBtn?.addEventListener('click', () => action(purchaseBtn))

    // Bookmark
    document.getElementById('bookmark-btn')?.addEventListener('click', (e) => {
      if (!isLoggedIn()) {
        showToast('Please log in to bookmark courses.')
        return
      }
      const result = toggleBookmark(course.id)
      e.target.textContent = result.bookmarked ? '★ Saved' : '☆ Save'
      showToast(result.bookmarked ? 'Course saved to bookmarks' : 'Course removed from bookmarks')
    })
  }
}

// ---- Checkout modal ----
function openCheckoutModal(course) {
  const existing = document.querySelector('.modal-overlay')
  if (existing) existing.remove()

  const discount = course.originalPrice ? course.originalPrice - course.price : 0

  const overlay = document.createElement('div')
  overlay.className = 'modal-overlay'
  overlay.innerHTML = `
    <div class="modal">
      <span class="modal-close" id="modal-close">×</span>
      <div class="modal-header">
        <h3>Checkout</h3>
        <p>Complete your enrollment</p>
      </div>
      <div class="modal-body" id="checkout-body">
        <div class="course-line">
          <img src="${course.thumbnail}" alt="${course.title}" />
          <div class="info">
            <h4>${course.title}</h4>
            <p>${course.duration} · ${course.difficulty}</p>
          </div>
        </div>
        <div class="checkout-summary">
          <div class="checkout-line"><span>Original price</span><span>$${course.originalPrice || course.price}</span></div>
          ${discount > 0 ? `<div class="checkout-line"><span>Discount</span><span class="discount">-$${discount.toFixed(2)}</span></div>` : ''}
          <div class="checkout-line total"><span>Total</span><span class="price">$${course.price}</span></div>
        </div>
        <button class="button" id="confirm-purchase" style="width:100%;justify-content:center;">Complete Enrollment</button>
        <div class="purchase-secure" style="margin-top:16px;">🔒 Secure checkout · 30-day guarantee</div>
      </div>
    </div>
  `
  document.body.appendChild(overlay)
  requestAnimationFrame(() => overlay.classList.add('open'))

  document.getElementById('modal-close').addEventListener('click', () => closeCheckout(overlay))
  overlay.addEventListener('click', (e) => { if (e.target === overlay) closeCheckout(overlay) })

  document.getElementById('confirm-purchase').addEventListener('click', () => {
    const result = enrollInCourse(course.id)
    if (result.error) {
      showToast(result.error)
      return
    }
    // Show success state
    document.getElementById('checkout-body').innerHTML = `
      <div class="checkout-success">
        <div class="icon">✓</div>
        <h3>Enrollment complete!</h3>
        <p>You're now enrolled in "${course.title}". Let's start learning!</p>
        <a href="#/player/${course.id}" class="button" id="go-to-player">Go to Course Player →</a>
      </div>
    `
    document.getElementById('go-to-player').addEventListener('click', () => {
      closeCheckout(overlay)
    })
    showToast('Enrollment successful! Redirecting to course player...')
  })
}

function closeCheckout(overlay) {
  overlay.classList.remove('open')
  setTimeout(() => overlay.remove(), 300)
}
