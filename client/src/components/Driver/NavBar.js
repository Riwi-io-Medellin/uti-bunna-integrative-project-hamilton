export function NavBar() {
    const hash = window.location.hash || "#/matches";
    
    return `
    <nav class="absolute bottom-0 w-full bg-white border-t border-gray-100 p-4 flex justify-between items-center px-8 shadow-2xl">
            <a href="#/matches" class="w-1/3 flex flex-col justify-center items-center ${hash.startsWith('#/matches') ? 'text-blue-600' : 'text-gray-400'}">
                <i class="fas fa-th-large text-xl"></i>
                <span class="text-center text-[10px] font-bold mt-1">PASAJEROS CERCANOS</span>
            </a>
            <a href="#/myroute" class="w-1/3 flex flex-col justify-center items-center ${hash.startsWith('#/myroute') ? 'text-blue-600' : 'text-gray-400'}">
                <i class="fas fa-map-signs text-xl"></i>
                <span class="text-center text-[10px] font-bold mt-1">MI RUTA</span>
            </a>
            
            <a href="#/profileSettings" class="w-1/3 flex flex-col justify-center items-center ${hash.startsWith('#/profileSettings') ? 'text-blue-600' : 'text-gray-400'}">
                <i class="far fa-user text-xl"></i>
                <span class="text-[10px] font-bold mt-1">PERFIL</span>
            </a>
        </nav>
    `
}