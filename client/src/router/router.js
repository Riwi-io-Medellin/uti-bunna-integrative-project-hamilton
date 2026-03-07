import { render } from "../core/render.js"
import { RegisterForm, initRegisterForm } from "../views/RegisterForm.js"
import { LoginView, initLoginView } from "../views/login.js"
import { HomeView, initHomeView } from "../views/home.js"
import { isLoggedIn } from "../utils/utils.js"

export function router() {
  const hash = location.hash || '#/login'
  if (!location.hash) location.hash = '/login'

  const [, route] = hash.split('/')

  const publicRoutes  = ['login', 'register']
  const privateRoutes = ['home']

  if (isLoggedIn() && publicRoutes.includes(route)) {
    location.hash = '/home'
    return
  }

  if (!isLoggedIn() && privateRoutes.includes(route)) {
    location.hash = '/login'
    return
  }

  const routes = {
    'login':    { view: LoginView,    init: initLoginView    },
    'register': { view: RegisterForm, init: initRegisterForm },
    'home':     { view: HomeView,     init: initHomeView     }
  }

  const routeConfig = routes[route]

  if (!routeConfig) {
    location.hash = '/login'
    return
  }

  render(routeConfig.view())
  routeConfig.init?.()
}
/* MODO DESARROLLO — Sin base de datos
 * Por ahora puedes ingresar cualquier email y contraseña para acceder.
 * Para cerrar sesión y volver al login, abre la consola (F12) y ejecuta:
 * localStorage.removeItem('token') y recarga la página */