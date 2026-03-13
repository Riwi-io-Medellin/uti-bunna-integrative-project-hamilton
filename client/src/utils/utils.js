export function isLoggedIn() {
  return localStorage.getItem("token") !== null;
}

export function setSession(token, user) {
  localStorage.setItem("token", token);
  localStorage.setItem("user", JSON.stringify(user));
}

export function clearSession() {
  localStorage.removeItem("token");
  localStorage.removeItem("user");
}

export function getUser() {
  const user = localStorage.getItem("user");
  return user ? JSON.parse(user) : null;
}

//Map functions
let map;
let marker;
function obtenerUbicacion() {
  return new Promise((resolve, reject) => {
    navigator.geolocation.getCurrentPosition(resolve, reject, {
      enableHighAccuracy: true,
      timeout: 10000,
      maximumAge: 0,
    });
  });
}
export function useMap() {
  var lat = 6.219186319336883;
  var lng = -75.5836256336475;

  /* Dibujar el mapa en medellín */
  map = L.map("map").setView([lat, lng], 16);

  L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    attribution: "© OpenStreetMap",
  }).addTo(map);

  getAddress(lat, lng);
  marker = L.marker([lat, lng]).addTo(map);

  /*   obtenerUbicacion()
     .then(pos => {
       console.log("Lat:", pos.coords.latitude);
       console.log("Lon:", pos.coords.longitude);
 
       let latCurrent = pos.coords.latitude;
       let lngCurrent = pos.coords.longitude;
 
       // Centrar mapa en ubicación actual
       map.setView([latCurrent, lngCurrent], 16);
 
       // Crear marcador inicial
       marker = L.marker([latCurrent, lngCurrent]).addTo(map);
 
 
       getAddress(latCurrent, lngCurrent);
       
 
       map.setView([latCurrent, lngCurrent], 16);
       if (marker) {
         marker.setLatLng([latCurrent, lngCurrent]);
       } else {
         marker = L.marker([latCurrent, lngCurrent]).addTo(map);
       }
     })
     .catch(err => {
       console.error(err.message);
     }); */

  map.on("click", function (e) {
    lat = e.latlng.lat;
    lng = e.latlng.lng;

    if (marker) {
      marker.setLatLng(e.latlng);
    } else {
      marker = L.marker(e.latlng).addTo(map);
    }

    getAddress(lat, lng);

    marker.on("dragend", function (e) {
      var position = marker.getLatLng();
    });
    return { lat, lng };
  });
  return { lat, lng };
}

export function updateMapPosition(lat, lng) {
  map.setView([lat, lng], 16);
  if (marker) {
    marker.setLatLng([lat, lng]);
  } else {
    marker = L.marker([lat, lng]).addTo(map);
  }
}

export function getMarkerPosition() {
  if (marker) {
    const position = marker.getLatLng();
    return { lat: position.lat, lon: position.lng };
  }
  return null;
}

function getAddress(lat, lng) {
  fetch(
    `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}`,
  )
    .then((response) => response.json())
    .then((data) => {
      document.getElementById("location").value = data.display_name;
    });
}

export async function getNaturalAddress(busqueda) {
  try {
    const query = encodeURIComponent(busqueda);
    const viewbox = "-76.05,6.65,-75.20,5.85";

    if (!query || query.trim().length < 3) return;
    const response = await fetch(
      `https://nominatim.openstreetmap.org/search?format=json&q=${query}&countrycodes=co&viewbox=${viewbox}&bounded=1&limit=40`,
    );

    const data = await response.json();

    if (data.length > 0) {
      return data; //  ahora sí retorna
    } else {
      return []; // mejor retornar algo consistente
    }
  } catch (err) {
    return null; // para manejar errores
  }
}
