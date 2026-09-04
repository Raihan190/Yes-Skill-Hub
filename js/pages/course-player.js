// ============================================================
// Course Player Page
// ============================================================

import { getCourseById, getInstructorById } from '../data.js'
import { isLoggedIn, isEnrolled, getCompletedLessons, toggleLessonComplete, updateProgress } from '../auth.js'
import { showToast } from '../../main.js'

export function renderCoursePlayer(container, params) {
  const course = getCourseById(params.id)

  if (!course) {
    container.innerHTML = `
      <section class="page-hero"><div class="container">
        <h1>Course not found</h1>
        <a href="#/courses" class="button" style="margin-top:24px;">Browse courses →</a>
      </div></section>
    `
    return
  }

  if (!isLoggedIn()) {
    container.innerHTML = `
      <section class="page-hero"><div class="container">
        <h1>Please log in</h1>
        <p>You need to be logged in to access the course player.</p>
        <a href="#/login" class="button" style="margin-top:24px;">Log in →</a>
      </div></section>
    `
    return
  }

  if (!isEnrolled(course.id)) {
    container.innerHTML = `
      <section class="page-hero"><div class="container">
        <h1>Not enrolled</h1>
        <p>You need to enroll in this course before you can access the player.</p>
        <a href="#/course/${course.id}" class="button" style="margin-top:24px;">View course details →</a>
      </div></section>
    `
    return
  }

  const instructor = getInstructorById(course.instructorId)
  const allLessons = course.curriculum.flatMap((section, si) =>
    section.lessons.map((lesson, li) => ({ ...lesson, key: `${si}-${li}`, sectionIndex: si, lessonIndex: li, sectionName: section.section }))
  )
  let completed = getCompletedLessons(course.id)

  // Determine starting lesson
  const savedLastLesson = JSON.parse(localStorage.getItem('ysh_enrollments') || '[]')
    .find(e => e.courseId === course.id && e.userId === JSON.parse(localStorage.getItem('ysh_session') || 'null')?.id)
  let currentLessonKey = savedLastLesson?.lastLesson || allLessons[0].key

  function getCurrentIndex() {
    return allLessons.findIndex(l => l.key === currentLessonKey)
  }

  function getProgressPercent() {
    return Math.round((completed.length / allLessons.length) * 100)
  }

  function renderShell() {
    const lesson = allLessons[getCurrentIndex()] || allLessons[0]
    const isCompleted = completed.includes(lesson.key)
    const progress = getProgressPercent()
    const currentIdx = getCurrentIndex()
    const hasPrev = currentIdx > 0
    const hasNext = currentIdx < allLessons.length - 1

    container.innerHTML = `
      <section class="course-player-page">
        <div class="player-layout">
          <div class="player-main">
            <button class="player-mobile-toggle" id="sidebar-toggle">☰ Curriculum</button>
            <div class="player-course-title">${course.title}</div>
            <div class="player-lesson-title" id="lesson-title">${lesson.title}</div>

            <div class="player-progress-row">
              <div class="player-progress-bar"><i style="width:${progress}%"></i></div>
              <div class="player-progress-text">${progress}% complete · ${completed.length}/${allLessons.length} lessons</div>
            </div>

            <div class="player-video-area">
              <img src="${course.thumbnail}" alt="${course.title}" />
              <div class="player-video-overlay">
                <button class="player-play-btn" id="play-btn">▶</button>
                <div class="lesson-title">${lesson.title}</div>
              </div>
            </div>

            <div class="player-nav-buttons">
              <button class="player-nav-btn" id="prev-btn" ${!hasPrev ? 'disabled' : ''}>← Previous</button>
              <button class="player-nav-btn" id="next-btn" ${!hasNext ? 'disabled' : ''}>Next →</button>
              <button class="player-complete-btn ${isCompleted ? 'done' : ''}" id="complete-btn">
                ${isCompleted ? '✓ Completed' : 'Mark complete'}
              </button>
            </div>

            <div class="player-tabs">
              <div class="player-tab active" data-tab="overview">Overview</div>
              <div class="player-tab" data-tab="notes">Notes</div>
              <div class="player-tab" data-tab="resources">Resources</div>
            </div>

            <div class="player-tab-panel active" data-panel="overview">
              <p style="font-size:16px;color:var(--text-on-dark-muted);line-height:1.7;">
                ${lesson.type === 'video' ? `In this lesson, you'll learn about ${lesson.title.toLowerCase()}. The video is ${lesson.duration} long.` : ''}
                ${lesson.type === 'lab' ? `This is a hands-on lab. Follow along with the instructor to build the project step by step. Duration: ${lesson.duration}.` : ''}
                ${lesson.type === 'doc' ? `This is a reading resource. Review the document at your own pace. Estimated reading time: ${lesson.duration}.` : ''}
              </p>
              <div style="margin-top:20px;padding:20px;background:rgba(255,255,255,0.04);border-radius:var(--radius);border:1px solid var(--border-dark);">
                <div style="font-size:13px;color:var(--text-on-dark-muted);margin-bottom:8px;">Section: ${lesson.sectionName}</div>
                <div style="font-size:14px;color:var(--text-on-dark);">Lesson type: <span style="text-transform:uppercase;font-weight:600;color:var(--cyan-400);">${lesson.type}</span> · Duration: ${lesson.duration}</div>
              </div>
            </div>

            <div class="player-tab-panel" data-panel="notes">
              <textarea class="player-notes-area" id="notes-area" placeholder="Write your notes for this lesson here..."></textarea>
              <button class="button button-small player-notes-save" id="save-notes">Save notes</button>
            </div>

            <div class="player-tab-panel" data-panel="resources">
              <div class="player-resources">
                ${course.documents.map(doc => `
                  <div class="player-resource">
                    <div class="doc-icon">${doc.type}</div>
                    <div class="doc-info">
                      <div class="name">${doc.name}</div>
                      <div class="meta">${doc.type} · ${doc.size}</div>
                    </div>
                    <a class="doc-download" href="#" onclick="event.preventDefault()">Download ↓</a>
                  </div>
                `).join('')}
              </div>
            </div>
          </div>

          <aside class="player-sidebar" id="player-sidebar">
            <div class="player-sidebar-header">
              <h3>${course.title}</h3>
              <div class="meta">${allLessons.length} lessons · ${course.duration}</div>
            </div>
            <div class="player-curriculum" id="player-curriculum">
              ${course.curriculum.map((section, si) => `
                <div class="player-curriculum-section">
                  <div class="player-curriculum-section-header">${section.section}</div>
                  ${section.lessons.map((lesson, li) => {
                    const key = `${si}-${li}`
                    const isDone = completed.includes(key)
                    const isActive = key === currentLessonKey
                    return `
                      <div class="player-curriculum-lesson ${isActive ? 'active' : ''} ${isDone ? 'completed' : ''}" data-lesson-key="${key}">
                        <span class="check">${isDone ? '✓' : ''}</span>
                        <span>${lesson.title}</span>
                        <span class="dur">${lesson.duration}</span>
                      </div>
                    `
                  }).join('')}
                </div>
              `).join('')}
            </div>
          </aside>
        </div>
      </section>
    `

    bindEvents()
  }

  function bindEvents() {
    // Lesson navigation
    document.querySelectorAll('.player-curriculum-lesson').forEach(el => {
      el.addEventListener('click', () => {
        currentLessonKey = el.dataset.lessonKey
        updateProgress(course.id, currentLessonKey, getProgressPercent())
        renderShell()
      })
    })

    // Prev/Next
    document.getElementById('prev-btn')?.addEventListener('click', () => {
      const idx = getCurrentIndex()
      if (idx > 0) {
        currentLessonKey = allLessons[idx - 1].key
        updateProgress(course.id, currentLessonKey, getProgressPercent())
        renderShell()
      }
    })
    document.getElementById('next-btn')?.addEventListener('click', () => {
      const idx = getCurrentIndex()
      if (idx < allLessons.length - 1) {
        currentLessonKey = allLessons[idx + 1].key
        updateProgress(course.id, currentLessonKey, getProgressPercent())
        renderShell()
      }
    })

    // Mark complete
    document.getElementById('complete-btn')?.addEventListener('click', () => {
      completed = toggleLessonComplete(course.id, currentLessonKey)
      updateProgress(course.id, currentLessonKey, getProgressPercent())
      showToast(completed.includes(currentLessonKey) ? 'Lesson marked complete!' : 'Lesson unmarked')
      renderShell()
    })

    // Tabs
    document.querySelectorAll('.player-tab').forEach(tab => {
      tab.addEventListener('click', () => {
        document.querySelectorAll('.player-tab').forEach(t => t.classList.remove('active'))
        document.querySelectorAll('.player-tab-panel').forEach(p => p.classList.remove('active'))
        tab.classList.add('active')
        document.querySelector(`[data-panel="${tab.dataset.tab}"]`)?.classList.add('active')
      })
    })

    // Notes
    const notesArea = document.getElementById('notes-area')
    const notesKey = `ysh_notes_${course.id}_${currentLessonKey}`
    if (notesArea) {
      notesArea.value = localStorage.getItem(notesKey) || ''
      document.getElementById('save-notes')?.addEventListener('click', () => {
        localStorage.setItem(notesKey, notesArea.value)
        showToast('Notes saved!')
      })
    }

    // Mobile sidebar toggle
    document.getElementById('sidebar-toggle')?.addEventListener('click', () => {
      document.getElementById('player-sidebar')?.classList.toggle('open')
    })

    // Play button
    document.getElementById('play-btn')?.addEventListener('click', () => {
      showToast('Video playback would start here in production.')
    })
  }

  renderShell()

  window.__pageInit = () => {}
}
