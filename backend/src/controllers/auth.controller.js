import * as authService from "../services/auth.service.js"
import { addToBlacklist } from "../utils/tokenBlacklist.js"

export const register = async (req,res,next) => {
  try{
    const user = await authService.register(req.body)
    res.status(201).json(user)
  }catch(error){
    next(error)
  }
}

export const login = async (req, res, next) => {
  try {
    const user = await authService.login(req.body)
    res.status(200).json(user)
  } catch (error) {
    next(error)
  }
}

export const logout = async (req, res, next) => {
  try {
    // Obtener el token del header Authorization: Bearer <token>
    const authHeader = req.headers.authorization
    if (authHeader && authHeader.startsWith('Bearer ')) {
      const token = authHeader.split(' ')[1]
      // Añadir el token a la lista negra
      addToBlacklist(token)
    }
    res.status(200).json({ message: "Logout successful" })
  } catch (error) {
    next(error)
  }
}

