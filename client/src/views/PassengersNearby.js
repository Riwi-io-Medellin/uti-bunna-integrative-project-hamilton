import { NavBar } from "../components/Driver/NavBar.js";
import { drawMultipleMarkers, drawRouteGeoJSON, initGoogleMap, initGoogleMapRegister } from "../components/MapGoogle.js";
import { getMatches } from "../services/usersServices.js";
import { loadGoogleMaps } from "../utils/googleMapsLoader.js";

export function PassengersNearby() {
    return `
     <div class="p-10 -mt-4 bg-white rounded-t-3xl z-10">
            <div class="flex justify-between items-center mb-4">
                <div>
                    <h2 id="total-passengers" class="text-2xl font-bold text-gray-800">0 Pasajeros cercanos</h2>
                    <p class="text-sm text-gray-400">Disponible en su ruta actual</p>
                </div>
            </div>

        </div>
    <div class="border-2 border-gray-300 rounded-xl" id="map" style="height: 400px;"></div>
    ${NavBar()}
   `;
}


export async function initPassengersNearbyView() {
    await loadGoogleMaps();
    initGoogleMap("map", 6.219186319336883, -75.5836256336475);
    const matches = await getMatches();
    const totalPassengers = document.getElementById("total-passengers");
    totalPassengers.innerHTML = matches.total + " Pasajeros cercanos";

    drawMultipleMarkers(matches)
    drawRouteGeoJSON(JSON.parse(matches.driverRoute))
}


document.addEventListener('click', async (e) => {
    if (!e.target.closest('.whatsapp-match-btn')) return;
    if (e.target.classList.contains('whatsapp-match-btn')) {
        const whatsappBtn = e.target.closest('.whatsapp-match-btn');
        // if is driver
        const isDriver = whatsappBtn.dataset.isDriver === 'true';
        if (isDriver) {
            const matchId = whatsappBtn.dataset.matchId;
            const token = localStorage.getItem('token');

            try {
                // post to contact-attempts
                await fetch(`https://uti-bunna-integrative-project-hamilton.onrender.com/api/matches/${matchId}/accept`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`
                    },
                })
            } catch (error) {
                console.error(error);
            }
        }
    }

});

export async function initRegisterMapForm() {
    await loadGoogleMaps();
    
    initGoogleMapRegister("map", 6.219186319336883, -75.5836256336475);
}