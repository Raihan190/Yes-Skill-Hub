// ============================================================
// Login Page
// ============================================================

import { loginUser } from '../auth.js'

export function renderLogin(container) {
  container.innerHTML = `
    <div class="auth-page">
      <div class="auth-visual">
        <div class="auth-visual-content">
          <a href="#/" class="brand"><span class="brand-mark">YS</span><span>Yes Skill<br><em>Hub</em></span></a>
          <h2>Welcome back.<br>Keep building.</h2>
          <p>Log in to continue your learning journey. Pick up where you left off, track your progress, and earn certificates.</p>
          <div class="auth-visual-stats">
            <div class="auth-visual-stat"><div class="num">47K+</div><div class="lbl">Active students</div></div>
            <div class="auth-visual-stat"><div class="num">8+</div><div class="lbl">Expert courses</div></div>
            <div class="auth-visual-stat"><div class="num">92%</div><div class="lbl">Completion rate</div></div>
          </div>
        </div>
      </div>
      <div class="auth-form-side">
        <div class="auth-form-wrap">
          <h1>Log in</h1>
          <p class="sub">Welcome back! Please enter your details.</p>

          <div class="form-message" id="form-message"></div>

          <form id="login-form" novalidate>
            <div class="form-field" id="field-email">
              <label for="login-email">Email</label>
              <input type="email" id="login-email" placeholder="you@example.com" />
              <div class="error">Please enter a valid email address.</div>
            </div>
            <div class="form-field" id="field-password">
              <label for="login-password">Password</label>
              <input type="password" id="login-password" placeholder="Enter your password" />
              <div class="error">Password is required.</div>
            </div>
            <div class="form-row">
              <label class="checkbox-row"><input type="checkbox" id="remember" /> Remember me</label>
              <a href="#" class="form-link" onclick="event.preventDefault();alert('Password reset link would be sent to your email.')">Forgot password?</a>
            </div>
            <button type="submit" class="button">Log in</button>
          </form>

          <div class="auth-divider">or continue with</div>
          <div class="social-buttons">
            <button class="social-btn" onclick="event.preventDefault()">G Google</button>
            <button class="social-btn" onclick="event.preventDefault()">  GitHub</button>
          </div>

          <p class="auth-switch" style="margin-top:28px;">Don't have an account? <a href="#/signup" class="form-link">Sign up</a></p>
        </div>
      </div>
    </div>
  `

  window.__pageInit = () => {
    const form = document.getElementById('login-form')
    const msg = document.getElementById('form-message')

    form.addEventListener('submit', (e) => {
      e.preventDefault()
      const email = document.getElementById('login-email').value.trim()
      const password = document.getElementById('login-password').value

      let valid = true
      const emailField = document.getElementById('field-email')
      const passField = document.getElementById('field-password')

      if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        emailField.classList.add('has-error')
        valid = false
      } else {
        emailField.classList.remove('has-error')
      }

      if (!password) {
        passField.classList.add('has-error')
        valid = false
      } else {
        passField.classList.remove('has-error')
      }

      if (!valid) return

      const result = loginUser(email, password)
      if (result.error) {
        msg.textContent = result.error
        msg.className = 'form-message error show'
      } else {
        msg.textContent = 'Login successful! Redirecting...'
        msg.className = 'form-message success show'
        setTimeout(() => location.hash = '#/my-classes', 1000)
      }
    })

    // Clear errors on input
    document.getElementById('login-email').addEventListener('input', () => {
      document.getElementById('field-email').classList.remove('has-error')
      msg.classList.remove('show')
    })
    document.getElementById('login-password').addEventListener('input', () => {
      document.getElementById('field-password').classList.remove('has-error')
      msg.classList.remove('show')
    })
  }
}
