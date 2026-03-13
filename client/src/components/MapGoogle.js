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
    zoom: 16,
  });

  marker = new google.maps.Marker({
    position,
    map,
    draggable: true,
  });

  map.addListener("click", (e) => {
    marker.setPosition(e.latLng);
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