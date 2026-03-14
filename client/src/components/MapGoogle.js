export function MapGoogle(){
    return `
    <div id="map" style="height: 500px; width: 100%;"></div>
    `
}

let map;
let marker;

export function initGoogleMap(containerId, lat, lng) {
  const position = { lat, lng };

  map = new google.maps.Map(document.getElementById(containerId), {
    center: position,
    zoom: 15,
  });

  marker = new google.maps.Marker({
    position,
    map,
    icon: "https://maps.google.com/mapfiles/ms/icons/red-dot.png"
  });

/*   map.addListener("click", (e) => {
    marker.setPosition(e.latLng);
  }); */

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
  // Limpiar marcadores anteriores si se vuelve a llamar la función
  markersList.forEach(m => m.setMap(null));
  markersList = [];
  

  // Comprobar que el mapa ya esté inicializado
  if (!map) {
      console.error("El mapa aún no ha sido inicializado");
      return;
  }

// Iterar sobre la lista de ubicaciones
 locations.forEach(location => {

  const marker = new google.maps.Marker({
    position: {
      lat: JSON.parse(location.location).coordinates[1],
      lng: JSON.parse(location.location).coordinates[0]
    },
    map: map,
    title: location.title || "Ubicación",
    icon: "http://maps.google.com/mapfiles/ms/icons/green-dot.png"
  });

  const infoWindow = new google.maps.InfoWindow({
    content: `
      <div style="width:200px">
        <h3>Juan Esteban</h3>
        <p>📍 Calle 123</p>
        <p>📞 123456789</p>
        <button onclick="alert('Contactar')">
          Contactar
        </button>
      </div>
    `
  });

  marker.addListener("click", () => {
    infoWindow.open(map, marker);
  });

  markersList.push(marker);
});
}
