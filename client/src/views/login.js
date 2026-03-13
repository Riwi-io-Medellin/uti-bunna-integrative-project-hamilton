import { setSession } from "../utils/utils.js";
import Toastify from "toastify-js";

export function LoginView() {
  return `
    <div class="font-sans bg-gray-100 min-h-screen flex flex-col items-center justify-center px-4 py-8 relative overflow-hidden">

      <div class="fixed top-[-120px] right-[-120px] w-96 h-96 rounded-full pointer-events-none"
           style="background: radial-gradient(circle, rgba(91,91,214,.13) 0%, transparent 70%)"></div>
      <div class="fixed bottom-[-100px] left-[-100px] w-80 h-80 rounded-full pointer-events-none"
           style="background: radial-gradient(circle, rgba(91,91,214,.09) 0%, transparent 70%)"></div>

      <div class="bg-white rounded-2xl px-9 pt-10 pb-8 w-full max-w-[400px] shadow-[0_4px_6px_-1px_rgba(0,0,0,.06),0_16px_48px_-8px_rgba(0,0,0,.10)] mt-6">
        <h1 class="text-[26px] font-bold text-gray-900 tracking-tight text-center mb-1.5">Bienvenido a Uti Bunna</h1>
        <p class="text-sm text-gray-500 text-center leading-relaxed mb-8">
          Ingresa tus credenciales para acceder
        </p>

        <div class="mb-[18px]">
          <label class="block text-[13.5px] font-medium text-gray-800 mb-1.5">Correo electrónico</label>
          <div class="relative flex items-center">
            <span class="absolute left-3 text-gray-400 pointer-events-none">
              <svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <rect x="2" y="4" width="20" height="16" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/>
              </svg>
            </span>
            <input type="email" placeholder="nombre@empresa.com"
              class="w-full pl-10 pr-4 py-[11px] border border-gray-200 rounded-[10px] text-sm bg-gray-50 text-gray-900 placeholder-gray-300 transition duration-150 focus:outline-none focus:border-[#5B5BD6] focus:bg-white focus:ring-2 focus:ring-[#5B5BD6]/10" />
          </div>
        </div>

        <div class="mb-6">
          <div class="flex justify-between items-center mb-1.5">
            <label class="text-[13.5px] font-medium text-gray-800">Contraseña</label>
            <a href="#" class="text-[13px] font-medium text-[#5B5BD6] hover:underline">¿Olvidaste tu contraseña?</a>
          </div>
          <div class="relative flex items-center">
            <span class="absolute left-3 text-gray-400 pointer-events-none">
              <svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/>
              </svg>
            </span>
            <input type="password" id="passInput" placeholder="••••••••"
              class="w-full pl-10 pr-10 py-[11px] border border-gray-200 rounded-[10px] text-sm bg-gray-50 text-gray-900 placeholder-gray-300 transition duration-150 focus:outline-none focus:border-[#5B5BD6] focus:bg-white focus:ring-2 focus:ring-[#5B5BD6]/10" />
            <button type="button" id="togglePassBtn" class="absolute right-3 text-gray-400 hover:text-[#5B5BD6] transition-colors duration-150 cursor-pointer">
              <svg id="eyeIcon" class="w-[17px] h-[17px]" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7z"/><circle cx="12" cy="12" r="3"/>
              </svg>
            </button>
          </div>
        </div>

        <div class="flex items-center gap-2.5 mb-6">
          <input type="checkbox" id="keepSigned" class="w-4 h-4 rounded accent-[#5B5BD6] cursor-pointer" />
          <label for="keepSigned" class="text-[13.5px] text-gray-500 cursor-pointer select-none">Mantener sesión iniciada</label>
        </div>

        <button type="button" id="signInBtn"
          class="w-full py-[13px] bg-[#5B5BD6] hover:bg-[#4747c2] text-white text-[15px] font-semibold rounded-xl flex items-center justify-center gap-2 tracking-tight transition-all duration-150 shadow-[0_4px_14px_rgba(91,91,214,.35)] hover:shadow-[0_6px_20px_rgba(91,91,214,.45)] hover:-translate-y-px active:translate-y-0 cursor-pointer">
          Iniciar sesión
          <svg class="w-[17px] h-[17px]" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4"/><polyline points="10 17 15 12 10 7"/><line x1="15" y1="12" x2="3" y2="12"/>
          </svg>
        </button>

        <div class="grid grid-cols-2 gap-3 mb-7"></div>

        <p class="text-center text-[13.5px] text-gray-500">
          ¿No tienes cuenta? <a href="#" id="registerLink" class="text-[#5B5BD6] font-semibold hover:underline">Regístrate aquí</a>
        </p>
      </div>

      <footer class="mt-8 text-center">
        <div class="flex justify-center flex-wrap gap-x-5 gap-y-1 mb-2">
          <a href="#" class="text-xs text-gray-400 hover:text-[#5B5BD6] transition-colors">Política de privacidad</a>
          <a href="#" class="text-xs text-gray-400 hover:text-[#5B5BD6] transition-colors">Términos de servicio</a>
          <a href="#" class="text-xs text-gray-400 hover:text-[#5B5BD6] transition-colors">Configuración de cookies</a>
        </div>
        <p class="text-[11px] text-gray-400 uppercase tracking-wide">© 2026 Uti Bunna. Todos los derechos reservados.</p>
      </footer>
    </div>
  `;
}

export function initLoginView() {
  document.getElementById("signInBtn")?.addEventListener("click", async () => {
    const email = document.querySelector('input[type="email"]').value;
    const password = document.getElementById("passInput").value;

    if (!email || !password) {
      alert("Por favor completa ambos campos");
      return;
    }

    try {
      const res = await fetch(
        "https://uti-bunna-integrative-project-hamilton.onrender.com/api/auth/login",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email, password }),
        },
      );

      const json = await res.json();

      if (res.ok) {

        // 🔹 Transform user to include name
        const user = {
          ...json.user,
          name: json.user.full_name
        };

        // Save session
        setSession(json.token, user);

        // Redirect to home
        location.hash = "/home";

      } else {
        Toastify({
          text: json.message,
          duration: 3000,
          gravity: "top",
          position: "right",
          style: {
            background: "red",
          },
        }).showToast();
      }
    } catch (error) {
      console.error("Error en login:", error);
      Toastify({
        text: error.message || "Error de conexión",
        duration: 3000,
        gravity: "top",
        position: "right",
        style: {
          background: "red",
        },
      }).showToast();
    }
  });

  document.getElementById("registerLink")?.addEventListener("click", (e) => {
    e.preventDefault();
    location.hash = "/register";
  });

  document.getElementById("togglePassBtn")?.addEventListener("click", () => {
    const input = document.getElementById("passInput");
    const icon = document.getElementById("eyeIcon");
    const isPass = input.type === "password";

    input.type = isPass ? "text" : "password";

    icon.innerHTML = isPass
      ? `<path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94"/><path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19"/><line x1="1" y1="1" x2="23" y2="23"/>`
      : `<path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7z"/><circle cx="12" cy="12" r="3"/>`;
  });
}