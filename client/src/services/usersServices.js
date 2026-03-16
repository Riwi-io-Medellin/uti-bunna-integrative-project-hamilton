export async function getMatches() {
    const token = localStorage.getItem('token')
    const response = await fetch("https://uti-bunna-integrative-project-hamilton.onrender.com/api/drivers/matches", {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        }
    })
    const data = await response.json();
    return data;
}