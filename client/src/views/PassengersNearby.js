import { drawMultipleMarkers, initGoogleMap } from "../components/MapGoogle.js";
import { getMatches } from "../services/usersServices.js";
import { loadGoogleMaps } from "../utils/googleMapsLoader.js";

export function PassengersNearby() {
    return `
    <div class="border-2 border-gray-300 rounded-xl" id="map" style="height: 400px;"></div>
   `;
}

const API_KEY_TEST = "";
export async function initPassengersNearbyView() {
     await loadGoogleMaps(API_KEY_TEST);
  initGoogleMap("map", 6.219186319336883, -75.5836256336475);
  const matches = await getMatches();
  console.log(matches);
  
  
  drawMultipleMarkers(matches.matches)
}


async function startMap() {
 
}
