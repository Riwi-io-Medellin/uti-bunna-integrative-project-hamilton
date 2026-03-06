export function HomeView() {
  return `
    <div class="min-h-screen flex items-center justify-center">
      <h1 class="text-2xl font-bold text-gray-900">Bienvenido al Home</h1>
    </div>
  `
}

export function initHomeView() {
  document.getElementById('logoutBtn')?.addEventListener('click', () => {
    clearSession()
    location.hash = '/login'
  })
}