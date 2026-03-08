export function isLoggedIn() {
  return localStorage.getItem('token') !== null
}
export function setSession(token) {
  localStorage.setItem('token', token)
}
export function clearSession() {
  localStorage.removeItem('token')
}


function obtenerUbicacion() {
  return new Promise((resolve, reject) => {
    navigator.geolocation.getCurrentPosition(
      resolve,
      reject,
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 0
      }
    );
  });
}
export function useMap() {

  /* Dibujar el mapa en medellín */
  var map = L.map('map').setView([6.2442, -75.5812], 16);

  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '© OpenStreetMap'
  }).addTo(map);

  var marker;
  obtenerUbicacion()
    .then(pos => {
      console.log("Lat:", pos.coords.latitude);
      console.log("Lon:", pos.coords.longitude);

      let lat = pos.coords.latitude;
      let lng = pos.coords.longitude;

      // Centrar mapa en ubicación actual
      map.setView([lat, lng], 16);

      // Crear marcador inicial
      marker = L.marker([lat, lng], { draggable: true }).addTo(map);


      getAddress(lat, lng);

      if (marker) {
        marker.setLatLng([lat, lng]);
      }
    })
    .catch(err => {
      console.error(err.message);
    });



  map.on('click', function (e) {
    var lat = e.latlng.lat;
    var lng = e.latlng.lng;

    if (marker) {
      marker.setLatLng(e.latlng);
    } else {
      marker = L.marker(e.latlng, { draggable: true }).addTo(map);
    }

    console.log(lat, lng);
    console.log(getAddress(lat, lng))

    marker.on('dragend', function (e) {
      var position = marker.getLatLng();
      console.log(position);
    });
  });

  // Exportar una función para actualizar el mapa desde afuera
  return {
    updateMapPosition: (lat, lng) => {
      const position = [lat, lng];
      map.setView(position, 16);
      if (marker) {
        marker.setLatLng(position);
      } else {
        marker = L.marker(position, { draggable: true }).addTo(map);
      }
    }
  };
}

function getAddress(lat, lng) {
  fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}`)
    .then(response => response.json())
    .then(data => {
      console.log(data)
      document.getElementById('location').value = data.display_name;
    });
}

export async function getNaturalAddress(busqueda) {
  console.log(busqueda);

  try {
    const query = encodeURIComponent(busqueda);
    const viewbox = "-76.05,6.65,-75.20,5.85";

    if (!query || query.trim().length < 3) return
    const response = await fetch(
      `https://nominatim.openstreetmap.org/search?format=json&q=${query}&countrycodes=co&viewbox=${viewbox}&bounded=1&limit=40`);

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