export function NavBar() {
    return `
    <nav class="absolute bottom-0 w-full bg-white border-t border-gray-100 p-4 flex justify-between items-center px-8 shadow-2xl">
            <div class="flex flex-col items-center text-blue-600">
                <i class="fas fa-th-large text-xl"></i>
                <span class="text-[10px] font-bold mt-1">PASSANGERS NEARBY</span>
            </div>
            <a href="#/myroute" class="flex flex-col items-center text-gray-400">
                <i class="fas fa-map-signs text-xl"></i>
                <span class="text-[10px] font-bold mt-1">RUTA</span>
            </a>
            
            <a href="#/profileSettings" class="flex flex-col items-center text-gray-400">
                <i class="far fa-user text-xl"></i>
                <span class="text-[10px] font-bold mt-1">PERFIL</span>
            </a>
        </nav>
    `
}