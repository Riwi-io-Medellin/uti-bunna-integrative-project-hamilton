import { CardMatch } from "./CardMatch.js"

function ListMatches(matchesList) {
    
    return `
    <div class="px-6 space-y-4 pb-24 overflow-y-auto">
            
            ${matchesList.map(match => CardMatch(match)).join('')}

        </div>
    `
}

export default ListMatches


/* //card match
            <div class="p-4 border border-gray-100 rounded-3xl bg-white shadow-sm">
                <div class="flex justify-between items-start mb-4">
                    <div class="flex gap-3">
                        <div class="relative">
                            <img src="https://ui-avatars.com/api/?name=Abebe+Kebede&background=fed7aa&color=854d0e" class="w-12 h-12 rounded-full" />
                            <span class="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-white rounded-full"></span>
                        </div>
                        <div>
                            <h3 class="font-bold text-gray-800">Abebe Kebede</h3>
                            <p class="text-xs text-gray-400"><i class="fas fa-location-arrow text-blue-400"></i> 0.5 km away</p>
                        </div>
                    </div>
                    <span class="bg-orange-50 text-orange-400 text-[10px] font-bold px-2 py-1 rounded-md uppercase">Pending</span>
                </div>
                <div class="grid grid-cols-2 gap-3">
                    <button class="bg-green-500 text-white py-2 rounded-xl flex justify-center items-center gap-2 text-sm font-bold">
                        <i class="fab fa-whatsapp"></i> WhatsApp
                    </button>
                    <button class="border border-blue-200 text-blue-500 py-2 rounded-xl flex justify-center items-center gap-2 text-sm font-bold">
                        <i class="far fa-check-circle"></i> Contacted
                    </button>
                </div>
            </div>

            <div class="p-4 border border-gray-100 rounded-3xl bg-white shadow-sm">
                <div class="flex justify-between items-start mb-4">
                    <div class="flex gap-3">
                        <img src="https://ui-avatars.com/api/?name=Sara+Tadesse&background=ffedd5&color=9a3412" class="w-12 h-12 rounded-full" />
                        <div>
                            <h3 class="font-bold text-gray-800">Sara Tadesse</h3>
                            <p class="text-xs text-gray-400"><i class="fas fa-location-arrow text-blue-400"></i> 1.2 km away</p>
                        </div>
                    </div>
                    <span class="bg-blue-50 text-blue-500 text-[10px] font-bold px-2 py-1 rounded-md uppercase font-bold tracking-tight">Contacted</span>
                </div>
                <div class="grid gri-cols-2 gap-3">
                    <button class="bg-green-500 text-white py-2 rounded-xl flex justify-center items-center gap-2 text-sm font-bold">
                        <i class="fab fa-whatsapp"></i> WhatsApp
                    </button>
                    <button class="border border-gray-200 text-gray-500 py-2 rounded-xl flex justify-center items-center gap-2 text-sm font-bold">
                        <i class="fas fa-undo"></i> Undo
                    </button>
                </div>
            </div> */