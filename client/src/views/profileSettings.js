import { clearSession } from "../utils/utils.js";

export function profileSettings(user) {
  return `
    <div class="max-w-sm mx-auto bg-white min-h-screen font-sans pb-10" style="font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;">

      <!-- Header -->
      <div class="flex items-center px-5 pt-6 pb-3 border-b border-gray-100">
        <button id="backToMatches" class="text-indigo-500 hover:text-indigo-700 transition-colors p-1 -ml-1">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
            <path stroke-linecap="round" stroke-linejoin="round" d="M15 19l-7-7 7-7"/>
          </svg>
        </button>
        <h1 class="flex-1 text-center text-[15px] font-semibold text-gray-800 tracking-wide">Configuración del Perfil</h1>
        <div class="w-7"></div>
      </div>

      <!-- Avatar -->
      <div class="flex flex-col items-center mt-7 mb-1">
        <div class="relative">
          <img
            src="${user?.image || `https://api.dicebear.com/7.x/adventurer/svg?seed=${Math.random()}`}"
            alt="Perfil"
            class="w-[90px] h-[90px] rounded-full object-cover border-[3px] border-white shadow-lg"
          />
        </div>
        <h2 class="mt-3 text-[17px] font-bold text-gray-900">${user?.full_name || ""}</h2>
      </div>

      <!-- Role Toggle -->
      <div class="px-5 mt-5">
        <div class="flex bg-[#f0f1f8] rounded-2xl p-1 gap-1">
          <button
            class="flex-1 py-[10px] rounded-xl text-[13px] font-semibold transition-all duration-200"
          >
            ${user?.role === "driver" ? "Conductor" : "Pasajero"}         
           </button>
        </div>
      </div>

      <!-- Form Fields -->
      <div class="px-5 mt-6 space-y-5">

        <!-- Full Name -->
        <div>
          <label class="block text-[13px] font-semibold text-gray-700 mb-1.5">Nombre Completo</label>
          <div class="flex items-center bg-[#f5f6fc] border border-transparent rounded-2xl px-3.5 py-3 focus-within:border-indigo-300 focus-within:bg-white transition-all">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-[17px] w-[17px] text-indigo-400 mr-2.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.8">
              <path stroke-linecap="round" stroke-linejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/>
            </svg>
            <input
              type="text"
              value="${user?.full_name}"
              class="bg-transparent text-[13px] text-gray-700 outline-none w-full placeholder-gray-400"
            />
          </div>
        </div>

        <!-- Email Address -->
        <div>
          <label class="block text-[13px] font-semibold text-gray-700 mb-1.5">Correo Electrónico</label>
          <div class="flex items-center bg-[#f5f6fc] border border-transparent rounded-2xl px-3.5 py-3 focus-within:border-indigo-300 focus-within:bg-white transition-all">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-[17px] w-[17px] text-indigo-400 mr-2.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.8">
              <path stroke-linecap="round" stroke-linejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
            </svg>
            <input
              type="email"
              value="${user?.email}"
              class="bg-transparent text-[13px] text-gray-700 outline-none w-full placeholder-gray-400"
            />
          </div>
        </div>

        <!-- Phone Number -->
        <div>
          <label class="block text-[13px] font-semibold text-gray-700 mb-1.5">Número de Teléfono</label>
          <div class="flex items-center bg-[#f5f6fc] border border-transparent rounded-2xl px-3.5 py-3 focus-within:border-indigo-300 focus-within:bg-white transition-all">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-[17px] w-[17px] text-indigo-400 mr-2.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.8">
              <path stroke-linecap="round" stroke-linejoin="round" d="M3 5a2 2 0 012-2h3l2 5-2 2a16 16 0 006 6l2-2 5 2v3a2 2 0 01-2 2A19 19 0 013 5z"/>
            </svg>
            <input
              type="tel"
              value="${user?.phone}"
              class="bg-transparent text-[13px] text-gray-700 outline-none w-full placeholder-gray-400"
            />
          </div>
        </div>

        <!-- Current Location -->
        <div>
          <div class="flex justify-between items-center mb-1.5">
            <label class="text-[13px] font-semibold text-gray-700">Ubicación Actual</label>
          </div>
          <div class="rounded-2xl overflow-hidden border border-gray-100 h-[130px] relative shadow-sm">
            <iframe
              class="w-full h-full"
              style="border:0; filter: saturate(0.9) brightness(1.02);"
              loading="lazy"
              allowfullscreen
              src="https://www.google.com/maps?q=${encodeURIComponent((user?.address || "") + " Medellin, Colombia")}&z=16&output=embed">
            </iframe>

            <div class="absolute bottom-2.5 left-2.5 bg-white/95 backdrop-blur-sm rounded-xl px-2.5 py-1.5 shadow-md flex items-center gap-1.5 max-w-[85%]">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-3.5 w-3.5 text-indigo-500 flex-shrink-0" viewBox="0 0 20 20" fill="currentColor">
                <path fill-rule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clip-rule="evenodd"/>
              </svg>
              <span class="text-[11px] text-gray-600 font-medium truncate">${user?.address}</span>
            </div>
          </div>
        </div>

      </div>

      <!-- Save Button -->
      <div class="px-5 mt-8">
        <button class="w-full bg-indigo-500 hover:bg-indigo-600 active:scale-[0.98] active:bg-indigo-700 text-white font-semibold py-[15px] rounded-2xl shadow-lg shadow-indigo-200 transition-all duration-200 text-[14px] tracking-wide">
          Guardar Cambios
        </button>
      </div>

      <!-- Log Out Button -->
      <div class="px-5 mt-3">
        <button id="logoutBtn" class="w-full bg-white hover:bg-gray-50 active:bg-gray-100 text-gray-700 font-semibold py-[15px] rounded-2xl border border-gray-200 transition-all duration-200 text-[14px] tracking-wide">
          Cerrar Sesión
        </button>
      </div>

    </div>
  `;
}

export function initProfileSettings() {
  document.getElementById("logoutBtn")?.addEventListener("click", () => {
    clearSession();
    location.hash = "#/landingPage";
  });

  document.getElementById("backToMatches")?.addEventListener("click", () => {
    location.hash = "#/matches";
  });
}
