import markerRiwiIcon from "../assets/marker_riwi.ico";
import markerCoder from "../assets/marker-coder.png";
export function MapGoogle() {
  return `
    <div id="map" style="height: 500px; width: 100%;"></div>
    `
}

let map;
let marker;
let markerRiwi;

export function initGoogleMap(containerId, lat, lng) {
  const position = { lat, lng };

  map = new google.maps.Map(document.getElementById(containerId), {
    center: position,
    zoom: 15,
    disableDefaultUI: true
  });

  marker = new google.maps.Marker({
    position,
    map,
    icon: {
      url: markerRiwiIcon,
      scaledSize: new google.maps.Size(50, 50) // tamaño del icono
    }
  });

  /*   map.addListener("click", (e) => {
      marker.setPosition(e.latLng);
    }); */

  return map;
}
export function initGoogleMapRegister(containerId, lat, lng) {
  const position = { lat, lng };

  map = new google.maps.Map(document.getElementById(containerId), {
    center: position,
    zoom: 15,
    disableDefaultUI: true
  });

  markerRiwi = new google.maps.Marker({
    position,
    map,
    icon: {
      url: markerRiwiIcon,
      scaledSize: new google.maps.Size(50, 50) // tamaño del icono
    }
  });
  marker = new google.maps.Marker({
    position: null,
    map,
  });

  //set marker position when click
  map.addListener("click", (e) => {
    marker.setPosition(e.latLng);
    console.log(getMarkerPosition());

    const geocoder = new google.maps.Geocoder();
    geocoder.geocode({ location: e.latLng }, (results, status) => {
      if (status === "OK" && results[0]) {
        const inputLocation = document.getElementById("location");
        if (inputLocation) {
          inputLocation.value = results[0].formatted_address;
        }
      } else {
        console.error("Geocoder failed due to: " + status);
      }
    });
  });

  return map;
}

export function getMarkerPosition() {
  if (!marker) return null;

  const pos = marker.getPosition();

  return {
    lat: pos.lat(),
    lng: pos.lng(),
  };
}

export function updateMapPosition(lat, lng) {
  const pos = { lat, lng };

  map.setCenter(pos);
  marker.setPosition(pos);
}

// Arreglo para guardar las referencias de los nuevos marcadores

let markersList = [];
export function drawMultipleMarkers(locations) {
  //remove previous markers
  markersList.forEach(m => m.setMap(null));
  markersList = [];
  const driverPosition = { lat: JSON.parse(locations.driverRoute).coordinates[0][1], lng: JSON.parse(locations.driverRoute).coordinates[0][0] };
  locations = locations.matches;


  marker = new google.maps.Marker({
    position: driverPosition,
    map,
    icon: "https://maps.google.com/mapfiles/ms/icons/red-dot.png"
  });

  if (!map) {
    console.error("El mapa aún no ha sido inicializado");
    return;
  }

  //add bounds to map to fit all markers
  const bounds = new google.maps.LatLngBounds();

  locations.forEach(location => {

    const position = {
      lat: JSON.parse(location.location).coordinates[1],
      lng: JSON.parse(location.location).coordinates[0]
    };

    const marker = new google.maps.Marker({
      position,
      map,
      icon: {
        url: markerCoder,
        scaledSize: new google.maps.Size(25, 30) // tamaño del icono
      }
    });

    //add marker to bounds
    bounds.extend(position); // agregar marker al bounds

    const user = JSON.parse(localStorage.getItem('user')) || {};
    const isDriver = user.role === 'driver';

    const infoWindow = new google.maps.InfoWindow({
      content: `
      <div class="w-[200px]">
        <img src="https://api.dicebear.com/7.x/adventurer/svg?seed=${location.full_name}" class="w-12 h-12 rounded-full" />
        <h3>${location.full_name}</h3>
        <p>📍 ${location.address}</p>

        <div class="flex justify-center mt-2">
          <a href="https://wa.me/57${location.phone}" 
             target="_blank"
             data-is-driver="${isDriver}" 
             data-match-id="${location.user_id}" 
             class="whatsapp-match-btn w-[50%] bg-green-500 text-white py-2 rounded-xl flex justify-center items-center gap-2 text-sm font-bold">
             <i class="fab fa-whatsapp"></i> WhatsApp
          </a>
        </div>
      </div>
      `
    });

    marker.addListener("click", () => {
      infoWindow.open(map, marker);
    });


    markersList.push(marker);
  });

  // Ajustar mapa para mostrar todos los markers
  if (locations.length > 0) {
    map.fitBounds(bounds);
  }
}
export function drawRouteGeoJSON(geojson) {


  if (!map) {
    console.error("Map not initialized");
    return;
  }

  // limpiar rutas anteriores
  map.data.forEach(feature => {
    map.data.remove(feature);
  });

  // agregar geojson
  map.data.addGeoJson({
    type: "Feature",
    geometry: geojson
  });

  // estilo de la ruta
  map.data.setStyle({
    strokeColor: "#2563eb",
    strokeWeight: 4
  });

}

export function initLandingMap(containerId) {
  const MEDELLIN_BOUNDS = {
    north: 6.35,
    south: 6.15,
    west: -75.7,
    east: -75.45,
  };

  map = new google.maps.Map(document.getElementById(containerId), {
    center: { lat: 6.2442, lng: -75.5812 },
    zoom: 12,
    minZoom: 11, // prevent zooming out too much
    restriction: {
      latLngBounds: MEDELLIN_BOUNDS,
      strictBounds: false,
    },
    disableDefaultUI: true,
    zoomControl: true, // allow users to zoom
  });

  return map;
}