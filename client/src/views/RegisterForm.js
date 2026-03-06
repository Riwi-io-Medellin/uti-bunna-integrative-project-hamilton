export function RegisterForm() {
    return `
   <h1>Register</h1>
   `
}

export function initRegisterForm() {
  document.getElementById('loginLink')?.addEventListener('click', (e) => {
    e.preventDefault()
    location.hash = '/login'
  })
}