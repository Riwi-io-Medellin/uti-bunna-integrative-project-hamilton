// Token Blacklist - Almacena tokens que han hecho logout
// Nota: En producción, esto debería guardarse en Redis o base de datos
// ya que se pierde al reiniciar el servidor

const blacklistedTokens = new Set();

/**
 * Añade un token a la lista negra (logout)
 */
export const addToBlacklist = (token) => {
  blacklistedTokens.add(token);
};

/**
 * Verifica si un token está en la lista negra
 * 
 */
export const isBlacklisted = (token) => {
  return blacklistedTokens.has(token);
};

