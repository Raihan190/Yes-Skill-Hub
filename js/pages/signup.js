// ============================================================
// Signup Page
// ============================================================

import { registerUser } from '../auth.js'

export function renderSignup(container) {
  container.innerHTML = `
    <div class="auth-page">
      <div class="auth-visual">
        <div class="auth-visual-content">
          <a href="#/" class="brand"><span class="brand-mark">YS</span><span>Yes Skill<br><em>Hub</em></span></a>
          <h2>Start free.<br>Learn by building.</h2>
          <p>Join 47,000+ students building real-world skills. Create an account to track progress, save courses, and earn certificates.</p>
          <div class="auth-visual-stats">
            <div class="auth-visual-stat"><div class="num">47K+</div><div class="lbl">Active students</div></div>
            <div class="auth-visual-stat"><div class="num">8+</div><div class="lbl">Expert courses</div></div>
            <div class="auth-visual-stat"><div class="num">92%</div><div class="lbl">Completion rate</div></div>
          </div>
        </div>
      </div>
      <div class="auth-form-side">
        <div class="auth-form-wrap">
          <h1>Create account</h1>
          <p class="sub">Start learning in minutes — it's free to join.</p>

          <div class="form-message" id="form-message"></div>

          <form id="signup-form" novalidate>
            <div class="form-field" id="field-name">
              <label for="signup-name">Full name</label>
              <input type="text" id="signup-name" placeholder="Jane Doe" />
              <div class="error">Please enter your full name.</div>
            </div>
            <div class="form-field" id="field-email">
              <label for="signup-email">Email</label>
              <input type="email" id="signup-email" placeholder="you@example.com" />
              <div class="error">Please enter a valid email address.</div>
            </div>
            <div class="form-field" id="field-password">
              <label for="signup-password">Password</label>
              <input type="password" id="signup-password" placeholder="At least 6 characters" />
              <div class="error">Password must be at least 6 characters.</div>
            </div>
            <div class="form-field" id="field-confirm">
              <label for="signup-confirm">Confirm password</label>
              <input type="password" id="signup-confirm" placeholder="Re-enter password" />
              <div class="error">Passwords do not match.</div>
            </div>
            <div class="form-field" id="field-terms" style="display:flex;flex-direction:row;align-items:center;gap:8px;">
              <input type="checkbox" id="signup-terms" style="width:16px;height:16px;accent-color:var(--blue-600);" />
              <label for="signup-terms" style="margin:0;font-weight:400;font-size:14px;color:var(--gray-600);">I agree to the <a href="#/terms" class="form-link">Terms</a> and <a href="#/privacy" class="form-link">Privacy Policy</a></label>
              <div class="error" style="width:100%;">You must accept the terms.</div>
            </div>
            <button type="submit" class="button">Create account</button>
          </form>

          <div class="auth-divider">or sign up with</div>
          <div class="social-buttons">
            <button class="social-btn" onclick="event.preventDefault()">G Google</button>
            <button class="social-btn" onclick="event.preventDefault()">  GitHub</button>
          </div>

          <p class="auth-switch" style="margin-top:28px;">Already have an account? <a href="#/login" class="form-link">Log in</a></p>
        </div>
      </div>
    </div>
  `

  window.__pageInit = () => {
    const form = document.getElementById('signup-form')
    const msg = document.getElementById('form-message')

    form.addEventListener('submit', (e) => {
      e.preventDefault()
      const name = document.getElementById('signup-name').value.trim()
      const email = document.getElementById('signup-email').value.trim()
      const password = document.getElementById('signup-password').value
      const confirm = document.getElementById('signup-confirm').value
      const terms = document.getElementById('signup-terms').checked

      let valid = true

      const nameField = document.getElementById('field-name')
      const emailField = document.getElementById('field-email')
      const passField = document.getElementById('field-password')
      const confirmField = document.getElementById('field-confirm')
      const termsField = document.getElementById('field-terms')

      if (!name || name.length < 2) { nameField.classList.add('has-error'); valid = false }
      else nameField.classList.remove('has-error')

      if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) { emailField.classList.add('has-error'); valid = false }
      else emailField.classList.remove('has-error')

      if (!password || password.length < 6) { passField.classList.add('has-error'); valid = false }
      else passField.classList.remove('has-error')

      if (confirm !== password) { confirmField.classList.add('has-error'); valid = false }
      else confirmField.classList.remove('has-error')

      if (!terms) { termsField.classList.add('has-error'); valid = false }
      else termsField.classList.remove('has-error')

      if (!valid) return

      const result = registerUser({ name, email, password })
      if (result.error) {
        msg.textContent = result.error
        msg.className = 'form-message error show'
      } else {
        msg.textContent = 'Account created! Redirecting...'
        msg.className = 'form-message success show'
        setTimeout(() => location.hash = '#/my-classes', 1000)
      }
    })

    // Clear errors on input
    ;['signup-name', 'signup-email', 'signup-password', 'signup-confirm', 'signup-terms'].forEach(id => {
      document.getElementById(id).addEventListener('input', () => {
        document.querySelectorAll('.form-field').forEach(f => f.classList.remove('has-error'))
        msg.classList.remove('show')
      })
    })
  }
}
