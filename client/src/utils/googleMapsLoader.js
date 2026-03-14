let googleMapsPromise = null;

export function loadGoogleMaps() {
  //const apiKey = import.meta.env.VITE_API_KEY_MAPS;
  const apiKey = "";
  if (googleMapsPromise) return googleMapsPromise;

  googleMapsPromise = new Promise((resolve, reject) => {
    const script = document.createElement("script");

    script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}&libraries=places&language=es`;
    script.async = true;
    script.defer = true;

    script.onload = () => resolve(window.google);
    script.onerror = reject;

    document.head.appendChild(script);
  });

  return googleMapsPromise;
}