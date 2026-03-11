import { render } from "../core/render.js";
import { landingPage } from "../views/landingPages.js";
import { RegisterForm, initRegisterForm } from "../views/RegisterForm.js";
import { LoginView, initLoginView } from "../views/login.js";
import { HomeView, initHomeView } from "../views/home.js";
import { isLoggedIn } from "../utils/utils.js";
import { initMatchesView, MatchesView } from "../views/MatchesView.js";

export async function router() {
  const hash = location.hash || "#/landingPage";
  if (!location.hash) location.hash = "#/";

  const [, route] = hash.split("/");

  const publicRoutes = ["login", "register", "landingPage"];
  const privateRoutes = ["home" , "myroute",  "matches"];

  if (isLoggedIn() && publicRoutes.includes(route)) {
    location.hash = '#/home'
    return
  }

  if (!isLoggedIn() && privateRoutes.includes(route)) {
    location.hash = '#/login'
    return
  }

  const routes = {
    landingPage: { view: landingPage },
    login: { view: LoginView, init: initLoginView },
    register: { view: RegisterForm, init: initRegisterForm },
    home: { view: HomeView, init: initHomeView },
    matches: { view: MatchesView, init: initMatchesView },
    myroute : {view: () => "<p>my route</p><a href='#/matches'>myroute</a>"}
    
  };

  const routeConfig = routes[route];

  if (!routeConfig) {
    location.hash = '#/login'
    return
  }

  render(await routeConfig.view());
  routeConfig.init?.();
}
/* MODO DESARROLLO — Sin base de datos
 * Por ahora puedes ingresar cualquier email y contraseña para acceder.
 * Para cerrar sesión y volver al login, abre la consola (F12) y ejecuta:
 * localStorage.removeItem('token') y recarga la página */
