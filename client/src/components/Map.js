import { useMap } from "../utils/utils.js";

export function Map() {
    return `
    <div class="border-2 border-gray-300 rounded-xl" id="map" style="height: 400px;"></div>
    `
}

export function initMap() {
    useMap()
}

/* window.addEventListener('click', (e) => {
    if (e.target.id == 'calculate-position') {
        const mapContainer = e.target.nextElementSibling
        useMap()
    }
}) */