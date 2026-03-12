import ListMatches from "../components/Driver/ListMatches";
import { SkeletonListMatches } from "../components/Driver/SkeletonListMatches";

export async function ContactAttemps(params) {
    const user = JSON.parse(localStorage.getItem('user'));
    return `
<div class="bg-gray-100 flex justify-center  min-h-screen">

    <div class="bg-white w-[375px] min-h-[812px] rounded-[40px] shadow-2xl overflow-hidden flex flex-col font-sans">
        
        <header class="p-6 flex justify-between items-center">
            <div class="flex items-center gap-3">
                <div class="w-12 h-12 bg-orange-200 rounded-full overflow-hidden">
                    <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=${user.full_name}" alt="Avatar">
                </div>
                <div>
                    <p class="text-indigo-400 text-xs">Bienvenido</p>
                    <h1 class="text-gray-800 font-bold text-lg leading-tight">${user.full_name}</h1>
                </div>
            </div>
            <button class="border border-indigo-100 px-4 py-1.5 rounded-full flex items-center gap-2 text-indigo-500 text-xs font-semibold shadow-sm">
                <i class="fa-regular fa-eye"></i> Ver perfil
            </button>
        </header>

        <section class="px-6 py-2">
            <div class="bg-indigo-600 rounded-3xl p-6 text-white shadow-lg shadow-indigo-200">
                <div class="flex items-center gap-2 mb-2">
                    <span class="w-2.5 h-2.5 bg-white rounded-full"></span>
                    <p class="uppercase text-[10px] tracking-widest font-bold opacity-80">Búsqueda activa</p>
                </div>
                <h2 class="text-2xl font-bold leading-tight mb-2">Esperando a los conductores cerca de su ruta.</h2>
                <p class="text-indigo-100 text-xs opacity-90 leading-relaxed">
                   Te conectamos con los mejores vehículos compartidos cercanos.
                </p>
            </div>
        </section>

        <section class="p-6 flex-1">
            <div class="flex justify-between items-center mb-4">
                <h3 class="text-lg font-bold text-gray-800">Notificaciones</h3>
                <span id="total-drivers" class="bg-indigo-500 text-white text-[10px] px-2 py-0.5 rounded-md font-bold uppercase tracking-tighter">...</span>
            </div>

            <div class="border border-indigo-50 rounded-3xl p-4 bg-white shadow-sm">
                <div class="flex items-start gap-3 mb-4">
                    <div class="text-indigo-500 mt-1">
                        <i class="fa-regular fa-comment-dots text-lg"></i>
                    </div>
                    <div>
                        <h4 class="font-bold text-gray-800 text-sm">Un conductor quiere contactarte</h4>
                        <p class="text-indigo-300 text-[11px] leading-tight mt-1">
                            Toque para ver detalles o iniciar un chat sobre su ruta.
                        </p>
                    </div>
                </div>
                <div id="contact-attemps-list">
                ${SkeletonListMatches()}
                </div>
               
            </div>
        </section>

        <nav class="border-t border-gray-100 flex justify-around py-4 bg-white">
            <button class="flex flex-col items-center gap-1 text-indigo-600">
                <i class="fa-solid fa-house text-xl"></i>
                <span class="text-[10px] font-bold uppercase tracking-widest">Home</span>
            </button>
            <button class="flex flex-col items-center gap-1 text-gray-400">
                <i class="fa-regular fa-user text-xl"></i>
                <span class="text-[10px] font-bold uppercase tracking-widest">Profile</span>
            </button>
        </nav>

    </div>

</div>
    `
}

export async function initContactAttempsView() {
 const token = localStorage.getItem('token')
 const {user_id} = JSON.parse(localStorage.getItem('user'))

 
    const response = await fetch(`https://uti-bunna-integrative-project-hamilton.onrender.com/api/matches/${user_id}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        }
    })
    const data = await response.json();
    const contactAttempsList = document.getElementById("contact-attemps-list");
    const totalDrivers = document.getElementById("total-drivers");
    //if total is 0
    totalDrivers.innerHTML = data.total > 0 ? data.total + " Conductores" : "No hay conductores";
    //if response is 200
    if(response.status === 200){
        contactAttempsList.innerHTML = ListMatches(data.data.matches);
    }else{
        contactAttempsList.innerHTML = "<p class='text-center text-gray-400'>No hay conductores</p>";
    }
}


