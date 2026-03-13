export async function searchAddress(query, apiKey) {
  if (!query || query.trim().length < 3) return [];

  const encoded = encodeURIComponent(query);

  const response = await fetch(
    `https://maps.googleapis.com/maps/api/geocode/json?address=${encoded}&components=country:CO&key=${apiKey}`
  );

  const data = await response.json();

  if (data.status !== "OK") return [];

  return data.results.map((r) => ({
    address: r.formatted_address,
    lat: r.geometry.location.lat,
    lng: r.geometry.location.lng,
  }));
}