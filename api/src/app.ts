import "reflect-metadata"
import express from "express"
import { createConnection } from 'typeorm'

import { router } from "./routes"

const app = express()
createConnection()
app.use(express.json())

app.use(router)

export { app }