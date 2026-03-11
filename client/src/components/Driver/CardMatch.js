export function CardMatch(match) {
    return `
    <div class="p-4 border border-gray-100 rounded-3xl bg-white shadow-sm">
                <div class="flex justify-between items-start mb-4">
                    <div class="flex gap-3">
                        <div class="relative">
                            <img src="https://api.dicebear.com/7.x/adventurer/svg?seed=${Math.random()}" class="w-12 h-12 rounded-full" />
                            <span class="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-white rounded-full"></span>
                        </div>
                        <div>
                            <h3 class="font-bold text-gray-800">${match.full_name}</h3>
                            <p class="text-xs text-gray-400"><i class="fas fa-location-arrow text-blue-400"></i> 0.5 km away</p>
                        </div>
                    </div>
                    <span class="bg-orange-50 text-orange-400 text-[10px] font-bold px-2 py-1 rounded-md uppercase">Pending</span>
                </div>
                <div class="flex justify-center">
                    <button class="w-[50%] bg-green-500 text-white py-2 rounded-xl flex justify-center items-center gap-2 text-sm font-bold">
                        <a href="https://wa.me/57${match.phone}" target="_blank"><i class="fab fa-whatsapp"></i> WhatsApp</a>
                    </button>
                </div>
            </div>
    `
}