import { render } from "../core/render.js";
import { landingPage } from "../views/landingPages.js";
import { RegisterForm, initRegisterForm } from "../views/RegisterForm.js";
import { LoginView, initLoginView } from "../views/login.js";
/*import { HomeView, initHomeView } from "../views/home.js";*/
import { isLoggedIn, getUser, startMap } from "../utils/utils.js";
import { initMatchesView, MatchesView } from "../views/MatchesView.js";
import {
  initProfileSettings,
  profileSettings,
} from "../views/profileSettings.js";
import { ContactAttemps, initContactAttempsView } from "../views/ContactAttemps.js";
import { views } from "../views/views.js";

export async function router() {
  const hash = location.hash || "#/landingPage";
  if (!location.hash) location.hash = "#/";

  const [, route] = hash.split("/");

  const publicRoutes = ["login", "register", "landingPage"];
  const privateRoutes = ["myroute", "matches", "profileSettings","contact-attemps"];

  // get user and role
  const user = getUser();
  const role = user?.role;

  // if user is logged in and route is public, redirect to home
  if (isLoggedIn() && publicRoutes.includes(route)) {
    location.hash = role === "driver" ? "#/matches" : "#/contact-attemps";
    return;
  }

  // if user is not logged in and route is private, redirect to landing page
  if (!isLoggedIn() && privateRoutes.includes(route)) {
    location.hash = "#/landingPage";
    return;
  }

  // validate access according to role
  if (isLoggedIn()) {
    const passengerOnlyRoutes = ["contact-attemps"];
    if (role !== "passenger" && passengerOnlyRoutes.includes(route)) {
      location.hash = "#/matches"; // redirect drivers to their default route
      return;
    }

    const driverOnlyRoutes = ["matches", "myroute"];
    if (role !== "driver" && driverOnlyRoutes.includes(route)) {
      location.hash = "#/contact-attemps"; // Redirigir pasajeros a su ruta por defecto
      return;
    }
  }

  const routes = {
    landingPage: { view: landingPage },
    login: { view: LoginView, init: initLoginView },
    register: { view: RegisterForm, init: initRegisterForm },
    matches: { view: MatchesView, init: initMatchesView },
    myroute: { view: views, init: startMap },
    profileSettings: {
      view: () => profileSettings(getUser()),
      init: initProfileSettings,
    },
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
