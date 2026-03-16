export function Header(){
    const user = JSON.parse(localStorage.getItem('user'));

    return `
    <div class="bg-white w-[375px] min-h-[812px] rounded-[40px] shadow-2xl overflow-hidden flex flex-col font-sans">
        
        <header class="p-6 mb-4 flex justify-between items-center border-b border-b-gray-200">
            <div class="flex items-center gap-3">
                <div class="w-12 h-12 rounded-full overflow-hidden">
                    <img src="./src/assets/utibunna-icon-transparent.png" alt="Avatar">
                </div>
                <div>
                    <p class="text-indigo-400 text-xs">Bienvenido a</p>
                    <h1 class="text-gray-800 font-bold text-lg leading-tight">Uti Bunna</h1>
                </div>
            </div>
            <a href="#/profileSettings" class="border border-indigo-100 px-4 py-1.5 rounded-full flex items-center gap-2 text-indigo-500 text-xs font-semibold shadow-sm">
                <i class="fa-regular fa-eye"></i> Ver perfil
            </a>
        </header>
    `
}