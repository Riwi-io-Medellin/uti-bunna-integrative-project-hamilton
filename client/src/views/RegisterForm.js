import { initMap, Map } from "../components/Map.js";
import {
  getNaturalAddress,
  getMarkerPosition,
  updateMapPosition,
} from "../utils/utils.js";
import Toastify from "toastify-js";

export function RegisterForm() {
  return `

<form id="registerForm" class="bg-gray-50 flex justify-center py-10">
    <div class="max-w-md w-full bg-white rounded-3xl shadow-lg overflow-hidden border border-gray-100 font-sans">
        
        <div class="px-6 pt-8 pb-4">
            <div class="flex items-center justify-between mb-6">
                <a href="/login" class="text-gray-700 text-lg"><i class="fa-solid fa-arrow-left"></i></a>
                <h1 class="text-lg font-bold text-gray-800">Registro</h1>
                <div class="w-6"></div>
            </div>
            
            <h2 class="text-2xl font-bold text-gray-900 mb-1">Crea tu cuenta</h2>
            <p class="text-sm text-gray-400 mb-6">Ingresa tus datos para empezar a usar Uti Bunna.</p>

            <div class="space-y-4">
                <div>
                    <label class="block text-sm font-semibold text-gray-700 mb-1">Nombre completo</label>
                    <input required id="fullName" name="fullName" type="text" placeholder="Juan Pérez" class="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition">
                </div>

                <div>
                    <label class="block text-sm font-semibold text-gray-700 mb-1">Correo electrónico</label>
                    <input required id="email" name="email" type="email" placeholder="juan@correo.com" class="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition">
                </div>
                
                <div>
                    <label class="block text-sm font-semibold text-gray-700 mb-1">Contraseña</label>
                    <input required id="password" name="password" type="password" placeholder="***********" class="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition">
                </div>

                <div>
                    <label class="block text-sm font-semibold text-gray-700 mb-1">Confirmar contraseña</label>
                    <input required id="check-password" name="check-password" type="password" placeholder="***********" class="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition">
                </div>

                <div>
                    <label class="block text-sm font-semibold text-gray-700 mb-1">Número de teléfono</label>
                    <div class="flex gap-2">
                        <div class="bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-gray-700 font-medium">+57</div>
                        <input id="phone" name="phone" type="tel" placeholder="300 123 4567" class="flex-1 px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition">
                    </div>
                </div>
            </div>
        </div>

        <hr class="border-gray-50">

        <div class="px-6 py-4">
            <h3 class="text-lg font-bold text-gray-800 mb-4">Selecciona tu rol</h3>
            <div class="grid grid-cols-2 gap-4">

                <label class="relative cursor-pointer">
                    <input required type="radio" name="role" class="peer sr-only" value="passenger">
                    <div class="flex flex-col items-center justify-center p-6 rounded-2xl border-2 border-gray-100 bg-white transition-all
                     peer-checked:border-indigo-500
                     peer-checked:bg-indigo-50/30
                     peer-checked:text-indigo-500">
                        <div class="absolute top-2 right-2 text-indigo-500 hidden peer-checked:block">
                            <i class="fa-solid fa-circle-check"></i>
                        </div>
                        <div class="w-12 h-12 bg-indigo-100 rounded-full flex items-center justify-center text-indigo-500 shadow-lg shadow-indigo-200 mb-2">
                            <i class="fa-solid fa-user text-xl"></i>
                        </div>
                        <span class="font-bold ">Pasajero</span>
                    </div>
                </label>

                <label class="relative cursor-pointer">
                    <input required type="radio" name="role" class="peer sr-only" value="driver">
                    <div class="flex flex-col items-center justify-center p-6 rounded-2xl border-2 border-gray-100 bg-white transition-all
                     peer-checked:border-indigo-500
                     peer-checked:bg-indigo-50/30
                     peer-checked:text-indigo-500">
                        <div class="absolute top-2 right-2 text-indigo-500 hidden peer-checked:block">
                            <i class="fa-solid fa-circle-check"></i>
                        </div>
                        <div class="w-12 h-12 bg-indigo-100 rounded-full flex items-center justify-center text-indigo-500 shadow-lg shadow-indigo-200 mb-2">
                            <i class="fa-solid fa-car text-xl"></i>
                        </div>
                        <span class="font-bold ">Conductor</span>
                    </div>
                </label>

            </div>
        </div>

        <div class="px-6 py-4">
            <h3 class="text-sm font-bold text-gray-800 mb-3">Selecciona tu turno de viaje</h3>
            <div class="grid grid-cols-2 gap-4">
                <label class="cursor-pointer">
                    <input type="radio" name="shift" class="peer sr-only" value="morning">
                    <div class="flex items-center justify-center gap-2 py-3 rounded-xl border-2 border-gray-100 text-gray-400 font-bold transition-all peer-checked:border-indigo-500 peer-checked:text-indigo-500 peer-checked:bg-indigo-50/50">
                        <i class="fa-solid fa-sun"></i> Mañana
                    </div>
                </label>

                <label class="cursor-pointer">
                    <input type="radio" name="shift" class="peer sr-only" value="evening">
                    <div class="flex items-center justify-center gap-2 py-3 rounded-xl border-2 border-gray-100 text-gray-400 font-bold transition-all peer-checked:border-indigo-500 peer-checked:text-indigo-500 peer-checked:bg-indigo-50/50">
                        <i class="fa-solid fa-moon"></i> Tarde
                    </div>
                </label>
            </div>
        </div>

        <div class="px-6 py-4">
            <h3 class="text-lg font-bold text-gray-800 mb-3">Indica tu ubicación</h3>
            <div class="relative">
                <input type="text" id="location" placeholder="Escribe tu ubicación" class="flex w-full gap-3 py-4 px-8 rounded-xl border border-gray-100 mb-4">
                <i class="absolute left-3 top-1/2 transform -translate-y-1/2 fa-solid fa-location-dot text-indigo-500"></i>
            </div>

            <ul class="max-h-60 mb-8 overflow-y-auto" id="location-list">
            </ul>

            ${Map()}

        <div class="px-6 py-8">
            <button type="sumbit" class="flex justify-center w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-4 rounded-2xl shadow-lg shadow-indigo-200 transition-all active:scale-[0.98] mb-4">
                <span>Crear cuenta</span>
                <div class="hidden animate-spin rounded-full h-10 w-10 border-4 border-b-current border-gray-200"></div>
            </button>

            <p class="text-[10px] text-center text-gray-400 leading-tight">
                Al hacer clic en "Crear cuenta", aceptas los <br>
                <a href="#" class="text-indigo-400 underline">Términos del servicio</a> y la <a href="#" class="text-indigo-400 underline">Política de privacidad</a> de Uti Bunna.
            </p>

        </div>
    </div>

</form>
   `;
}

//function to init register form
export async function initRegisterForm() {
  initMap(); //init map

  //variable to store selected location
  let selectedLocation = null;
  //variable to store timeout id
  let timeoutId;

  document
    .getElementById("registerForm")
    ?.addEventListener("submit", async (e) => {
      e.preventDefault();
      const btnForm = e.target.querySelector("button");
      const formData = new FormData(e.target);

      //validate password
      if (validatePassword()) {
        btnForm.disabled = true;
        btnForm.querySelector("div").classList.remove("hidden");
        btnForm.querySelector("span").classList.add("hidden");

        //always send the display_name of the original input or selectedLocation
        if (selectedLocation) {
          formData.append("address", selectedLocation.display_name);
        } else {
          formData.append("address", document.getElementById("location").value);
        }

        //delete the confirmation password
        formData.delete("check-password");
        //convert the FormData to a standard JavaScript object first
        const data = Object.fromEntries(formData.entries());
        //get the password and send it through the object
        data.password = document.getElementById("password").value;

        //get the last current position of the marker (even if the user dragged it)
        const currentMarkerPosition = getMarkerPosition();

        if (currentMarkerPosition) {
          // Asignamos el objeto directamente a "data" en lugar de "formData"
          data.location = {
            type: "Point",
            coordinates: [currentMarkerPosition.lon, currentMarkerPosition.lat],
          };
        } else if (selectedLocation) {
          // Fallback por si acaso el marcador falló, usamos lo escrito en el autocompletado de Nominatim
          data.location = {
            type: "Point",
            coordinates: [selectedLocation.lon, selectedLocation.lat],
          };
        }

        //send the data to the server
        const res = await fetch(
          "https://uti-bunna-integrative-project-hamilton.onrender.com/api/auth/register",
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data),
          },
        );
        //convert response to json
        const json = await res.json();

        //get message error
        const message =
          json?.errors?.[0]?.message || json?.message || "Unknown error";
        //if response is ok
        try {
          if (res.ok) {
            Toastify({
              text: "User registered successfully",
              duration: 3000,
              gravity: "top",
              position: "right",
              style: {
                background: "#4f39f6",
              },
            }).showToast();
            localStorage.setItem("token", JSON.stringify(json.token));
            setTimeout(() => {
              window.location = "#/home";
            }, 1000);
            btnForm.disabled = false;
            btnForm.querySelector("div").classList.add("hidden");
            btnForm.querySelector("span").classList.remove("hidden");
          } else {
            Toastify({
              text: message,
              duration: 3000,
              gravity: "top",
              position: "right",
              style: {
                background: "red",
              },
            }).showToast();
          }
        } catch (error) {
          Toastify({
            text: error,
            duration: 3000,
            gravity: "top",
            position: "right",
            style: { background: "red" },
          }).showToast();
        } finally {
          btnForm.disabled = false;
          btnForm.querySelector("div").classList.add("hidden");
          btnForm.querySelector("span").classList.remove("hidden");
        }
      }
    });
  //add event listener to location input, when the user types something, it will show a list of suggestions
  document.getElementById("location").addEventListener("input", async (e) => {
    const inputValue = e.target.value.toLowerCase().trim();
    const list = document.getElementById("location-list");

    if (!inputValue || inputValue.length < 3) {
      list.innerHTML = "";
      list.classList.remove(
        "rounded-xl",
        "border",
        "mt-3",
        "shadow-md",
        "bg-white",
      );
      return;
    }

    let results = await getNaturalAddress(inputValue);
    list.innerHTML = "";

    if (results && results.length > 0) {
      list.classList.add(
        "rounded-xl",
        "border",
        "border-gray-100",
        "mt-3",
        "shadow-md",
        "bg-white",
        "overflow-hidden",
        "divide-y",
        "divide-gray-50",
      );

      results.forEach((item) => {
        const li = document.createElement("li");

        li.innerHTML = `
                        <div class="flex items-start gap-3">
                            <i class="fa-solid fa-map-pin text-indigo-400 mt-1"></i>
                            <span class="text-sm text-gray-700 leading-tight">${item.display_name}</span>
                        </div>
                    `;

        li.classList.add(
          "cursor-pointer",
          "hover:bg-indigo-50",
          "p-3",
          "transition-colors",
          "duration-150",
        );
        list.appendChild(li);

        li.addEventListener("click", () => {
          selectedLocation = item;
          list.innerHTML = "";
          list.classList.remove(
            "rounded-xl",
            "border",
            "border-gray-100",
            "mt-3",
            "shadow-md",
            "bg-white",
            "divide-y",
            "divide-gray-50",
          );
          document.getElementById("location").value = item.display_name;
          updateMapPosition(item.lat, item.lon);
        });
      });
    } else {
      list.classList.remove(
        "rounded-xl",
        "border",
        "border-gray-100",
        "mt-3",
        "shadow-md",
        "bg-white",
        "divide-y",
        "divide-gray-50",
      );
    }
  });
}

function validatePassword() {
  const password = document.getElementById("password");
  const checkPassword = document.getElementById("check-password");
  if (password.value === checkPassword.value) {
    password.classList.remove("border-red-500");
    checkPassword.classList.remove("border-red-500");
    return true;
  } else {
    Toastify({
      text: "Passwords must match",
      duration: 5000,
      gravity: "top", // `top` or `bottom`
      position: "rigth", // `left`, `center` or `right`
      stopOnFocus: true, // Prevents dismissing of toast on hover
      style: {
        background: "red",
      },
    }).showToast();
    password.classList.add("border-red-500");
    checkPassword.classList.add("border-red-500");
    return false;
  }
}
