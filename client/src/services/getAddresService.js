export async function getAddresQuery(query) {
    const apikey = import.meta.env.VITE_API_KEY_MAPS;
    const queryEncode = encodeURIComponent(query);
    const response = await fetch(`https://maps.googleapis.com/maps/api/geocode/json?address=${queryEncode}&components=country:CO&language=es&key=${apikey}`);
    const data = await response.json();
    return data;
}   