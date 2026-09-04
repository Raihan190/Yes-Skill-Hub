// ============================================================
// Yes Skill Hub — Auth & Enrollment (localStorage mock layer)
// Designed to be swapped for Supabase auth + database later.
// ============================================================

const USERS_KEY = 'ysh_users';
const SESSION_KEY = 'ysh_session';
const ENROLLMENTS_KEY = 'ysh_enrollments';
const PROGRESS_KEY = 'ysh_progress';
const BOOKMARKS_KEY = 'ysh_bookmarks';

function readJSON(key, fallback) {
  try {
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) : fallback;
  } catch {
    return fallback;
  }
}

function writeJSON(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
}

// ---- User management ----

export function getUsers() {
  return readJSON(USERS_KEY, []);
}

export function getCurrentUser() {
  return readJSON(SESSION_KEY, null);
}

export function isLoggedIn() {
  return !!getCurrentUser();
}

export function registerUser({ name, email, password }) {
  const users = getUsers();
  if (users.some(u => u.email === email)) {
    return { error: 'An account with this email already exists.' };
  }
  const user = {
    id: 'u_' + Date.now(),
    name,
    email,
    password,
    joinedAt: new Date().toISOString(),
    avatar: null,
  };
  users.push(user);
  writeJSON(USERS_KEY, users);
  writeJSON(SESSION_KEY, { id: user.id, name: user.name, email: user.email, joinedAt: user.joinedAt });
  return { user };
}

export function loginUser(email, password) {
  const users = getUsers();
  const user = users.find(u => u.email === email && u.password === password);
  if (!user) {
    return { error: 'Invalid email or password.' };
  }
  writeJSON(SESSION_KEY, { id: user.id, name: user.name, email: user.email, joinedAt: user.joinedAt });
  return { user };
}

export function logoutUser() {
  localStorage.removeItem(SESSION_KEY);
}

// ---- Enrollments ----

export function getEnrollments() {
  return readJSON(ENROLLMENTS_KEY, []);
}

export function isEnrolled(courseId) {
  const user = getCurrentUser();
  if (!user) return false;
  return getEnrollments().some(e => e.userId === user.id && e.courseId === courseId);
}

export function enrollInCourse(courseId) {
  const user = getCurrentUser();
  if (!user) return { error: 'Please log in to enroll.' };
  const enrollments = getEnrollments();
  if (enrollments.some(e => e.userId === user.id && e.courseId === courseId)) {
    return { enrolled: true };
  }
  enrollments.push({
    userId: user.id,
    courseId,
    enrolledAt: new Date().toISOString(),
    progress: 0,
    lastLesson: null,
  });
  writeJSON(ENROLLMENTS_KEY, enrollments);
  return { enrolled: true };
}

export function updateProgress(courseId, lessonKey, progressPercent) {
  const user = getCurrentUser();
  if (!user) return;
  const enrollments = getEnrollments();
  const idx = enrollments.findIndex(e => e.userId === user.id && e.courseId === courseId);
  if (idx === -1) return;
  enrollments[idx].progress = progressPercent;
  enrollments[idx].lastLesson = lessonKey;
  enrollments[idx].lastWatchedAt = new Date().toISOString();
  writeJSON(ENROLLMENTS_KEY, enrollments);
}

export function getMyEnrollments() {
  const user = getCurrentUser();
  if (!user) return [];
  return getEnrollments().filter(e => e.userId === user.id);
}

// ---- Bookmarks ----

export function getBookmarks() {
  const user = getCurrentUser();
  if (!user) return [];
  return readJSON(BOOKMARKS_KEY, []).filter(b => b.userId === user.id);
}

export function toggleBookmark(courseId) {
  const user = getCurrentUser();
  if (!user) return { error: 'Please log in to bookmark courses.' };
  const all = readJSON(BOOKMARKS_KEY, []);
  const idx = all.findIndex(b => b.userId === user.id && b.courseId === courseId);
  if (idx === -1) {
    all.push({ userId: user.id, courseId, savedAt: new Date().toISOString() });
  } else {
    all.splice(idx, 1);
  }
  writeJSON(BOOKMARKS_KEY, all);
  return { bookmarked: idx === -1 };
}

export function isBookmarked(courseId) {
  const user = getCurrentUser();
  if (!user) return false;
  return readJSON(BOOKMARKS_KEY, []).some(b => b.userId === user.id && b.courseId === courseId);
}

// ---- Completed lessons (for course player) ----

export function getCompletedLessons(courseId) {
  const user = getCurrentUser();
  if (!user) return [];
  const key = `${PROGRESS_KEY}_${user.id}_${courseId}`;
  return readJSON(key, []);
}

export function toggleLessonComplete(courseId, lessonKey) {
  const user = getCurrentUser();
  if (!user) return [];
  const key = `${PROGRESS_KEY}_${user.id}_${courseId}`;
  const completed = readJSON(key, []);
  const idx = completed.indexOf(lessonKey);
  if (idx === -1) {
    completed.push(lessonKey);
  } else {
    completed.splice(idx, 1);
  }
  writeJSON(key, completed);
  return completed;
}
