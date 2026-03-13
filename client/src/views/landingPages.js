export function landingPage() {
  return `
  <!-- NAVBAR -->
  <header class="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-gray-100 shadow-sm">
    <div class="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
      <div class="flex items-center gap-2">
        <div class="w-16 h-16 rounded-lg flex items-center justify-center overflow-hidden">
          <img src="./src/assets/utibunna-icon-transparent.png" alt="Logo" class="w-full h-full object-contain">
        </div>
        <span class="font-bold text-xl tracking-tight text-gray-900">Uti Bunna</span>
      </div>
      <div class="flex items-center gap-3">
        <a href="#/register" class="hidden md:inline text-sm font-medium text-gray-600 hover:text-indigo-600 transition-colors">Regístrate</a>
        <a href="#/login" class="text-sm font-semibold text-white bg-gradient-to-r from-indigo-500 to-purple-600 px-5 py-2.5 rounded-full shadow-md hover:opacity-90 transition-opacity">Iniciar sesión</a>
      </div>
    </div>
  </header>

  <!-- HERO -->
  <section class="bg-gradient-to-br from-indigo-50 to-purple-50">
    <div class="max-w-7xl mx-auto px-6 py-24 grid md:grid-cols-2 gap-16 items-center">
      <div>
        <span class="inline-block bg-indigo-100 text-indigo-600 text-xs font-semibold tracking-widest uppercase px-4 py-1.5 rounded-full mb-6">Transporte Inteligente para Todos</span>
        <h1 class="text-5xl lg:text-6xl font-extrabold text-gray-900 leading-tight mb-6">
          Conexiones de Ruta<br />
          <span class="text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 to-purple-600">Inteligentes</span>
        </h1>
        <p class="text-gray-500 text-lg leading-relaxed mb-10 max-w-md">
          Conectamos conductores y pasajeros mediante coincidencia inteligente de rutas. Experimenta el futuro de la movilidad compartida con optimización en tiempo real.
        </p>
        <div class="flex flex-wrap gap-4 mb-10">
          <a href="#/login" class="bg-gradient-to-r from-indigo-500 to-purple-600 text-white font-semibold px-8 py-4 rounded-full shadow-lg hover:opacity-90 transition-opacity text-base">Comenzar ahora</a>
          <a href="#saberMas" class="bg-white text-gray-700 font-semibold px-8 py-4 rounded-full border border-gray-200 hover:border-indigo-300 hover:text-indigo-600 transition-all text-base">Saber más</a>
        </div>

      </div>
        <div class="relative bg-gradient-to-br from-indigo-100 to-purple-100 rounded-3xl h-80 md:h-96 flex items-center justify-center shadow-2xl overflow-hidden">
        
        <iframe
            class="absolute inset-0 w-full h-full border-0"
            src="https://www.openstreetmap.org/export/embed.html?bbox=-75.65%2C6.15%2C-75.50%2C6.35&layer=mapnik">
        </iframe>

        <div class="absolute top-4 right-4 z-10 text-center bg-white/70 backdrop-blur-sm px-4 py-2 rounded-xl">
        <p class="text-indigo-700 font-semibold text-sm">Medellín</p>
        </div>

        </div>
      </div>
    </div>
  </section>

  <!-- 3 SIMPLE STEPS -->
  <section class="py-24 bg-white" id="saberMas">
    <div class="max-w-7xl mx-auto px-6">
      <div class="text-center mb-16">
        <h2 class="text-4xl font-extrabold text-gray-900 mb-4">3 Pasos Simples</h2>
        <p class="text-gray-500 text-lg max-w-xl mx-auto">Comienza con Uti Bunna en minutos. Nuestro proceso está diseñado para ser tan fluido como tu viaje diario.</p>
      </div>
      <div class="grid md:grid-cols-3 gap-8">
        <div class="bg-gray-50 rounded-3xl p-10 text-center hover:-translate-y-1 hover:shadow-xl transition-all duration-300">
          <h3 class="text-xl font-bold text-gray-900 mb-3">Registrarse</h3>
          <p class="text-gray-500 leading-relaxed">Crea tu perfil en segundos. Solo necesitamos lo esencial para ponerte en marcha.</p>
        </div>
        <div class="bg-gray-50 rounded-3xl p-10 text-center hover:-translate-y-1 hover:shadow-xl transition-all duration-300">
          <h3 class="text-xl font-bold text-gray-900 mb-3">Encontrar coincidencias</h3>
          <p class="text-gray-500 leading-relaxed">Nuestro sistema encuentra la ruta más eficiente y los viajeros compatibles para ti.</p>
        </div>
        <div class="bg-gray-50 rounded-3xl p-10 text-center hover:-translate-y-1 hover:shadow-xl transition-all duration-300">
          <h3 class="text-xl font-bold text-gray-900 mb-3">Conectar</h3>
          <p class="text-gray-500 leading-relaxed">Chatea directamente por WhatsApp para finalizar tu viaje y coordinar los puntos de recogida.</p>
        </div>
      </div>
    </div>
  </section>

  <!-- CTA BANNER -->
  <section class="py-20 px-6">
    <div class="max-w-7xl mx-auto bg-gradient-to-r from-indigo-500 to-purple-600 rounded-3xl px-12 py-20 text-center relative overflow-hidden">
      <div class="relative z-10">
        <h2 class="text-4xl md:text-5xl font-extrabold text-white mb-4">¿Listo para encontrar tu ruta?</h2>
        <p class="text-indigo-200 text-lg mb-10 max-w-lg mx-auto">Únete hoy a la comunidad de Uti Bunna y empieza a ahorrar tiempo y dinero en tus desplazamientos diarios.</p>
        <a href="#/register" class="inline-block bg-white text-indigo-600 font-bold px-10 py-4 rounded-full text-base shadow-xl hover:scale-105 transition-transform">Registrarse gratis</a>
      </div>
    </div>
  </section>

  <!-- FOOTER -->
  <footer class="bg-gray-900 text-gray-400 pt-16 pb-8">
    <div class="max-w-7xl mx-auto px-6">
      <div class="grid md:grid-cols-4 gap-10 pb-12 border-b border-gray-800">
        <div>
          <span class="font-bold text-white text-lg">Uti Bunna</span>
          <p class="text-sm leading-relaxed mb-5">Redefiniendo el transporte mediante inteligencia y conectividad. Haciendo cada viaje más inteligente.</p>
        </div>
        <div>
          <h4 class="text-white font-semibold mb-5">Producto</h4>
          <ul class="space-y-3 text-sm">
            <li><a href="#" class="hover:text-indigo-400 transition-colors">Características</a></li>
            <li><a href="#" class="hover:text-indigo-400 transition-colors">Coincidencia de Rutas</a></li>
            <li><a href="#" class="hover:text-indigo-400 transition-colors">Guía de Seguridad</a></li>
            <li><a href="#" class="hover:text-indigo-400 transition-colors">Precios</a></li>
          </ul>
        </div>
        <div>
          <h4 class="text-white font-semibold mb-5">Empresa</h4>
          <ul class="space-y-3 text-sm">
            <li><a href="#" class="hover:text-indigo-400 transition-colors">Sobre nosotros</a></li>
            <li><a href="#" class="hover:text-indigo-400 transition-colors">Carreras</a></li>
            <li><a href="#" class="hover:text-indigo-400 transition-colors">Blog</a></li>
            <li><a href="#" class="hover:text-indigo-400 transition-colors">Prensa</a></li>
          </ul>
        </div>
        <div>
          <h4 class="text-white font-semibold mb-5">Soporte</h4>
          <ul class="space-y-3 text-sm">
            <li><a href="#" class="hover:text-indigo-400 transition-colors">Centro de ayuda</a></li>
            <li><a href="#" class="hover:text-indigo-400 transition-colors">Contáctanos</a></li>
            <li><a href="#" class="hover:text-indigo-400 transition-colors">Términos de servicio</a></li>
            <li><a href="#" class="hover:text-indigo-400 transition-colors">Política de privacidad</a></li>
          </ul>
        </div>
      </div>
      <div class="pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-sm">
        <p>© 2026 Uti Bunna. Todos los derechos reservados.</p>
        <span class="text-gray-300">🌐 Español</span>
      </div>
    </div>
  </footer>
  `;
}
