import express from "express"
import cors from "cors"

import authRoutes from "./routes/auth.routes.js"
import matchRoutes from "./routes/match.routes.js"
import matchMongoRoutes from "./routes/match.mongo.routes.js"
import recoverRoutes from "./routes/recoverPassword.routes.js"
import { connectMongoDB } from "./config/mongodb.js"
import { errorHandler } from "./middlewares/error.middleware.js"

const app = express()

app.use(cors())
app.use(express.json())

app.use("/api/auth", authRoutes)
app.use("/api/drivers", matchRoutes)
app.use("/api/matches", matchMongoRoutes)
app.use("/api/security", recoverRoutes)

const initializeMongoDB = async () => {
	try {
		await connectMongoDB()
		console.log("MongoDB connected")
	} catch (error) {
		console.error("MongoDB connection failed:", error.message)
	}
}

initializeMongoDB()

app.use(errorHandler)

export default app
