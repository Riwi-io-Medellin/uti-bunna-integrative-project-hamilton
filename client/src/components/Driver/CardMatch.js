export function CardMatch(match) {
    // Validamos el rol del usuario actualmente logueado
    const user = JSON.parse(localStorage.getItem('user')) || {};
    const isDriver = user.role === 'driver';

    return `
    <div class="p-4 border border-gray-100 rounded-3xl bg-white shadow-sm">
                <div class="flex justify-between items-start mb-4">
                    <div class="flex gap-3">
                        <div class="relative">
                            <img src="https://api.dicebear.com/7.x/adventurer/svg?seed=${match.full_name}" class="w-12 h-12 rounded-full" />
                            <span class="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-white rounded-full"></span>
                        </div>
                        <div>
                            <h3 class="font-bold text-gray-800">${match.full_name}</h3>
                            ${
                                match.address ?
                                `
                                <p class="text-xs text-gray-400 truncate max-w-[150px]" title="${match.address}"><i class="fas fa-location-arrow text-blue-400"></i> ${match.address}</p>
                                `
                                :
                                ""
                            }
                        </div>
                    </div>
                </div>
                <div class="flex justify-center">
                    <a href="https://wa.me/57${match.phone}" 
                       target="_blank" 
                       data-is-driver="${isDriver}" 
                       data-match-id="${match.user_id}" 
                       class="whatsapp-match-btn w-[50%] bg-green-500 text-white py-2 rounded-xl flex justify-center items-center gap-2 text-sm font-bold">
                        <i class="fab fa-whatsapp"></i> WhatsApp
                    </a>
                </div>
            </div>
    `
}

document.addEventListener('click', async (e) => {
    const whatsappBtn = e.target.closest('.whatsapp-match-btn');
    if (!whatsappBtn) return;
    
    // if is driver
    const isDriver = whatsappBtn.dataset.isDriver === 'true';
    if (isDriver) {
        const matchId = whatsappBtn.dataset.matchId;
        const token = localStorage.getItem('token');
        
        try {
            // post to contact-attempts
            await fetch(`https://uti-bunna-integrative-project-hamilton.onrender.com/api/matches/${matchId}/accept`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
            })
        } catch (error) {
            console.error(error);
        }
    }
});