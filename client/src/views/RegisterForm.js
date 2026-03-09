import { initMap, Map } from "../components/Map.js"
import { getNaturalAddress, getMarkerPosition, updateMapPosition } from "../utils/utils.js"
import Toastify from 'toastify-js'

export function RegisterForm() {
    return `

<form id="registerForm" class="bg-gray-50 flex justify-center py-10">
    <div class="max-w-md w-full bg-white rounded-3xl shadow-lg overflow-hidden border border-gray-100 font-sans">
        
        <div class="px-6 pt-8 pb-4">
            <div class="flex items-center justify-between mb-6">
                <button class="text-gray-700 text-lg"><i class="fa-solid fa-arrow-left"></i></button>
                <h1 class="text-lg font-bold text-gray-800">Registration</h1>
                <div class="w-6"></div> </div>
            
            <div class="flex justify-center gap-1 mb-8">
                <span class="h-1.5 w-8 bg-indigo-500 rounded-full"></span>
                <span class="h-1.5 w-2 bg-indigo-100 rounded-full"></span>
                <span class="h-1.5 w-2 bg-indigo-100 rounded-full"></span>
            </div>

            <h2 class="text-2xl font-bold text-gray-900 mb-1">Create your account</h2>
            <p class="text-sm text-gray-400 mb-6">Enter your details to get started with Uti Bunna.</p>

            <div class="space-y-4">
                <div>
                    <label class="block text-sm font-semibold text-gray-700 mb-1">Full Name</label>
                    <input required id="name" name="name" type="text" placeholder="John Doe" class="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition">
                </div>
                <div>
                    <label class="block text-sm font-semibold text-gray-700 mb-1">Email Address</label>
                    <input required id="email" name="email" type="email" placeholder="john@example.com" class="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition">
                </div>
                
                <div>
                    <label class="block text-sm font-semibold text-gray-700 mb-1">Password</label>
                    <input required id="password" name="password" type="password" placeholder="***********" class="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition">
                </div><div>
                    <label class="block text-sm font-semibold text-gray-700 mb-1">Confirm password</label>
                    <input required id="check-password" name="check-password" type="password" placeholder="***********" class="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition">
                </div>

                <div>
                    <label class="block text-sm font-semibold text-gray-700 mb-1">Phone Number</label>
                    <div class="flex gap-2">
                        <div class="bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-gray-700 font-medium">+57</div>
                        <input id="phone" name="phone" type="tel" placeholder="912 345 6788" class="flex-1 px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition">
                    </div>
                </div>
            </div>
        </div>

        <hr class="border-gray-50">

        <div class="px-6 py-4">
            <h3 class="text-lg font-bold text-gray-800 mb-4">Choose your role</h3>
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
                        </div><span class="font-bold ">Passenger</span>
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
                        <span class="font-bold ">Driver</span>
                    </div>
                </label>
            </div>
        </div>

        <div class="px-6 py-4">
            <h3 class="text-sm font-bold text-gray-800 mb-3">Select your day trip</h3>
            <div class="grid grid-cols-2 gap-4">
                <label class="cursor-pointer">
                    <input type="radio" name="day-trip" class="peer sr-only" value="am">
                    <div class="flex items-center justify-center gap-2 py-3 rounded-xl border-2 border-gray-100 text-gray-400 font-bold transition-all peer-checked:border-indigo-500 peer-checked:text-indigo-500 peer-checked:bg-indigo-50/50">
                        <i class="fa-solid fa-sun"></i> AM
                    </div>
                </label>
                <label class="cursor-pointer">
                    <input type="radio" name="day-trip" class="peer sr-only" value="pm">
                    <div class="flex items-center justify-center gap-2 py-3 rounded-xl border-2 border-gray-100 text-gray-400 font-bold transition-all peer-checked:border-indigo-500 peer-checked:text-indigo-500 peer-checked:bg-indigo-50/50">
                        <i class="fa-solid fa-moon"></i> PM
                    </div>
                </label>
            </div>
        </div>

        <div class="px-6 py-4">
            <h3 class="text-lg font-bold text-gray-800 mb-3">Set your location</h3>
            <div class="relative">
                <input type="text" id="location" placeholder="Enter your location" class="flex w-full gap-3 py-4 px-8 rounded-xl border border-gray-100 mb-4">
                <i class="absolute left-3 top-1/2 transform -translate-y-1/2 fa-solid fa-location-dot text-indigo-500"></i>
            </div>
            <ul class="max-h-60 mb-8 overflow-y-auto" id="location-list">
            </ul>

            ${Map()}

        <div class="px-6 py-8">
            <button class="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-4 rounded-2xl shadow-lg shadow-indigo-200 transition-all active:scale-[0.98] mb-4">
                Complete Registration
            </button>
            <p class="text-[10px] text-center text-gray-400 leading-tight">
                By clicking "Complete Registration", you agree to Uti Bunna's <br>
                <a href="#" class="text-indigo-400 underline">Terms of Service</a> and <a href="#" class="text-indigo-400 underline">Privacy Policy</a>.
            </p>
        </div>
    </div>
</form>
   `
}

export function initRegisterForm() {
    initMap()
    let selectedLocation = null;
    let timeoutId;

    document.getElementById('registerForm')?.addEventListener('submit', (e) => {
        e.preventDefault()
        const formData = new FormData(e.target)

        if (validatePassword()) {

            // Siempre mandamos el display_name del input original o de selectedLocation
            if (selectedLocation) {
                formData.append('display_name', selectedLocation.display_name);
            } else {
                formData.append('display_name', document.getElementById('location').value);
            }

            // Convertimos el FormData a un objeto de JavaScript estándar primero
            const data = Object.fromEntries(formData.entries())

            // Obtenemos la última posición actual del marcador (incluso si el usuario lo arrastró)
            const currentMarkerPosition = getMarkerPosition();

            if (currentMarkerPosition) {
                // Asignamos el objeto directamente a "data" en lugar de "formData"
                data.location = {
                    type: "Point",
                    coordinates: [currentMarkerPosition.lon, currentMarkerPosition.lat]
                };
            } else if (selectedLocation) {
                // Fallback por si acaso el marcador falló, usamos lo escrito en el autocompletado de Nominatim
                data.location = {
                    type: "Point",
                    coordinates: [selectedLocation.lon, selectedLocation.lat]
                };
            }
            console.log(data);
            console.log(validatePassword())
        }
        else {
            console.log('incorrecta');

        }




        // Ahora puedes enviar "data" a tu base de datos convirtiéndolo a JSON:
        // fetch('tu-api/endpoint', { 
        //    method: 'POST', 
        //    headers: { 'Content-Type': 'application/json' }, 
        //    body: JSON.stringify(data)
        // })
    })
    document.getElementById('location').addEventListener('input', async (e) => {
        clearTimeout(timeoutId);

        const inputValue = e.target.value.toLowerCase().trim();
        const list = document.getElementById('location-list');

        if (!inputValue || inputValue.length < 3) {
            list.innerHTML = '';
            list.classList.remove('rounded-xl', 'border', 'mt-3', 'shadow-md', 'bg-white');
            return;
        }

        timeoutId = setTimeout(async () => {
            let results = await getNaturalAddress(inputValue)
            list.innerHTML = '';

            if (results && results.length > 0) {
                // Mejora de estilos en el ul
                list.classList.add('rounded-xl', 'border', 'border-gray-100', 'mt-3', 'shadow-md', 'bg-white', 'overflow-hidden', 'divide-y', 'divide-gray-50');

                results.forEach(item => {
                    const li = document.createElement('li');

                    // Highlight the display name with better typography and icons
                    li.innerHTML = `
                        <div class="flex items-start gap-3">
                            <i class="fa-solid fa-map-pin text-indigo-400 mt-1"></i>
                            <span class="text-sm text-gray-700 leading-tight">${item.display_name}</span>
                        </div>
                    `;

                    // Mejora de estilos en el li
                    li.classList.add('cursor-pointer', 'hover:bg-indigo-50', 'p-3', 'transition-colors', 'duration-150');
                    list.appendChild(li);

                    li.addEventListener('click', () => {
                        selectedLocation = item;
                        list.innerHTML = '';
                        list.classList.remove('rounded-xl', 'border', 'border-gray-100', 'mt-3', 'shadow-md', 'bg-white', 'divide-y', 'divide-gray-50');
                        document.getElementById('location').value = item.display_name;
                        updateMapPosition(item.lat, item.lon)
                    })
                })
            } else {
                list.classList.remove('rounded-xl', 'border', 'border-gray-100', 'mt-3', 'shadow-md', 'bg-white', 'divide-y', 'divide-gray-50');
            }
        }, 1000);
    })
}

function validatePassword() {
    const password = document.getElementById('password')
    const checkPassword = document.getElementById('check-password')
    if (password.value === checkPassword.value) {
        password.classList.remove('border-red-500')
        checkPassword.classList.remove('border-red-500')
        return true
    }
    else {
        Toastify({
            text: "Passwords must match",
            duration: 5000,
            gravity: "top", // `top` or `bottom`
            position: "left", // `left`, `center` or `right`
            stopOnFocus: true, // Prevents dismissing of toast on hover
            style: {
                background: "red",
            },
        }).showToast();
        password.classList.add('border-red-500')
        checkPassword.classList.add('border-red-500')
        return false
    }

}