import { clearSession } from "../utils/utils.js";
import Toastify from "toastify-js";

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
            src="${user?.image || `https://api.dicebear.com/7.x/adventurer/svg?seed=${user?.full_name}`}"
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
              disabled
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
              disabled
            />
          </div>
        </div>

        <!-- Phone Number -->
        <div>
          <label class="block text-[13px] font-semibold text-gray-700 mb-1.5">Número de Teléfono</label>
          <div id="phoneWrap" class="flex items-center bg-[#f5f6fc] border border-transparent rounded-2xl px-3.5 py-3 focus-within:border-indigo-300 focus-within:bg-white transition-all">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-[17px] w-[17px] text-indigo-400 mr-2.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.8">
              <path stroke-linecap="round" stroke-linejoin="round" d="M3 5a2 2 0 012-2h3l2 5-2 2a16 16 0 006 6l2-2 5 2v3a2 2 0 01-2 2A19 19 0 013 5z"/>
            </svg>
            <input
              id="phoneInput"
              type="tel"
              value="${user?.phone}"
              readonly
              class="bg-transparent text-[13px] text-gray-700 outline-none w-full placeholder-gray-400 cursor-default"
            />
            <button id="phonePencil" class="ml-1 flex-shrink-0 p-1 text-indigo-400">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-[15px] w-[15px]" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                <path stroke-linecap="round" stroke-linejoin="round" d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7"/>
                <path stroke-linecap="round" stroke-linejoin="round" d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z"/>
              </svg>
            </button>
            <div id="phoneActions" class="hidden ml-1 flex-shrink-0 flex items-center gap-2">
              <button id="phoneCancelBtn" class="p-1 text-gray-400">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.2">
                  <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
                </svg>
              </button>
              <button id="phoneSaveBtn" class="flex items-center gap-1 bg-indigo-500 text-white text-[12px] font-semibold px-2.5 py-1.5 rounded-lg">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5">
                  <polyline points="20 6 9 17 4 12"/>
                </svg>
                Guardar
              </button>
            </div>
          </div>
        </div>

        <!-- Password -->
        <div>
          <label class="block text-[13px] font-semibold text-gray-700 mb-1.5">Contraseña</label>
          <button id="openPasswordModal" class="w-full flex items-center bg-[#f5f6fc] border border-transparent rounded-2xl px-3.5 py-3 hover:bg-[#e8eaf6] transition-all text-left">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-[17px] w-[17px] text-indigo-400 mr-2.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.8">
              <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/>
              <path stroke-linecap="round" stroke-linejoin="round" d="M7 11V7a5 5 0 0110 0v4"/>
            </svg>
            <span class="text-[13px] text-gray-400 tracking-[3px]">********</span>
            <div class="ml-auto flex items-center gap-1">
              <span class="text-[12px] text-indigo-500 font-semibold">Cambiar</span>
              <svg xmlns="http://www.w3.org/2000/svg" class="h-[13px] w-[13px] text-indigo-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.2">
                <path stroke-linecap="round" stroke-linejoin="round" d="M9 18l6-6-6-6"/>
              </svg>
            </div>
          </button>
        </div>
      </div>

      <!-- Log Out Button -->
      <div class="px-5 mt-10">
        <button id="logoutBtn" 
          class="w-full bg-red-50 hover:bg-red-100 active:bg-red-200 text-red-600 font-semibold py-[15px] rounded-2xl border border-red-200 transition-all duration-200 text-[14px] tracking-wide">
          Cerrar Sesión
        </button>
      </div>

    </div>

    <!-- Update Password -->
    <div id="passwordOverlay" class="hidden fixed inset-0 z-40" style="background:rgba(15,12,41,0.45);backdrop-filter:blur(3px);"></div>

    <div id="passwordModal" class="hidden fixed bottom-0 left-1/2 z-50 w-full bg-white rounded-t-3xl px-6 pt-6 pb-10" style="max-width:390px;transform:translateX(-50%);box-shadow:0 -8px 40px rgba(99,102,241,0.18);">
      <div class="w-10 h-1 bg-gray-200 rounded-full mx-auto mb-5"></div>
      <h3 class="text-[17px] font-bold text-gray-900 mb-1">Actualizar Contraseña</h3>
      <p class="text-[12.5px] text-gray-400 mb-6">Ingresa tu contraseña actual y luego la nueva.</p>

      <div class="mb-4">
        <label class="block text-[13px] font-semibold text-gray-700 mb-1.5">Contraseña Actual</label>
        <div class="flex items-center bg-[#f5f6fc] rounded-2xl px-3.5 py-3 gap-2.5">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-[17px] w-[17px] text-indigo-400 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.8"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path stroke-linecap="round" stroke-linejoin="round" d="M7 11V7a5 5 0 0110 0v4"/></svg>
          <input id="currentPass" type="password" placeholder="••••••••" class="bg-transparent text-[13px] text-gray-700 outline-none w-full" autocomplete="current-password"/>
          <button data-target="currentPass" class="togglePass p-1 flex-shrink-0 text-indigo-300">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.8"><path stroke-linecap="round" stroke-linejoin="round" d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>
          </button>
        </div>
      </div>

      <div class="mb-4">
        <label class="block text-[13px] font-semibold text-gray-700 mb-1.5">Nueva Contraseña</label>
        <div class="flex items-center bg-[#f5f6fc] rounded-2xl px-3.5 py-3 gap-2.5">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-[17px] w-[17px] text-indigo-400 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.8"><path stroke-linecap="round" stroke-linejoin="round" d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
          <input id="newPass" type="password" placeholder="Mínimo 6 caracteres" class="bg-transparent text-[13px] text-gray-700 outline-none w-full" autocomplete="new-password"/>
          <button data-target="newPass" class="togglePass p-1 flex-shrink-0 text-indigo-300">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.8"><path stroke-linecap="round" stroke-linejoin="round" d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>
          </button>
        </div>
      </div>

      <div class="mb-1">
        <label class="block text-[13px] font-semibold text-gray-700 mb-1.5">Confirmar Nueva Contraseña</label>
        <div class="flex items-center bg-[#f5f6fc] rounded-2xl px-3.5 py-3 gap-2.5">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-[17px] w-[17px] text-indigo-400 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.8"><path stroke-linecap="round" stroke-linejoin="round" d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
          <input id="confirmPass" type="password" placeholder="Repite la nueva contraseña" class="bg-transparent text-[13px] text-gray-700 outline-none w-full" autocomplete="new-password"/>
          <button data-target="confirmPass" class="togglePass p-1 flex-shrink-0 text-indigo-300">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.8"><path stroke-linecap="round" stroke-linejoin="round" d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>
          </button>
        </div>
      </div>

      <p id="passError" class="hidden text-[12px] text-red-500 font-medium mt-1.5 ml-1"></p>

      <div class="flex gap-3 mt-6">
        <button id="cancelPasswordModal" class="flex-1 py-3.5 bg-[#f5f6fc] rounded-2xl text-[14px] font-semibold text-gray-500 hover:bg-gray-100 transition-colors">Cancelar</button>
        <button id="savePasswordBtn" class="flex-[2] py-3.5 bg-indigo-500 hover:bg-indigo-600 rounded-2xl text-[14px] font-semibold text-white shadow-lg shadow-indigo-200 transition-all">Actualizar</button>
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
    location.hash = "#/";
  });

  // edit phone number 
  const phoneInput = document.getElementById("phoneInput");
  const phonePencil = document.getElementById("phonePencil");
  const phoneActions = document.getElementById("phoneActions");
  const phoneSaveBtn = document.getElementById("phoneSaveBtn");
  const phoneCancelBtn = document.getElementById("phoneCancelBtn");
  const phoneWrap = document.getElementById("phoneWrap");
  let phoneOriginal = phoneInput?.value ?? "";

  phonePencil?.addEventListener("click", () => {
    phoneInput.readOnly = false;
    phoneInput.classList.remove("cursor-default");
    phonePencil.classList.add("hidden");
    phoneActions.classList.remove("hidden");
    phoneWrap.classList.add("border-indigo-300", "!bg-white");
    phoneInput.focus();
  });

  phoneCancelBtn?.addEventListener("click", () => {
    phoneInput.value = phoneOriginal;
    phoneInput.readOnly = true;
    phoneInput.classList.add("cursor-default");
    phonePencil.classList.remove("hidden");
    phoneActions.classList.add("hidden");
    phoneWrap.classList.remove("border-indigo-300", "!bg-white");
  });

  phoneSaveBtn?.addEventListener("click", async () => {
    const val = phoneInput.value.trim();
    if (!val || val.length < 10) return;

    try {
      const token = localStorage.getItem("token");

      const res = await fetch(
        "https://uti-bunna-integrative-project-hamilton.onrender.com/api/users/me",
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ phone_number: val }),
        },
      );

      const json = await res.json();

      if (res.ok) {
        const user = JSON.parse(localStorage.getItem("user"));
        user.phone = json.user.phone;
        localStorage.setItem("user", JSON.stringify(user));

        phoneOriginal = val;
        phoneCancelBtn.click();

        Toastify({
          text: "Teléfono actualizado correctamente",
          duration: 3000,
          gravity: "top",
          position: "right",
          style: { background: "green" },
        }).showToast();
      } else {
        Toastify({
          text: json.message || "No se pudo actualizar el teléfono",
          duration: 3000,
          gravity: "top",
          position: "right",
          style: { background: "red" },
        }).showToast();
      }
    } catch (error) {
      console.error("Error actualizando teléfono:", error);
      Toastify({
        text: "Error de conexión",
        duration: 3000,
        gravity: "top",
        position: "right",
        style: { background: "red" },
      }).showToast();
    }
  });

  phoneInput?.addEventListener("keydown", (e) => {
    if (e.key === "Enter") phoneSaveBtn.click();
    if (e.key === "Escape") phoneCancelBtn.click();
  });

  // modal password
  const modal = document.getElementById("passwordModal");
  const overlay = document.getElementById("passwordOverlay");

  const openModal = () => {
    overlay.classList.remove("hidden");
    modal.classList.remove("hidden");
    modal.style.transition = "transform 0.28s cubic-bezier(0.34,1.1,0.64,1)";
    modal.style.transform = "translateX(-50%) translateY(100%)";
    requestAnimationFrame(() => {
      modal.style.transform = "translateX(-50%) translateY(0)";
    });
    ["currentPass", "newPass", "confirmPass"].forEach(
      (id) => (document.getElementById(id).value = "")
    );
    document.getElementById("passError").classList.add("hidden");
  };

  const closeModal = () => {
    return new Promise((resolve) => {
      modal.style.transform = "translateX(-50%) translateY(100%)";
      setTimeout(() => {
        modal.classList.add("hidden");
        overlay.classList.add("hidden");
        resolve(); // indicates that the animation has finished
      }, 260); // exact time of the transition
    });
  };

  document.getElementById("openPasswordModal")?.addEventListener("click", openModal);
  document.getElementById("cancelPasswordModal")?.addEventListener("click", closeModal);
  overlay?.addEventListener("click", closeModal);

  document.querySelectorAll(".togglePass").forEach((btn) => {
    btn.addEventListener("click", () => {
      const input = document.getElementById(btn.dataset.target);
      input.type = input.type === "password" ? "text" : "password";
    });
  });

  document.getElementById("savePasswordBtn")?.addEventListener("click", async () => {
    const cur = document.getElementById("currentPass").value.trim();
    const nw = document.getElementById("newPass").value.trim();
    const conf = document.getElementById("confirmPass").value.trim();
    const err = document.getElementById("passError");
    const btn = document.getElementById("savePasswordBtn");

    const showErr = (msg) => {
      err.textContent = msg;
      err.classList.remove("hidden");
    };

    if (!cur) return showErr("Ingresa tu contraseña actual.");
    if (nw.length < 6) return showErr("La nueva contraseña debe tener al menos 6 caracteres.");
    if (nw !== conf) return showErr("Las contraseñas nuevas no coinciden.");

    err.classList.add("hidden");
    btn.textContent = "Actualizando…";
    btn.disabled = true;
    btn.style.opacity = "0.7";

    try {
      const token = localStorage.getItem("token");

      const res = await fetch(
        "https://uti-bunna-integrative-project-hamilton.onrender.com/api/users/me",
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ currentPassword: cur, newPassword: nw }),
        }
      );

      let json = {};
      try { json = await res.json(); } catch { json = {}; }

      if (res.ok) {
        // Wait for the modal to close before displaying the toast
        await closeModal();

        Toastify({
          text: "Contraseña actualizada correctamente",
          duration: 4000,
          gravity: "top",
          position: "right",
          stopOnFocus: true,
          style: {
            background: "linear-gradient(to right, #00b09b, #96c93d)",
            borderRadius: "8px",
            fontWeight: "600",
            fontSize: "14px",
            padding: "12px 20px",
            zIndex: "9999"
          },
        }).showToast();
      } else {
        console.error("Error backend:", json);
        showErr(json.message || "No se pudo actualizar la contraseña");
      }
    } catch (error) {
      console.error("ERROR REAL:", error);
      Toastify({
        text: "Error de conexión",
        duration: 3000,
        gravity: "top",
        position: "right",
        style: {
          background: "linear-gradient(to right, #e52d27, #b31217)",
          borderRadius: "8px",
          fontWeight: "600",
          fontSize: "14px",
          padding: "12px 20px",
        },
      }).showToast();
    } finally {
      btn.textContent = "Actualizar";
      btn.disabled = false;
      btn.style.opacity = "1";
    }
  });
}