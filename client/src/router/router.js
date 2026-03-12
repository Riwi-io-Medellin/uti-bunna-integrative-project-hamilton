import { render } from "../core/render.js";
import { landingPage } from "../views/landingPages.js";
import { RegisterForm, initRegisterForm } from "../views/RegisterForm.js";
import { LoginView, initLoginView } from "../views/login.js";
import { HomeView, initHomeView } from "../views/home.js";
import { isLoggedIn } from "../utils/utils.js";
import { initMatchesView, MatchesView } from "../views/MatchesView.js";
import { profileSettings } from "../views/profileSettings.js";
import { ContactAttemps, initContactAttempsView } from "../views/ContactAttemps.js";

export async function router() {
  const hash = location.hash || "#/landingPage";
  if (!location.hash) location.hash = "#/";

  const [, route] = hash.split("/");

  const publicRoutes = ["login", "register", "landingPage"];
  const privateRoutes = ["home", "myroute", "matches","contact-attemps"];

  if (isLoggedIn() && publicRoutes.includes(route)) {
    location.hash = "#/home";
    return;
  }

  if (!isLoggedIn() && privateRoutes.includes(route)) {
    location.hash = "#/landingPage";
    return;
  }

  const routes = {
    landingPage: { view: landingPage },
    login: { view: LoginView, init: initLoginView },
    register: { view: RegisterForm, init: initRegisterForm },
    home: { view: HomeView, init: initHomeView },
    matches: { view: MatchesView, init: initMatchesView },
    myroute: { view: () => "<p>my route</p><a href='#/matches'>myroute</a>" },
    profileSettings: { view: profileSettings },
    "contact-attemps": {view: ContactAttemps, init: initContactAttempsView}
  };

  const routeConfig = routes[route];

  if (!routeConfig) {
    location.hash = "#/landingPage";
    return;
  }

  render(await routeConfig.view());
  routeConfig.init?.();
}

/* To log out and return to the login page, open the console (F12) and run:
 * localStorage.removeItem('token') and refresh the page */
