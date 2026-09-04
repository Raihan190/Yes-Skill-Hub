// ============================================================
// My Classes Page (Student Dashboard)
// ============================================================

import { getCourseById, getInstructorById } from '../data.js'
import { getCurrentUser, getMyEnrollments, getBookmarks, getCompletedLessons } from '../auth.js'
import { courseCardHTML } from '../../main.js'

export function renderMyClasses(container) {
  const user = getCurrentUser()

  if (!user) {
    container.innerHTML = `
      <section class="page-hero"><div class="container">
        <h1>Please log in</h1>
        <p>You need to be logged in to view your classes.</p>
        <a href="#/login" class="button" style="margin-top:24px;">Log in →</a>
      </div></section>
    `
    return
  }

  const enrollments = getMyEnrollments()
  const bookmarks = getBookmarks()
  const enrolledCourses = enrollments.map(e => ({
    course: getCourseById(e.courseId),
    enrollment: e,
  })).filter(item => item.course)

  const completedCourses = enrolledCourses.filter(item => item.enrollment.progress >= 100)
  const inProgressCourses = enrolledCourses.filter(item => item.enrollment.progress < 100)
  const bookmarkedCourses = bookmarks.map(b => getCourseById(b.courseId)).filter(c => c)

  const initials = user.name.split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase()

  container.innerHTML = `
    <section class="dashboard-page">
      <div class="container">
        <div class="dashboard-welcome" data-anim="fade-up">
          <div>
            <h1>Welcome back, ${user.name.split(' ')[0]}</h1>
            <p>Continue where you left off and track your progress.</p>
          </div>
          <div class="profile-summary">
            <div class="profile-avatar">${initials}</div>
            <div class="profile-info">
              <div class="name">${user.name}</div>
              <div class="email">${user.email}</div>
            </div>
          </div>
        </div>

        <!-- Continue learning -->
        <div class="dashboard-grid" data-anim="fade-up">
          <div class="dashboard-card">
            <h2>Continue learning <span class="count">${inProgressCourses.length} active</span></h2>
            ${inProgressCourses.length === 0
              ? `<div class="empty-state"><p>You haven't enrolled in any courses yet.</p><a href="#/courses" class="button button-small">Browse courses →</a></div>`
              : inProgressCourses.map(item => {
                  const c = item.course
                  const inst = getInstructorById(c.instructorId)
                  const completed = getCompletedLessons(c.id)
                  const totalLessons = c.curriculum.reduce((s, sec) => s + sec.lessons.length, 0)
                  const progress = totalLessons > 0 ? Math.round((completed.length / totalLessons) * 100) : item.enrollment.progress
                  return `
                    <div class="enrolled-course">
                      <img src="${c.thumbnail}" alt="${c.title}" loading="lazy" />
                      <div class="enrolled-course-info">
                        <h3>${c.title}</h3>
                        <div class="inst">by ${inst?.name || ''}</div>
                        <div class="progress-bar"><i style="width:${progress}%"></i></div>
                        <div class="progress-text"><span>${progress}% complete</span><span>${completed.length}/${totalLessons} lessons</span></div>
                      </div>
                      <div class="enrolled-course-actions">
                        <a href="#/player/${c.id}" class="btn-continue">Continue →</a>
                      </div>
                    </div>
                  `
                }).join('')
            }
          </div>

          <!-- Stats sidebar -->
          <div class="dashboard-card">
            <h2>Your stats</h2>
            <div style="display:flex;flex-direction:column;gap:20px;">
              <div>
                <div style="font-size:32px;font-weight:800;font-family:var(--font-display);background:var(--grad-primary);-webkit-background-clip:text;-webkit-text-fill-color:transparent;">${enrolledCourses.length}</div>
                <div style="font-size:14px;color:var(--text-muted);">Enrolled courses</div>
              </div>
              <div>
                <div style="font-size:32px;font-weight:800;font-family:var(--font-display);background:var(--grad-cyan);-webkit-background-clip:text;-webkit-text-fill-color:transparent;">${completedCourses.length}</div>
                <div style="font-size:14px;color:var(--text-muted);">Completed courses</div>
              </div>
              <div>
                <div style="font-size:32px;font-weight:800;font-family:var(--font-display);background:var(--grad-purple);-webkit-background-clip:text;-webkit-text-fill-color:transparent;">${bookmarkedCourses.length}</div>
                <div style="font-size:14px;color:var(--text-muted);">Saved courses</div>
              </div>
            </div>
          </div>
        </div>

        <!-- Completed courses -->
        ${completedCourses.length > 0 ? `
          <div class="dashboard-card" style="margin-bottom:24px;" data-anim="fade-up">
            <h2>Completed courses <span class="count">${completedCourses.length}</span></h2>
            ${completedCourses.map(item => {
              const c = item.course
              return `
                <div class="enrolled-course">
                  <img src="${c.thumbnail}" alt="${c.title}" loading="lazy" />
                  <div class="enrolled-course-info">
                    <h3>${c.title}</h3>
                    <div class="inst">Completed</div>
                    <div class="progress-bar"><i style="width:100%"></i></div>
                    <div class="progress-text"><span>100% complete</span><span>✓ Done</span></div>
                  </div>
                  <div class="enrolled-course-actions">
                    <a href="#/player/${c.id}" class="btn-continue" style="background:var(--success-500);">Review →</a>
                  </div>
                </div>
              `
            }).join('')}
          </div>
        ` : ''}

        <!-- Certificates -->
        <div class="dashboard-card" style="margin-bottom:24px;" data-anim="fade-up">
          <h2>Certificates <span class="count">${completedCourses.length}</span></h2>
          ${completedCourses.length === 0
            ? `<div class="empty-state"><p>Complete a course to earn a certificate.</p></div>`
            : completedCourses.map(item => {
                const c = item.course
                return `
                  <div class="cert-item">
                    <div class="cert-icon">🏆</div>
                    <div class="cert-info">
                      <div class="name">${c.title}</div>
                      <div class="date">Completed on ${new Date(item.enrollment.enrolledAt).toLocaleDateString()}</div>
                    </div>
                    <a class="cert-download" href="#" onclick="event.preventDefault()">Download ↓</a>
                  </div>
                `
              }).join('')
          }
        </div>

        <!-- Bookmarked courses -->
        <div class="dashboard-card" data-anim="fade-up">
          <h2>Saved courses <span class="count">${bookmarkedCourses.length}</span></h2>
          ${bookmarkedCourses.length === 0
            ? `<div class="empty-state"><p>No saved courses yet. Bookmark courses to find them quickly later.</p><a href="#/courses" class="button button-small">Browse courses →</a></div>`
            : `<div class="course-grid">${bookmarkedCourses.map(c => courseCardHTML(c)).join('')}</div>`
          }
        </div>
      </div>
    </section>
  `

  window.__pageInit = () => {}
}
