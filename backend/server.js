import dns from "dns"
dns.setDefaultResultOrder("ipv4first")

import dotenv from "dotenv"
import app from "./src/app.js"

dotenv.config()

const PORT = process.env.PORT || 3000

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})