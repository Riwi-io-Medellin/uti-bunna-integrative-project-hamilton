export function isLoggedIn() {
  return localStorage.getItem('token') !== null
}
export function setSession(token) {
  localStorage.setItem('token', token)
}
export function clearSession() {
  localStorage.removeItem('token')
}