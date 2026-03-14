import ListMatches from "../components/Driver/ListMatches.js";
import { NavBar } from "../components/Driver/NavBar.js";
import { SkeletonListMatches } from "../components/Driver/SkeletonListMatches.js";
import { Header } from "../components/Header.js";
import { getMatches } from "../services/usersServices.js";

export async function MatchesView() {

    return `
    <div class="bg-gray-50 font-sans flex justify-center">

    ${Header()}
    <div class="w-full max-w-md bg-white min-h-screen shadow-xl flex flex-col relative">
        
        <div class="p-6 -mt-4 bg-white rounded-t-3xl z-10">
            <div class="flex justify-between items-center mb-4">
                <div>
                    <h2 id="total-passengers" class="text-2xl font-bold text-gray-800">0 Passengers Nearby</h2>
                    <p class="text-sm text-gray-400">Available on your current route</p>
                </div>
            </div>

        </div>

        <div id="matches-list" class="px-6 space-y-4 pb-24">
            ${SkeletonListMatches()}
        </div>

        ${NavBar()}

    </div>
</div>
    `
}

export async function initMatchesView() {
    const data = await getMatches();
    const matchesList = document.getElementById("matches-list");
    const totalPassengers = document.getElementById("total-passengers");
    totalPassengers.innerHTML = data.total + " Passengers Nearby";
    matchesList.innerHTML = ListMatches(data.matches);
}

//current route
/*   <div class="relative h-48 bg-blue-50 overflow-hidden">
            
            <div class="absolute top-4 left-4 right-4 bg-white/90 backdrop-blur-sm p-4 rounded-xl shadow-lg border border-white">
                <div class="flex justify-between text-xs text-blue-600 font-bold mb-2">
                    <span>CURRENT ROUTE</span>
                    <span>12 min remaining</span>
                </div>
                <div class="flex gap-3">
                    <div class="flex flex-col items-center gap-1">
                        <div class="w-3 h-3 border-2 border-blue-600 rounded-full"></div>
                        <div class="w-0.5 h-6 bg-gray-300"></div>
                        <i class="fas fa-map-marker-alt text-red-500"></i>
                    </div>
                    <div>
                        <p class="font-bold text-gray-800 text-sm">Bole International Airport</p>
                        <p class="text-xs text-gray-500">Friendship Business Center, Addis Ababa</p>
                    </div>
                </div>
            </div>
        </div> */